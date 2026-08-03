import crypto from "crypto";
import { razorpay } from "../config/razorpay.js";
import { Restaurant } from "../models/Restaurant.js";
import { Reservation } from "../models/Reservation.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const FEE_PER_GUEST_INR = 50;
const GST_RATE = 0.18;

export const createOrder = asyncHandler(async (req, res) => {
  const { restaurant, date, time, guests, specialRequest } = req.body;

  if (!restaurant || !date || !time || !guests) {
    res.status(400);
    throw new Error("restaurant, date, time and guests are required");
  }

  const restaurantDoc = await Restaurant.findById(restaurant);
  if (!restaurantDoc) {
    res.status(404);
    throw new Error("Restaurant not found");
  }

  const baseAmount = Number(guests) * FEE_PER_GUEST_INR * 100;
  const taxAmount = Math.round(baseAmount * GST_RATE);
  const totalAmount = baseAmount + taxAmount;

  let order;
  try {
    order = await razorpay.orders.create({
      amount: totalAmount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        restaurant: String(restaurant),
        date: String(date),
        time: String(time),
        guests: String(guests),
        specialRequest: specialRequest ?? "",
        userId: String(req.user._id),
        baseAmount: String(baseAmount),
        taxAmount: String(taxAmount),
      },
    });
  } catch (err) {
    res.status(err.statusCode ?? 502);
    throw new Error(err.error?.description ?? "Could not start payment with Razorpay");
  }

  res.status(201).json({
    orderId: order.id,
    baseAmount,
    taxAmount,
    totalAmount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
});

export const verifyAndCreateReservation = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400);
    throw new Error("Missing payment verification fields");
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const isValid =
    expectedSignature.length === razorpay_signature.length &&
    crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(razorpay_signature));

  if (!isValid) {
    res.status(400);
    throw new Error("Payment verification failed");
  }

  let order;
  try {
    order = await razorpay.orders.fetch(razorpay_order_id);
  } catch (err) {
    res.status(err.statusCode ?? 502);
    throw new Error(err.error?.description ?? "Could not confirm payment with Razorpay");
  }

  const notes = order.notes ?? {};
  if (String(notes.userId) !== String(req.user._id)) {
    res.status(403);
    throw new Error("This payment does not belong to you");
  }

  const reservation = await Reservation.create({
    restaurant: notes.restaurant,
    user: req.user._id,
    date: notes.date,
    time: notes.time,
    guests: Number(notes.guests),
    specialRequest: notes.specialRequest || undefined,
    status: "upcoming",
    payment: {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      baseAmount: Number(notes.baseAmount) || undefined,
      taxAmount: Number(notes.taxAmount) || undefined,
      amount: order.amount,
      currency: order.currency,
      status: "paid",
    },
  });
  await reservation.populate("restaurant");

  res.status(201).json(reservation);
});
