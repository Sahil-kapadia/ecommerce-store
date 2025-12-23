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

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError("Unable to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  async function handleStatusChange(order, newStatus) {
    const orderId = order._id;
    
    if (!orderId) {
      console.error("Order missing _id:", order);
      alert("Invalid order ID");
      return;
    }
    
    setUpdating(orderId);
    
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (!res.ok) {
        const responseData = await res.json();
        throw new Error(responseData.message || "Failed to update order");
      }

      const responseData = await res.json();

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? { ...o, orderStatus: responseData.orderStatus }
            : o
        )
      );
    } catch (err) {
      console.error("Update error:", err);
      alert(err.message || "Failed to update order status");
    } finally {
      setUpdating(null);
    }
  }

  if (loading) {
    return (
      <main className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading orders...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg text-gray-600">No orders found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin – Orders</h1>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm transition"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          if (!order._id) {
            console.error("Order missing _id:", order);
            return null;
          }

          return (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold text-sm">
                    Order ID: {order._id}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {new Date(order.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">₹{order.amount}</p>
                  <div className="flex flex-col items-end gap-2 mt-2">
                    <p
                      className={`text-sm font-semibold ${
                        order.paymentStatus === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.paymentStatus.toUpperCase()}
                    </p>

                    <select
                      value={order.orderStatus || "pending"}
                      onChange={(e) =>
                        handleStatusChange(order, e.target.value)
                      }
                      disabled={updating === order._id}
                      className={`border rounded px-3 py-1 text-sm ${
                        updating === order._id
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:border-gray-400"
                      } ${
                        order.orderStatus === "pending"
                          ? "border-yellow-500 text-yellow-700"
                          : order.orderStatus === "shipped"
                          ? "border-blue-500 text-blue-700"
                          : "border-green-500 text-green-700"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Products</p>

                {order.products && order.products.length > 0 ? (
                  <ul className="space-y-2">
                    {order.products.map((item, index) => (
                      <li
                        key={`${order._id}-${item.productId || index}`}
                        className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                      >
                        <span className="font-medium">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-gray-700">
                          ₹{item.price} × {item.quantity} = ₹
                          {item.price * item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No products</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}