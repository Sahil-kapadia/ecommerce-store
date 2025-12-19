"use client";

import { useRouter } from "next/navigation";

export default function RazorpayCheckout({ cartItems, totalAmount }) {
  const router = useRouter();

  // Load Razorpay script dynamically
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
    // STEP 1: Load Razorpay SDK
    const isLoaded = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // STEP 2: Create Razorpay order from backend
    const orderRes = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: totalAmount,
        receipt: "receipt_" + Date.now(),
      }),
    });

    if (!orderRes.ok) {
      alert("Failed to create Razorpay order");
      return;
    }

    const order = await orderRes.json();

    // STEP 3: Configure Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Sahil Store",
      description: "Order Payment",
      order_id: order.id,

      handler: async function (response) {
        try {
          // STEP 4: Save order AFTER payment success
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
            throw new Error("Order saving failed");
          }

          // STEP 5: Redirect ONLY after DB save success
          router.push("/success");
        } catch (error) {
          console.error(error);
          alert("Payment succeeded but order saving failed");
        }
      },

      prefill: {
        name: "Customer",
        email: "customer@example.com",
      },

      theme: {
        color: "#000000",
      },
    };

    // STEP 6: Open Razorpay popup
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  return (
    <button
      onClick={handlePayment}
      className="bg-black text-white px-4 py-2 rounded mt-4"
    >
      Pay with Razorpay
    </button>
  );
}
