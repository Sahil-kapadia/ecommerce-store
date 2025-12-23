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
      amount: amount * 100,
      currency: "INR",
      name: "Kapadia K Mart",
      description: "Secure Order Payment",
      handler: function (response) {
        setIsProcessing(false);
        onSuccess?.(response);
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
      },
      theme: {
        color: "#2563EB",
      },
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        setIsProcessing(false);
        onError
          ? onError(response.error)
          : alert("Payment failed. Please try again.");
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
      className="
        relative w-full rounded-xl py-4 text-lg font-semibold text-white
        bg-blue-600 hover:bg-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-[0_0_25px_rgba(59,130,246,0.6)]
        hover:shadow-[0_0_35px_rgba(59,130,246,0.85)]
        transition
      "
    >
      {isProcessing ? "Processing Payment..." : "Pay Securely"}
    </button>
  );
}
