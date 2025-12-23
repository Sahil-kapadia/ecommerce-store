"use client";

import { useCart } from "../../../context/CartContext";

export default function ProductDetailsClient({ product }) {
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#020617] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* Product Image */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-[350px] object-cover rounded-xl"
              />
            )}
          </div>

          {/* Product Info */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
            <h1 className="text-3xl font-bold text-gray-200 tracking-wide">
              {product.name}
            </h1>

            {product.description && (
              <p className="text-gray-400 mt-4 leading-relaxed">
                {product.description}
              </p>
            )}

            <p className="text-3xl text-blue-400 font-bold mt-6">
              ₹{product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-500 transition shadow-[0_0_25px_rgba(59,130,246,0.6)]"
            >
              Add to Cart
            </button>

            {/* Trust badges / extra info */}
            <div className="mt-6 flex gap-4 text-sm text-gray-400">
              <span>✔ Secure Payment</span>
              <span>✔ Fast Delivery</span>
              <span>✔ Quality Assured</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
