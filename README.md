🛒 Kapadia K-Mart — Full-Stack E-commerce Store
A production-style full-stack e-commerce application built using Next.js (App Router) with secure payments, admin management, and cloud-based media handling.
🚀 Built as part of a major web development project & internship submission.

🌐 Live Demo
Frontend (Vercel): 👉 [https://ecommerce-store-git-main-sahil-kapadias-projects-97f28cc9.vercel.app](https://ecommerce-store-git-main-sahil-kapadias-projects-97f28cc9.vercel.app)
Admin Panel: 👉 /admin/login

🧱 **Tech Stack Frontend**
Next.js 14 (App Router)
React
Tailwind **CSS**
Context **API** (global cart state)
Backend
Next.js **API** Routes
MongoDB Atlas
Mongoose **ODM**

**Payments & Media**
Razorpay (Test Mode)
Cloudinary (Image Uploads)

**Deployment**
Vercel
Environment-based configuration

✨ Core Features 🛍️ User Features
Product listing & details page
Shopping cart (add / remove / quantity control)
Cart persistence using localStorage
Secure Razorpay checkout
Order confirmation & success page
User authentication (login / signup)
My Orders page (order history)

🛠️ Admin Features
Admin authentication (protected routes)
Add / delete products
Upload product images via Cloudinary
View all orders
Order status management
Secure admin APIs

🔐 Security Practices
Razorpay signature verification (**HMAC** **SHA256**)
Orders saved only after payment verification
**HTTP**-only cookies for auth
Protected admin & user routes
Server-side validation of ObjectIds

🧾 Project Development Journey 
✅ Day 1 — Project Setup & Routing
Next.js App Router setup
Tailwind **CSS** configuration
Global layout & navbar
Responsive UI foundation

✅ Day 2 — Database & Backend Setup
MongoDB Atlas connection
Mongoose schemas (Product)
/api/products endpoint
Environment variable handling

✅ Day 3 — Products & Dynamic Pages
Product grid on home page
Dynamic routing /product/[id]
Error handling & **404** states
Safe ObjectId validation

✅ Day 4 — Cart System
Global CartContext
Add / remove / update cart items
Quantity management
Auto total calculation
Cart persistence via localStorage

✅ Day 5 — Payments & Orders (Major Milestone)
Razorpay integration
Backend order creation
Secure payment verification
Order schema & MongoDB storage
Admin order dashboard

✅ Day 6 — Authentication & User Orders
User model (MongoDB)
Login & signup flow
Auth cookies
Navbar login / logout toggle
My Orders page for users

✅ Day 7 — Deployment & Production Fixes
Deployed on Vercel
Environment variable configuration
Database migration handling
Cloudinary production uploads
Bug fixes (state loops, cookies, **API** errors)

📂 Environment Variables
Create a .env.local file:
MONGODB_URI=your_mongodb_uri CLOUDINARY_CLOUD_NAME=xxxx CLOUDINARY_API_KEY=xxxx CLOUDINARY_API_SECRET=xxxx
RAZORPAY_KEY_ID=xxxx RAZORPAY_KEY_SECRET=xxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=xxxx ADMIN_PASSWORD=xxxx

🧪 Razorpay Test Cards 
Card Number: **5267 3181 8797 5449** 
Expiry: Any future date 
**CVV**: Any 3 digits 
**OTP**: **123456**

🧠 Key Learnings
Full-stack architecture with Next.js App Router
Secure payment workflows
Real-world database modeling
Auth flows using cookies
Production deployment & debugging
Clean separation of client & server logic

🔮 Future Enhancements
Razorpay webhooks
Order cancellation & refunds
Email notifications
Admin analytics dashboard
Role-based access control

👨‍💻 Author
### Sahil Kapadia
### sahilkapadia27@gmail.com
### www.linkedin.com/in/sahilkapadia2709
### Drop A ⭐ on GitHub.

**THANK YOU**

⭐ If you like this project

Give it a ⭐ on GitHub — it helps a lot!
