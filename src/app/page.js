export default function Home(){
  return(
    <main className="p-4">
      <h1 className="text-xl md:text-3xl font-bold text-center">
        E-Commerce Store
      </h1>

      <p className="text-center text-grey-600 mt-2">
        Mobile-First Responsive Layout!!!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <div className="border pd-4 rounded-lg text-center">
          Product 1
        </div>

        <div className="border pd-4 rounded-lg text-center">
          Product 2
        </div>

        <div className="border pd-4 rounded-lg text-center">
          Product 3
        </div>
      </div>
    </main>
  );
}