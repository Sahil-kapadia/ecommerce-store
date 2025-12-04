export default function ProductDetailsPage({params}){
    return(
        <main className="p-4">
            <h1 className="text-xl md:text-2xl font-semibold">
                Product Details!!!
            </h1>

            <p className="mt-2 text-gray-600">
                Product ID:{params.id}
            </p>

            <p className="mt-4">
                This is a Dummy Product display page.
            </p>
        </main>
    );
}