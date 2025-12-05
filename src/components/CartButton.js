// src/components/CartButton.js
"use client";
import React from "react";
import { useCart } from "../context/CartContext"; // relative import
import Link from "next/link";

export default function CartButton() {
  const { count } = useCart();

  return (
    <Link href="/cart" className="relative inline-flex items-center px-3 py-1">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 6M7 13l-2 6m13-6l2 6M9 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"/>
      </svg>

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
          {count}
        </span>
      )}
    </Link>
  );
}
