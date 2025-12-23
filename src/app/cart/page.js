"use client";
import { useRouter } from "next/navigation";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  /* ================= Empty Cart ================= */
  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1220] to-[#020617] p-6">
        <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-400 mb-6">
            Add some products to get started
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] transition"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  /* ================= Cart ================= */
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#020617] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400 tracking-wide">
            Your Cart
          </h1>
          <button
            onClick={() => router.push("/")}
            className="text-blue-300 hover:text-blue-400 transition"
          >
            Continue Shopping →
          </button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center gap-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            >
              <div className="flex items-center gap-4 flex-1">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-200">
                    {item.name}
                  </h2>
                  <p className="text-blue-400 font-bold">
                    ₹{item.price}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Subtotal: ₹{item.price * item.qty}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item._id)}
                  disabled={item.qty <= 1}
                  className="px-3 py-1 rounded-lg bg-black/40 border border-white/20 text-gray-200 hover:bg-black/60 disabled:opacity-40"
                >
                  −
                </button>

                <span className="min-w-[2rem] text-center text-gray-200 font-semibold">
                  {item.qty}
                </span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="px-3 py-1 rounded-lg bg-black/40 border border-white/20 text-gray-200 hover:bg-black/60"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="ml-3 rounded-lg border border-red-500/50 px-3 py-1 text-red-400 hover:bg-red-500/10 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-[0_0_25px_rgba(59,130,246,0.15)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-200">
              Total
            </h2>
            <p className="text-2xl font-bold text-blue-400">
              ₹{total.toFixed(2)}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="flex-1 rounded-lg bg-white/10 border border-white/20 text-gray-300 px-6 py-3 hover:bg-white/20 transition"
            >
              Clear Cart
            </button>

            <RazorpayCheckout
              cartItems={cart}
              totalAmount={total}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
