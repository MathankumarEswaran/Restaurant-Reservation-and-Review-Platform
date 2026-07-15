import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    specialRequest: { type: String, default: "" },
    status: { type: String, enum: ["upcoming", "completed", "cancelled"], default: "upcoming" },
    payment: {
      orderId: { type: String },
      paymentId: { type: String },
      amount: { type: Number },
      currency: { type: String, default: "INR" },
      status: { type: String, enum: ["pending", "paid"] },
    },
  },
  { timestamps: true }
);

export const Reservation = mongoose.model("Reservation", reservationSchema);
