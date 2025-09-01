import express from "express";
import Subscription from "../models/Subscription.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get subscriptions
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { role, id } = req.user;
    const subs = role === "admin"
      ? await Subscription.find().populate("user", "name email")
      : await Subscription.find({ $or: [{ user: id }, { shared: true }] });
    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create subscription
router.post("/", authMiddleware, async (req, res) => {
  try {
    const sub = new Subscription({ ...req.body, user: req.user.id });
    await sub.save();
    res.json(sub);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create subscription" });
  }
});

// Update subscription
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub) return res.status(404).json({ message: "Not found" });
    if (req.user.role !== "admin" && sub.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    Object.assign(sub, req.body);
    await sub.save();
    res.json(sub);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update subscription" });
  }
});

// Delete subscription
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub) return res.status(404).json({ message: "Not found" });

    if (req.user.role !== "admin" && sub.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Safer deletion
    await Subscription.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete subscription error:", err);
    res.status(500).json({ message: "Failed to delete subscription" });
  }
});

export default router;
