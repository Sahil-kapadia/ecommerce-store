"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.message || "Login failed");
    }
  }

  return (
    <main className="h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="border p-6 rounded-lg w-80 bg-white shadow-md"
      >
        <h1 className="text-xl font-bold mb-4 text-center">User Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-600 text-sm mb-2 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>

        {/* ✅ SIGNUP LINK (VISIBLE & CLEAR) */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
