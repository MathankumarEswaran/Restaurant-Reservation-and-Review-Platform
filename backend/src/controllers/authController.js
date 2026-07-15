import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409);
    throw new Error("An account with this email already exists");
  }

  const user = await User.create({ name, email, phone, password, role: "customer" });
  res.status(201).json({ user, token: generateToken(user._id) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({ user, token: generateToken(user._id) });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.json({ sent: Boolean(user) });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { userId, newPassword } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.password = newPassword;
  await user.save();
  res.json({ success: true });
});
