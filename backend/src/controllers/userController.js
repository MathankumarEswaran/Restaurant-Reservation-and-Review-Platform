import { User } from "../models/User.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const getMyFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorites");
  res.json(user.favorites);
});

export const toggleFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { restaurantId } = req.params;
  const index = user.favorites.findIndex((id) => String(id) === restaurantId);

  if (index === -1) {
    user.favorites.push(restaurantId);
  } else {
    user.favorites.splice(index, 1);
  }

  await user.save();
  await user.populate("favorites");
  res.json(user.favorites);
});
