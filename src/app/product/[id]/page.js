import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return (
        <main className="p-6 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Product not found
            </h1>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <a
              href="/"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Back to Home
            </a>
          </div>
        </main>
      );
    }

    const product = await res.json();

    return <ProductDetailsClient product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Error loading product
          </h1>
          <p className="text-gray-600 mb-6">
            Something went wrong. Please try again later.
          </p>
          <a
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Back to Home
          </a>
        </div>
      </main>
    );
  }
}