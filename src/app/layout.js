// src/app/layout.js
import "./globals.css";
// use relative path from src/app to src/components and src/context
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
