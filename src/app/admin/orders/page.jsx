"use client";

import { useEffect, useState, useCallback } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders");

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function handleStatusChange(order, newStatus) {
    const orderId = order._id;
    if (!orderId) return;

    setUpdating(orderId);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      const updated = await res.json();
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, orderStatus: updated.orderStatus } : o
        )
      );
    } catch (err) {
      alert(err.message || "Failed to update order");
    } finally {
      setUpdating(null);
    }
  }

  /* ================= Loading ================= */
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1220] to-[#020617]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading orders...</p>
        </div>
      </main>
    );
  }

  /* ================= Error ================= */
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1220] to-[#020617]">
        <div className="text-center space-y-4">
          <p className="text-red-400 text-lg">{error}</p>
          <button
            onClick={fetchOrders}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  /* ================= Empty ================= */
  if (orders.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1220] to-[#020617]">
        <p className="text-gray-400 text-lg">No orders found</p>
      </main>
    );
  }

  /* ================= Orders ================= */
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#020617] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400 tracking-wide">
            Admin Orders
          </h1>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 rounded-lg bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20 transition"
          >
            Refresh
          </button>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-[0_0_25px_rgba(59,130,246,0.15)]"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <p className="text-sm text-gray-400">
                    Order ID
                  </p>
                  <p className="text-gray-200 font-mono text-sm">
                    {order._id}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="text-right space-y-2">
                  <p className="text-xl font-bold text-blue-400">
                    ₹{order.amount}
                  </p>

                  <span
                    className={`inline-block text-xs px-3 py-1 rounded-full ${
                      order.paymentStatus === "paid"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {order.paymentStatus.toUpperCase()}
                  </span>

                  <select
                    value={order.orderStatus}
                    disabled={updating === order._id}
                    onChange={(e) =>
                      handleStatusChange(order, e.target.value)
                    }
                    className="block mt-2 bg-black/40 border border-white/20 rounded-lg px-3 py-1 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-gray-300 font-semibold mb-3">
                  Products
                </p>

                <ul className="space-y-2">
                  {order.products.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between bg-black/30 rounded-lg px-4 py-2 text-sm text-gray-300"
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
      </div>
    </main>
  );
}
