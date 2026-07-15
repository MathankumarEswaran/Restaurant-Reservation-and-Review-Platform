import { Router } from "express";
import { getNotificationsByUser, markNotificationRead } from "../controllers/notificationController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/user/:userId", protect, getNotificationsByUser);
router.patch("/:id/read", protect, markNotificationRead);

export default router;
