export const dynamic = "force-dynamic";
import Link from "next/link";

async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Products API failed with status:", res.status);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          E-Commerce Store
        </h1>
        <p className="text-gray-600 text-lg">
          Browse our latest products
        </p>
      </div>

      {/* Error / empty states */}
      {products.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            No products available at the moment
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Check back soon for new arrivals!
          </p>
        </div>
      )}

      {/* Product grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow bg-white"
            >
              <div>
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                {product.description && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">
                  ₹{product.price}
                </span>
                <Link
                  href={`/product/${product._id}`}
                  className="text-sm px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}