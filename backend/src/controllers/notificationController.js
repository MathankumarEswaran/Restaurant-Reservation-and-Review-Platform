import { Notification } from "../models/Notification.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const getNotificationsByUser = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin" && String(req.user._id) !== req.params.userId) {
    res.status(403);
    throw new Error("You can only view your own notifications");
  }
  res.json(await Notification.find({ user: req.params.userId }).sort({ createdAt: -1 }));
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }
  if (req.user.role !== "admin" && String(notification.user) !== String(req.user._id)) {
    res.status(403);
    throw new Error("You can only update your own notifications");
  }
  notification.isRead = true;
  await notification.save();
  res.json(notification);
});
