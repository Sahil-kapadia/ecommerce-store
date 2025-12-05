"use client";

import { useCart } from "../../../context/CartContext";

export default function ProductDetailsClient({ product }) {
  const { addToCart } = useCart();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>

      <p className="text-gray-600 mt-2">{product.description}</p>

      <p className="text-2xl text-blue-600 font-semibold mt-4">
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </main>
  );
}
