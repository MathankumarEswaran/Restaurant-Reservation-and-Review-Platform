import { Restaurant } from "../models/Restaurant.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const priceRankOf = (priceRange) => priceRange.length;

export const getRestaurants = asyncHandler(async (req, res) => {
  const { query, cuisine, location, price, rating, openNow, outdoorSeating, liveMusic, vegetarian, vegan, petFriendly, sortBy } = req.query;

  const filter = {};

  if (query) {
    const regex = new RegExp(query, "i");
    filter.$or = [{ name: regex }, { cuisines: regex }, { "location.city": regex }];
  }
  if (cuisine) {
    const cuisines = Array.isArray(cuisine) ? cuisine : [cuisine];
    filter.cuisines = { $in: cuisines };
  }
  if (location) filter["location.city"] = location;
  if (price) {
    const prices = Array.isArray(price) ? price : [price];
    filter.priceRange = { $in: prices };
  }
  if (rating) filter.rating = { $gte: Number(rating) };
  if (openNow === "true") filter.isOpenNow = true;
  if (outdoorSeating === "true") filter.outdoorSeating = true;
  if (liveMusic === "true") filter.liveMusic = true;
  if (vegetarian === "true") filter.vegetarian = true;
  if (vegan === "true") filter.vegan = true;
  if (petFriendly === "true") filter.petFriendly = true;

  let results = await Restaurant.find(filter);

  switch (sortBy) {
    case "rating":
      results = results.sort((a, b) => b.rating - a.rating);
      break;
    case "priceLowHigh":
      results = results.sort((a, b) => priceRankOf(a.priceRange) - priceRankOf(b.priceRange));
      break;
    case "priceHighLow":
      results = results.sort((a, b) => priceRankOf(b.priceRange) - priceRankOf(a.priceRange));
      break;
    case "newest":
      results = results.sort((a, b) => b.createdAt - a.createdAt);
      break;
    default:
      break;
  }

  res.json(results);
});

export const getFeaturedRestaurants = asyncHandler(async (req, res) => {
  res.json(await Restaurant.find({ isFeatured: true }));
});

export const getTopRatedRestaurants = asyncHandler(async (req, res) => {
  res.json(await Restaurant.find({ isTopRated: true }));
});

export const getTrendingRestaurants = asyncHandler(async (req, res) => {
  res.json(await Restaurant.find({ isTrending: true }));
});

export const getRestaurantBySlug = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findOne({ slug: req.params.slug });
  if (!restaurant) {
    res.status(404);
    throw new Error("Restaurant not found");
  }
  res.json(restaurant);
});

export const getRelatedRestaurants = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    res.status(404);
    throw new Error("Restaurant not found");
  }
  const related = await Restaurant.find({ _id: { $ne: restaurant._id }, category: restaurant.category }).limit(4);
  res.json(related);
});

export const getRestaurantMenu = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    res.status(404);
    throw new Error("Restaurant not found");
  }
  res.json(restaurant.menu);
});

export const createRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.create({ ...req.body, owner: req.user._id });
  res.status(201).json(restaurant);
});

async function assertOwnership(req, res) {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    res.status(404);
    throw new Error("Restaurant not found");
  }
  if (req.user.role !== "admin" && String(restaurant.owner) !== String(req.user._id)) {
    res.status(403);
    throw new Error("You do not own this restaurant");
  }
  return restaurant;
}

export const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await assertOwnership(req, res);
  Object.assign(restaurant, req.body);
  await restaurant.save();
  res.json(restaurant);
});

export const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await assertOwnership(req, res);
  await restaurant.deleteOne();
  res.json({ id: restaurant._id, deleted: true });
});

export const addMenuItem = asyncHandler(async (req, res) => {
  const restaurant = await assertOwnership(req, res);
  restaurant.menu.push(req.body);
  await restaurant.save();
  res.status(201).json(restaurant.menu[restaurant.menu.length - 1]);
});
