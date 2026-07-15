import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    images: { type: [String], default: [] },
    ownerReply: {
      message: { type: String },
      createdAt: { type: Date },
    },
    helpfulCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
