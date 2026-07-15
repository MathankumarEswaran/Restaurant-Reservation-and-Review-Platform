import { Review } from "../models/Review.js";
import { Restaurant } from "../models/Restaurant.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

async function recomputeRestaurantRating(restaurantId) {
  const stats = await Review.aggregate([
    { $match: { restaurant: restaurantId } },
    { $group: { _id: "$restaurant", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  const { avgRating = 0, count = 0 } = stats[0] ?? {};
  await Restaurant.findByIdAndUpdate(restaurantId, {
    rating: Math.round(avgRating * 10) / 10,
    reviewCount: count,
  });
}

export const getReviewsByRestaurant = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ restaurant: req.params.restaurantId }).populate("user", "name avatar");
  res.json(reviews);
});

export const getAllReviews = asyncHandler(async (req, res) => {
  res.json(await Review.find().populate("user", "name avatar").populate("restaurant", "name slug"));
});

export const getReviewsByUser = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin" && String(req.user._id) !== req.params.userId) {
    res.status(403);
    throw new Error("You can only view your own reviews");
  }
  res.json(await Review.find({ user: req.params.userId }).populate("restaurant", "name slug coverImage"));
});

export const submitReview = asyncHandler(async (req, res) => {
  const review = await Review.create({ ...req.body, user: req.user._id });
  await recomputeRestaurantRating(review.restaurant);
  res.status(201).json(review);
});

export const replyToReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id).populate("restaurant");
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }
  const restaurant = review.restaurant;
  if (req.user.role !== "admin" && String(restaurant.owner) !== String(req.user._id)) {
    res.status(403);
    throw new Error("You do not own this restaurant");
  }
  review.ownerReply = { message: req.body.message, createdAt: new Date() };
  await review.save();
  res.json(review);
});
