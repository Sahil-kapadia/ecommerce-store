export default function AdminPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1220] to-[#020617] p-6">
      <div className="max-w-xl w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-10 text-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        <h1 className="text-3xl font-bold text-blue-400 tracking-wide mb-4">
          Admin Dashboard
        </h1>

        <p className="text-gray-400 text-lg">
          Welcome to <span className="text-blue-300 font-semibold">Kapadia K Mart</span>
        </p>

        <p className="mt-4 text-gray-500">
          Manage products, orders, and store settings from the admin panel.
        </p>

        <div className="mt-8 text-sm text-gray-500">
          🚧 More admin features coming soon
        </div>
      </div>
    </main>
  );
}
