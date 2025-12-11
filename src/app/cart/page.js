"use client";
import RazorpayCheckoutButton from "@/components/RazorpayCheckoutButton"; 
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return <h1 className="text-center mt-10">Your cart is empty</h1>;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center border p-4 rounded-lg mb-4"
        >
          <div>
            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p className="text-gray-600">₹{item.price}</p>


          </div>

          <div className="flex items-center gap-3">
            <button className="px-2 py-1 border" onClick={() => decreaseQty(item._id)}>
              -
            </button>
            <span>{item.qty}</span>
            <button className="px-2 py-1 border" onClick={() => increaseQty(item._id)}>
              +
            </button>

            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-600 ml-4"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 text-right">
  <h2 className="text-xl font-bold">Total: ₹{total}</h2>

  <RazorpayCheckoutButton cart={cart} total={total} />
</div>

    </main>
  );
}
