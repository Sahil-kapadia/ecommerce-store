🚀 E-commerce Store Project Journey
✅ Day 1 – Project Setup & Routing

Initialized Next.js (App Router) project

Configured Tailwind CSS

Set up global layout and Navbar

Practiced static & dynamic routing

Ensured full responsive layout (mobile + desktop)

✅ Day 2 – Backend & Database Setup

Created MongoDB Atlas cluster

Connected MongoDB using Mongoose

Designed Product schema/model

Implemented /api/products API

Verified database connection & API response

Debugged:

ENV variable errors

Network access whitelist

Import/export mismatches

✅ Day 3 – Product Listing & Product Details
Focus: Frontend ↔ Backend Integration
✔ Implemented:

Fetched product data from /api/products

Rendered product grid on Home page

Implemented dynamic routing /product/[id]

Built /api/products/[id] endpoint

Added MongoDB ObjectId validation

Implemented 404 & error handling

Built Product Details page UI

Ensured full responsiveness

✔ Debugging & Learning:

Fixed API vs Page Route conflicts

Understood Next.js 16 params behavior

Debugged exports/imports

Learned to ignore non-blocking source-map warnings

✔ Result:

✅ Product list works

✅ Product details work

✅ Backend stable

✅ Routing clean & error-free

✅ Day 4 – Cart System (Full Shopping Cart Functionality)
Focus: Client-Side State + Real E-Commerce Behavior
✔ Implemented:

Created CartContext using React Context API

Wrapped app in <CartProvider> for global state

Added “Add to Cart” button on product detail page

Displayed Cart Count in Navbar (e.g., Cart (3))

🛒 Cart Features Built

Add product to cart

Merge duplicate items

Quantity management (+ / – buttons)

Remove item

Auto-calculate subtotal & total

Clear cart on checkout

🎨 UI Improvements

Clean, simple Cart page UI

Real-time updates when increasing/decreasing qty

Shows:

Product Name

Individual Price

Quantity

Total per item

Grand Total

💾 Storage

Cart stored in localStorage

Cart auto-loads on page refresh

Synced state ↔ localStorage

🔧 Debugging & Fixes

Fixed duplicate key React warning

Switched to index or generated cartId

Resolved ProductDetails routing issue

Prevented crashes when product was undefined

Correct split between client and server components