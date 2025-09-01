import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  serviceName: String,
  cost: Number,
  billingCycle: String,
  renewalDate: Date,
  notes: String,
  shared: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Subscription", subscriptionSchema);
