import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users
router.get("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  const users = await User.find().select("-password"); // hide passwords
  res.json(users);
});

// Create user
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed, role });
  await user.save();
  res.json(user);
});

// Update user
router.put("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  Object.assign(user, req.body);
  if (req.body.password) user.password = await bcrypt.hash(req.body.password, 10);
  await user.save();
  res.json(user);
});

// Delete user
router.delete("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

export default router;
