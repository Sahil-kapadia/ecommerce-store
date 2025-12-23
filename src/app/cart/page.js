"use client";
import { useRouter } from "next/navigation";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <button
            onClick={() => router.push("/")}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button
          onClick={() => router.push("/")}
          className="text-blue-600 hover:underline"
        >
          Continue Shopping
        </button>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border p-4 rounded-lg bg-white shadow-sm"
          >
            <div className="flex items-center gap-4 flex-1">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-600">₹{item.price}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Subtotal: ₹{item.price * item.qty}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="px-3 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => decreaseQty(item._id)}
                disabled={item.qty <= 1}
              >
                -
              </button>
              <span className="font-semibold min-w-[2rem] text-center">
                {item.qty}
              </span>
              <button
                className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                onClick={() => increaseQty(item._id)}
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 hover:text-red-800 ml-4 px-3 py-1 border border-red-600 rounded hover:bg-red-50 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Total:</h2>
          <p className="text-2xl font-bold">₹{total.toFixed(2)}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Clear Cart
          </button>
          <RazorpayCheckout cartItems={cart} totalAmount={total} />
        </div>
      </div>
    </main>
  );
}