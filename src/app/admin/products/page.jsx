"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // fetch products

  async function fetchProducts() {
  try {
    const res = await fetch("/api/admin/products", {
  credentials: "include",
});


    if (!res.ok) {
      throw new Error("Failed to fetch");
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
  } catch (error) {
    console.error("Fetch products error:", error);
    setProducts([]);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    fetchProducts();
  }, []);

  // add product (FormData for image upload)
  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    await fetch("/api/admin/products", {
      method: "POST",
      body: formData,
    });

    // reset form
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);

    fetchProducts();
  }

  // delete product
  async function deleteProduct(id) {
    await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  }

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin – Products</h1>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="border p-2 w-full"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      {/* Empty state */}
      {products.length === 0 && (
        <p className="text-gray-500 mb-4">No products yet</p>
      )}

      {/* Product List */}
      <ul className="space-y-3">
        {products.map((product) => (
          <li
            key={product._id}
            className="border p-3 flex justify-between items-center"
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
              </div>
            </div>

            <button
              onClick={() => deleteProduct(product._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
