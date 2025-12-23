"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on success
    clearCart();
  }, [clearCart]);

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <div className="text-center bg-white rounded-lg shadow-lg p-12">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for your order!
          </p>
        </div>

        <div className="border-t pt-6 mt-6">
          <p className="text-gray-700 mb-6">
            Your order has been confirmed and will be processed shortly. 
            You will receive a confirmation email with order details.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/")}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push("/orders")}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}