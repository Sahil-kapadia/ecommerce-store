"use client";

import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-600 text-sm mt-1">{product.category}</p>
      <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
