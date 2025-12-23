// src/components/CartButton.js
"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartButton() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center rounded-full p-2
                 bg-white/10 backdrop-blur-md border border-white/20
                 text-blue-300 hover:text-white
                 shadow-[0_0_15px_rgba(59,130,246,0.4)]
                 hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]
                 transition"
    >
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 6M7 13l-2 6m13-6l2 6M9 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>

      {count > 0 && (
        <span
          className="absolute -top-2 -right-2 min-w-[1.5rem] h-6
                     flex items-center justify-center
                     rounded-full bg-blue-600 text-white text-xs font-semibold
                     shadow-[0_0_12px_rgba(59,130,246,0.8)]"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
