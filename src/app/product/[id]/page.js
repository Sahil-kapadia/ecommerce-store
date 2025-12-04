import { notFound } from "next/navigation";

async function getProduct(id) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailsPage({ params }) {
  // ✅ REQUIRED in Next.js 16
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2 text-gray-600">{product.description}</p>

      <div className="mt-4 flex justify-between">
        <span className="text-xl font-semibold">₹ {product.price}</span>
        <span className="px-3 py-1 border rounded">
          {product.category || "Uncategorized"}
        </span>
      </div>

      <p className="mt-4 text-sm">
        Status:{" "}
        <span className="font-semibold">
          {product.inStock ? "In stock" : "Out of stock"}
        </span>
      </p>
    </main>
  );
}
