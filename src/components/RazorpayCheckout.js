"use client";

export default function RazorpayCheckout({ amount }) {

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
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // 1. Create order on backend
    const orderRes = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, receipt: "order_123" }),
    });

    const order = await orderRes.json();

    // 2. Open Razorpay popup
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Sahil Store",
      description: "Test Transaction",
      order_id: order.id,
      handler: function (response) {
        window.location.href = "/success";
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
