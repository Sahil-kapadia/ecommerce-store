"use client";

import { useEffect, useState, useCallback } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch products");

      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      setProducts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      const res = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add product");

      setName("");
      setPrice("");
      setDescription("");
      setImage(null);

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

      await fetchProducts();
      alert("Product added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      await fetchProducts();
      alert("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  }

  /* ================= Loading ================= */
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1220] to-[#020617]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading products...</p>
        </div>
      </main>
    );
  }

  /* ================= Page ================= */
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#020617] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400 tracking-wide">
            Admin Products
          </h1>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 transition"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3">
            {error}
          </div>
        )}

        {/* Add Product Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-[0_0_25px_rgba(59,130,246,0.15)] space-y-4"
        >
          <h2 className="text-lg font-semibold text-blue-300">
            Add New Product
          </h2>

          <input
            className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            required
          />

          <input
            type="number"
            min="0"
            step="0.01"
            className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={submitting}
            required
          />

          <textarea
            rows="3"
            className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitting}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            disabled={submitting}
            required
            className="w-full text-gray-300"
          />

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-500 disabled:opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          >
            {submitting ? "Adding..." : "Add Product"}
          </button>
        </form>

        {/* Product List */}
        {products.length === 0 ? (
          <p className="text-gray-400 text-center py-12">
            No products added yet
          </p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product._id}
                className="flex justify-between items-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition"
              >
                <div className="flex items-center gap-4">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <p className="text-gray-200 font-semibold">
                      {product.name}
                    </p>
                    <p className="text-blue-400 font-bold">
                      ₹{product.price}
                    </p>
                    {product.description && (
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="rounded-lg border border-red-500/50 px-4 py-2 text-red-400 hover:bg-red-500/10 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
