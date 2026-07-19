# Fareshare — B2B Food Ordering Web App

A single React app with two role-based experiences (Master / User), dummy auth, and all data persisted to `localStorage`. No backend, no APIs.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
```

## Demo logins

| Role   | Email             | Password |
|--------|-------------------|----------|
| Master | master@test.com   | 123456   |
| User   | user@test.com     | 123456   |

## Stack

React 18 · Vite · React Router v6 · Tailwind CSS v4 · Framer Motion · react-hot-toast · lucide-react

## Structure

```
src/
  context/    AuthContext, ThemeContext, DataContext (products+orders), CartContext
  components/ shared UI: layouts, ProductCard, ReceiptBreakdown, Modal, Pagination…
  pages/
    master/   Dashboard, Products, Orders
    user/     Home, ProductDetails, Cart, Checkout, OrderHistory
  utils/      storage.js (localStorage wrapper), pricing.js (GST math)
  data/seed.js  dummy users + starter product catalog
```

Reload the page any time — your session, cart, products, and orders all persist via `localStorage`.
