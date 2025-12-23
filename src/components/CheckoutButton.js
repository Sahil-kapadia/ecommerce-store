"use client";

import { useState } from "react";

export default function CheckoutButton({ amount, onSuccess, onError }) {
  const [isProcessing, setIsProcessing] = useState(false);

  function handlePayment() {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please refresh and try again.");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Invalid amount");
      return;
    }

    setIsProcessing(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100, // Convert to paise
      currency: "INR",
      name: "My Store",
      description: "Order Payment",
      handler: function (response) {
        setIsProcessing(false);
        if (onSuccess) {
          onSuccess(response);
        } else {
          alert("Payment Successful!");
          console.log(response);
        }
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
      },
      theme: {
        color: "#000000",
      },
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        setIsProcessing(false);
        if (onError) {
          onError(response.error);
        } else {
          alert("Payment failed. Please try again.");
          console.error(response.error);
        }
      });
      razorpay.open();
    } catch (error) {
      setIsProcessing(false);
      console.error("Razorpay error:", error);
      alert("Failed to open payment gateway");
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
    >
      {isProcessing ? "Processing..." : "Pay Now"}
    </button>
  );
}