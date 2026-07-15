import { Router } from "express";
import { createOrder, verifyAndCreateReservation } from "../controllers/paymentController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/order", protect, createOrder);
router.post("/verify", protect, verifyAndCreateReservation);

export default router;
