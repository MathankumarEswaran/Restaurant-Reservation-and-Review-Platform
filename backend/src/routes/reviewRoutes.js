import { Router } from "express";
import { getReviewsByRestaurant, getReviewsByUser, getAllReviews, submitReview, replyToReview } from "../controllers/reviewController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/restaurant/:restaurantId", getReviewsByRestaurant);
router.get("/user/:userId", protect, getReviewsByUser);
router.get("/", protect, authorize("admin"), getAllReviews);
router.post("/", protect, submitReview);
router.post("/:id/reply", protect, authorize("owner", "admin"), replyToReview);

export default router;
