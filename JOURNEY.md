# 🚀 E-commerce Store Project Journey

## ✅ Day 1 – Project Setup & Routing
- Initialized Next.js project using App Router
- Configured Tailwind CSS
- Set up global layout and Navbar
- Practiced routing with multiple pages
- Verified responsive layout for mobile and desktop

---

## ✅ Day 2 – Backend & Database Setup
- Created MongoDB Atlas cluster
- Connected MongoDB with Mongoose
- Designed Product schema/model
- Implemented `/api/products` API route
- Verified database connection and API responses
- Debugged connection, environment variables, and network access issues

---

## ✅ Day 3 – Product Listing & Product Details
**Focus:** Frontend ↔ Backend Integration

### Implemented:
- Fetched product data from `/api/products`
- Rendered products on Home page
- Implemented dynamic routing with `/product/[id]`
- Created `/api/products/[id]` endpoint
- Validated MongoDB ObjectId
- Implemented clean error and 404 handling
- Built Product Details page UI
- Ensured mobile and desktop responsiveness

### Debugging & Learning:
- Handled Next.js App Router dynamic params
- Fixed API vs page routing issues
- Resolved export/import mismatches
- Understood Next.js 16 params behavior
- Learned to ignore non-blocking Turbopack source-map warnings

### Result:
✅ Product listing working  
✅ Product detail page working  
✅ Backend API stable  
✅ Clean routing and error handling  

✅ Day 4 – Cart System (Full Shopping Cart Functionality)

Focus: Client-side state management + real e-commerce behavior

Implemented:

Created a CartContext using React Context API

Wrapped entire app inside <CartProvider> for global state

Added Add to Cart button on product details page

Displayed total items in cart inside Navbar (Cart (3))

Cart Features Built:

Add product to cart

Merge duplicate items

Quantity system (qty + / qty –)

Remove item from cart

Cart total amount calculation

Clear cart on checkout

UI Improvements:

Built clean and responsive Cart page

Added + / – buttons with real-time updates

Showed individual item prices and quantities

Displayed total cost at bottom

Storage:

Enabled localStorage persistence, so cart stays after refresh

Synced cart state → localStorage automatically

Debugging & Fixes:

Solved "duplicate key" React warning

Converted cart mapping to use index OR unique cartId

Fixed ProductDetails routing and props

Ensured client vs server components are split properly

Removed crashes happening when product was undefined

Result:

✅ Full cart system ready
✅ Quantity management like Amazon/Flipkart
✅ Persistent cart
✅ Product → Cart → Checkout flow established
✅ End of Day 4 perfectly completed