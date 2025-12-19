"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/admin/orders");

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError("Unable to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <p>Loading orders...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="p-6">
        <p>No orders found</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Admin – Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4"
          >
            {/* Order header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold">
                  Order ID: {order._id.slice(-8)}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">
                  ₹{order.amount}
                </p>
                <p className={`text-sm font-semibold ${
  order.paymentStatus === "paid"
    ? "text-green-600"
    : "text-red-600"
}`}>
  {order.paymentStatus.toUpperCase()}
</p>
              </div>
            </div>

            {/* Products list */}
            <div className="border-t pt-4">
              <p className="font-semibold mb-2">
                Products
              </p>

              <ul className="space-y-2">
                {order.products.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
