import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  // Fetch product
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <h1 className="text-center mt-10">Product not found</h1>;
  }

  const product = await res.json();

  return <ProductDetailsClient product={product} />;
}
