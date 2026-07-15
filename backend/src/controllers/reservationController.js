import { Reservation } from "../models/Reservation.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const getReservationsByUser = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin" && String(req.user._id) !== req.params.userId) {
    res.status(403);
    throw new Error("You can only view your own reservations");
  }
  const reservations = await Reservation.find({ user: req.params.userId }).populate("restaurant");
  res.json(reservations);
});

export const getAllReservations = asyncHandler(async (req, res) => {
  res.json(await Reservation.find().populate("restaurant").populate("user", "name email"));
});

export const createReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.create({ ...req.body, user: req.user._id, status: "upcoming" });
  await reservation.populate("restaurant");
  res.status(201).json(reservation);
});

export const cancelReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }
  if (req.user.role !== "admin" && String(reservation.user) !== String(req.user._id)) {
    res.status(403);
    throw new Error("You can only cancel your own reservations");
  }
  reservation.status = "cancelled";
  await reservation.save();
  res.json({ id: reservation._id, status: reservation.status });
});
