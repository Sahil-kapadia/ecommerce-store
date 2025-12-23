"use client";

import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div
      className="
        rounded-2xl bg-white/10 backdrop-blur-md
        border border-white/20
        p-5
        shadow-[0_0_25px_rgba(59,130,246,0.15)]
        hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]
        transition
      "
    >
      <h2 className="font-semibold text-lg text-gray-200">
        {product.name}
      </h2>

      {product.category && (
        <p className="text-gray-400 text-sm mt-1">
          {product.category}
        </p>
      )}

      <p className="text-blue-400 font-bold text-xl mt-3">
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="
          mt-5 w-full rounded-xl
          bg-blue-600 py-3 text-white font-semibold
          hover:bg-blue-500
          shadow-[0_0_20px_rgba(59,130,246,0.6)]
          transition
        "
      >
        Add to Cart
      </button>
    </div>
  );
}
