export const dynamic = "force-dynamic";
import Link from "next/link";
async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
  cache: "no-store",
});

if (!res.ok) {
  console.error("Products API failed");
  return [];
}

return res.json();
}

export default async function Home() {
  let products = [];

try {
  products = await getProducts();
} catch (err) {
  console.error(err);
}


  return(
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-xl md:text-3xl font-bold text-center">
        E-Commerce Store
      </h1>

      <p className="text-center text-gray-600 mt-2">
        Browse our Latest products
      </p>

      {/* Error / empty states */}
      {products.length === 0 &&(
        <p className="mt-6 text-center text-gray-500">
          No Products Available
        </p>
      )}

      {/* product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {products.map((product)=>(
          <div 
          key={product._id}
          className="border rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div>
              <img
  src={product.imageUrl}
  alt={product.name}
  className="w-full h-48 object-cover rounded mb-3"
/>
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span>
                $ {product.price}
              </span>
              <Link 
              href={`/product/${product._id}`}
              className="text-sm px-3 py-1 border rounded-full hover:bg-black hover:text-white transition"
              >
                View
                </Link>
            </div>
            </div>
        ))}
      </div>
    </main>
  );
}