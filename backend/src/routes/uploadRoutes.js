import { Router } from "express";
import { protect, authorize } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.post("/image", protect, authorize("owner", "admin"), upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No image file provided");
  }
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

export default router;
