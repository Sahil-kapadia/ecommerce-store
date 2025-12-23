"use client";

import { useEffect, useState } from "react";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders/my");

        if (!res.ok) {
          setOrders([]);
          return;
        }

        const text = await res.text();

        if (!text) {
          setOrders([]);
          return;
        }

        const data = JSON.parse(text);
        setOrders(data || []);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <main className="p-6 text-center text-gray-600">
        You haven’t placed any orders yet.
      </main>
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 rounded-lg bg-white shadow"
        >
          <p className="font-semibold">Order ID: {order._id}</p>
          <p>Status: {order.orderStatus}</p>
          <p>Total: ₹{order.amount}</p>

          <ul className="mt-2 text-sm">
            {order.products?.map((p, i) => (
              <li key={i}>
                {p.name} × {p.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
