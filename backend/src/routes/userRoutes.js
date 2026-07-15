import { Router } from "express";
import { getMyFavorites, toggleFavorite } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/me/favorites", protect, getMyFavorites);
router.post("/me/favorites/:restaurantId", protect, toggleFavorite);

export default router;
