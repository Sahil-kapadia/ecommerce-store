"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1220] to-[#020617] p-6">
      <div className="max-w-xl w-full text-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-10 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
        
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.6)]">
            <svg
              className="w-12 h-12 text-blue-400"
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
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-blue-400 mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-400 text-lg">
          Thank you for shopping with Kapadia K Mart
        </p>

        <div className="border-t border-white/20 mt-8 pt-6">
          <p className="text-gray-400 mb-8">
            Your order has been confirmed and will be processed shortly.
            You’ll receive updates as your order progresses.
          </p>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/")}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-500 transition shadow-[0_0_20px_rgba(59,130,246,0.6)]"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => router.push("/orders")}
              className="rounded-lg bg-white/10 border border-white/20 px-6 py-3 text-gray-200 hover:bg-white/20 transition"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
