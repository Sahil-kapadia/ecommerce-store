"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RazorpayCheckout({ cartItems, totalAmount }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  function loadRazorpay(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handlePayment() {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!totalAmount || totalAmount <= 0) {
      alert("Invalid amount");
      return;
    }

    setIsProcessing(true);

    try {
      // Load Razorpay SDK
      const isLoaded = await loadRazorpay(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }

      // Create Razorpay order
      const orderRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          receipt: "receipt_" + Date.now(),
        }),
      });

      if (!orderRes.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const order = await orderRes.json();

      // Configure Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Sahil Store",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            // Save order after payment success
            const saveRes = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: totalAmount,
                products: cartItems,
              }),
            });

            if (!saveRes.ok) {
              const errorData = await saveRes.json();
              throw new Error(errorData.message || "Order saving failed");
            }

            // Redirect after successful order save
            router.push("/success");
          } catch (error) {
            console.error("Order save error:", error);
            alert("Payment succeeded but order saving failed. Please contact support with your payment ID: " + response.razorpay_payment_id);
          } finally {
            setIsProcessing(false);
          }
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
          color: "#000000",
        },
      };

      // Open Razorpay popup
      const razorpay = new window.Razorpay(options);
      
      razorpay.on("payment.failed", function (response) {
        setIsProcessing(false);
        console.error("Payment failed:", response.error);
        alert("Payment failed: " + response.error.description);
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message || "Failed to process payment");
      setIsProcessing(false);
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className="flex-1 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
    >
      {isProcessing ? "Processing..." : "Proceed to Payment"}
    </button>
  );
}