"use client";

export default function RazorpayCheckoutButton({ cart, total }) {
  async function handlePayment() {
    // 1. Create Razorpay order on backend
    const orderRes = await fetch("/api/razorpay-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        total,
      }),
    });

    const order = await orderRes.json();
    if (!order.success) {
      return alert("Order creation failed");
    }

    // 2. Open Razorpay popup
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Sahil Store",
      description: "Order Payment",
      order_id: order.orderId,

      handler: async function (response) {
        // 3. Update order status to PAID
        await fetch("/api/orders/update-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dbOrderId: order.dbOrderId,
            razorpayPaymentId: response.razorpay_payment_id,
          }),
        });

        window.location.href = "/success";
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  return (
    <button
      onClick={handlePayment}
      className="bg-black text-white px-6 py-3 rounded-lg mt-4"
    >
      Pay with Razorpay
    </button>
  );
}
