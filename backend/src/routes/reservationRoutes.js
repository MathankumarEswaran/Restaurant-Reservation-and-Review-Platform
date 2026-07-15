import { Router } from "express";
import { getReservationsByUser, getAllReservations, createReservation, cancelReservation } from "../controllers/reservationController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/user/:userId", protect, getReservationsByUser);
router.get("/", protect, authorize("admin"), getAllReservations);
router.post("/", protect, createReservation);
router.patch("/:id/cancel", protect, cancelReservation);

export default router;
