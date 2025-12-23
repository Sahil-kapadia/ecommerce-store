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

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const text = await res.text();

      if (!text) {
        setProducts([]);
        return;
      }

      const data = JSON.parse(text);

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
      setError(null);
    } catch (error) {
      console.error("Fetch products error:", error);
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

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      // reset form
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

      await fetchProducts();
      alert("Product added successfully!");
    } catch (error) {
      console.error("Add product error:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      await fetchProducts();
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Delete product error:", error);
      alert("Failed to delete product. Please try again.");
    }
  }

  if (loading) {
    return (
      <main className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin – Products</h1>
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm transition"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

        <div>
          <label htmlFor="product-name" className="block text-sm font-medium mb-1">
            Product Name *
          </label>
          <input
            id="product-name"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            required
          />
        </div>

        <div>
          <label htmlFor="product-price" className="block text-sm font-medium mb-1">
            Price (₹) *
          </label>
          <input
            id="product-price"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-black"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={submitting}
            required
          />
        </div>

        <div>
          <label htmlFor="product-description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="product-description"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter product description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="product-image" className="block text-sm font-medium mb-1">
            Product Image *
          </label>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            disabled={submitting}
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No products yet</p>
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <li
              key={product._id}
              className="border p-4 flex justify-between items-center rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}

                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">₹{product.price}</p>
                  {product.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => deleteProduct(product._id)}
                className="text-red-600 hover:text-red-800 px-4 py-2 border border-red-600 rounded hover:bg-red-50 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}