import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import subscriptionRoutes from "./routes/subscriptions.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ This is required for req.body to work

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/users",userRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("Subscription Manager API is running");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
