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
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1220] to-[#020617] p-6">
          <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <h1 className="text-3xl font-bold text-blue-400 mb-4">
              Product not found
            </h1>
            <p className="text-gray-400 mb-6">
              The product you’re looking for doesn’t exist or has been removed.
            </p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] transition"
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1220] to-[#020617] p-6">
        <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <h1 className="text-3xl font-bold text-red-400 mb-4">
            Error loading product
          </h1>
          <p className="text-gray-400 mb-6">
            Something went wrong. Please try again later.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] transition"
          >
            Back to Home
          </a>
        </div>
      </main>
    );
  }
}
