"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="p-4 flex justify-between border-b bg-white sticky top-0">
      <Link href="/" className="text-xl font-bold">
        Shop
      </Link>

      <Link href="/cart" className="text-lg">
        Cart ({itemCount})
      </Link>
    </nav>
  );
}
