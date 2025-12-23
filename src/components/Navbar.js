"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { cart } = useCart();
  const { user, setUser, loading } = useAuth();
  const router = useRouter();

  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  }

  return (
    <nav className="p-4 flex justify-between items-center border-b bg-white">
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo1.png" className="w-8 h-8" />
        <span className="text-xl font-bold">Kapadia K Mart</span>
      </Link>

      <div className="flex gap-4 items-center">
        <Link href="/cart">Cart ({itemCount})</Link>

        {!loading && (
          user ? (
            <>
              <Link href="/orders">My Orders</Link>
              <button
                onClick={handleLogout}
                className="text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )
        )}
      </div>
    </nav>
  );
}
