🛒 Kapadia K Mart — Full-Stack E-commerce Project Journey
This document tracks the step-by-step development journey of Kapadia K Mart, a full-stack e-commerce web application built using Next.js (App Router), MongoDB, Razorpay, and Cloudinary.
It highlights architectural decisions, challenges solved, and real-world engineering practices applied throughout the project.

✅ Day 1 — Project Setup & Routing
Focus: Application foundation and navigation

Implemented
Initialized Next.js (App Router) project
Configured Tailwind CSS
Set up global layout and reusable Navbar
Implemented static and dynamic routing
Ensured fully responsive UI (mobile & desktop)

Outcome
Clean project structure
Stable routing system
Responsive baseline UI

✅ Day 2 — Backend & Database Setup
Focus: Database connectivity and API foundation

Implemented
Created MongoDB Atlas cluster
Connected MongoDB using Mongoose
Designed Product schema for Kapadia K Mart catalog
Implemented /api/products endpoint
Verified API responses and database connectivity
Debugging & Learning
Fixed .env.local configuration issues
Resolved MongoDB IP whitelist errors
Debugged import/export mismatches
Understood server execution in Next.js App Router

Outcome
Backend stabilized
Database connected successfully
Product API fully functional

✅ Day 3 — Product Listing & Product Details
Focus: Frontend ↔ Backend integration

Implemented
Fetched products from /api/products
Rendered product grid on Kapadia K Mart Home page
Implemented dynamic routing /product/[id]
Built /api/products/[id] endpoint
Added MongoDB ObjectId validation
Implemented 404 and error handling
Built responsive Product Details page

Outcome
Product listing works reliably
Product details page loads correctly
Clean, error-free routing

✅ Day 4 — Shopping Cart System
Focus: Client-side state management & real e-commerce behavior

Implemented
Global CartContext using React Context API
Wrapped application with <CartProvider>
Added Add to Cart functionality
Live cart item count in Navbar
Cart Features
Add & merge duplicate products
Increase / decrease quantity
Remove items
Auto-calculate subtotal and total
Clear cart after checkout
Storage
Cart persisted using localStorage
Auto-restore cart on refresh
Synced React state ↔ localStorage

Outcome
Fully functional, persistent shopping cart
Smooth and intuitive UX

✅ Day 5 — Payments & Order Management
Focus: Secure payment flow and backend verification

💳 Razorpay Integration
Razorpay Checkout popup
Backend order creation (/api/razorpay)
Secure HMAC SHA256 signature verification
Proper Razorpay test mode handling
Payment → verification → order save → success flow

📦 Order Management
Designed Order schema

Stored:
Razorpay Order ID
Razorpay Payment ID
Signature
Amount
Normalized product data
Payment & order status
Orders saved correctly in MongoDB Atlas

🛠 Admin Orders Dashboard
Route: /admin/orders
View all orders
Inspect order details, payment status, products, and timestamps
Sorted by newest first

Outcome
Secure, production-ready payment architecture
Full admin visibility of orders

✅ Day 6 — User Authentication & Role Handling
Focus: User system & protected flows

Implemented
User model with roles (user / admin)
Login and Signup pages
Authentication using HTTP-only cookies
Navbar updates dynamically (Login / Logout)
Protected checkout for logged-in users only
User-specific order association

Outcome
Functional authentication flow
Secure session handling
Clear separation of admin and user responsibilities

✅ Day 7 — Deployment, Data Migration & Production Fixes
Focus: Real-world deployment and debugging

Implemented
Deployed Kapadia K Mart on Vercel
Configured environment variables on Vercel
Re-seeded products in production database

Fixed:
Missing data in production
Cookie handling differences (local vs prod)
Infinite render loops
API JSON parsing edge cases
Verified payment + order flow in production

Outcome
Fully working production deployment
Live e-commerce store
Real-world debugging experience gained

🏁 Current Project Status
Fully deployed Kapadia K Mart
Product catalog, cart, checkout, and orders working
Secure Razorpay payments
Admin dashboard for products and orders
Clean, scalable Next.js App Router architecture

🎯 Key Takeaways
Strong full-stack development skills
Secure payment verification practices
Real-world MongoDB data modeling
Debugging production-level issues
Deployment-ready engineering mindset

🔮 Future Enhancements
Order status updates (shipped / delivered)
Email notifications
Razorpay webhooks
Performance optimization
UI/UX polish