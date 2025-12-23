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
    // 🛑 Basic validations
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
      // 🔐 LOGIN CHECK (IMPORTANT)
      const authCheck = await fetch("/api/orders/user");
      if (authCheck.status === 401) {
        alert("Please login to continue checkout");
        router.push("/login");
        setIsProcessing(false);
        return;
      }

      // 🔹 Load Razorpay SDK
      const isLoaded = await loadRazorpay(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }

      // 🔹 Create Razorpay Order
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

      // 🔹 Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Kapadia K Mart",
        description: "Secure Order Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            // 🔹 Save order after successful payment
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
              throw new Error(
                errorData.message || "Order saving failed"
              );
            }

            router.push("/success");
          } catch (error) {
            console.error("Order save error:", error);
            alert(
              "Payment succeeded but order saving failed.\nPayment ID: " +
                response.razorpay_payment_id
            );
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
          color: "#2563EB",
        },
      };

      // 🔹 Open Razorpay
      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        setIsProcessing(false);
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
      className="
        flex-1 rounded-xl py-4 text-lg font-semibold text-white
        bg-blue-600 hover:bg-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-[0_0_30px_rgba(59,130,246,0.7)]
        hover:shadow-[0_0_45px_rgba(59,130,246,0.9)]
        transition
      "
    >
      {isProcessing
        ? "Processing Payment..."
        : "Proceed to Secure Payment"}
    </button>
  );
}
