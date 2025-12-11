"use client";

export default function CheckoutButton({ amount }) {
  function handlePayment() {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Check your script tag.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "My Store",
      description: "Order Payment",
      handler: function (response) {
        alert("Payment Successful!");
        console.log(response);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  return (
    <button
      onClick={handlePayment}
      className="bg-black text-white px-6 py-2 rounded"
    >
      Pay Now
    </button>
  );
}
