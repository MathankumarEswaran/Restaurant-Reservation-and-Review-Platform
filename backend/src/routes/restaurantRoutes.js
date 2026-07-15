import { Router } from "express";
import {
  getRestaurants,
  getFeaturedRestaurants,
  getTopRatedRestaurants,
  getTrendingRestaurants,
  getRestaurantBySlug,
  getRelatedRestaurants,
  getRestaurantMenu,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addMenuItem,
} from "../controllers/restaurantController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", getRestaurants);
router.get("/featured", getFeaturedRestaurants);
router.get("/top-rated", getTopRatedRestaurants);
router.get("/trending", getTrendingRestaurants);
router.get("/:slug", getRestaurantBySlug);
router.get("/:id/related", getRelatedRestaurants);
router.get("/:id/menu", getRestaurantMenu);

router.post("/", protect, authorize("owner", "admin"), createRestaurant);
router.put("/:id", protect, authorize("owner", "admin"), updateRestaurant);
router.delete("/:id", protect, authorize("owner", "admin"), deleteRestaurant);
router.post("/:id/menu", protect, authorize("owner", "admin"), addMenuItem);

export default router;
