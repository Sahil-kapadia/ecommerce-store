"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/products");
    } else {
      alert("Invalid password");
    }
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="border p-6 rounded w-80">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>

        <input
          type="password"
          placeholder="Admin password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </main>
  );
}
