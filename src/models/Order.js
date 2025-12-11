import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  total: Number,
  currency: { type: String, default: "INR" },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  customerEmail: { type: String, default: null },
  status: { type: String, default: "pending" }, // pending, paid, shipped
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
