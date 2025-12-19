import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    razorpayPaymentId: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpaySignature: { type: String, required: true },
    amount: { type: Number, required: true },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    paymentStatus: {
      type: String,
      enum: ["paid", "failed"],
      default: "paid",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);
