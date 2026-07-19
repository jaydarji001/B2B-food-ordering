import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import MasterLayout from "./components/MasterLayout";
import MasterDashboard from "./pages/master/MasterDashboard";
import Products from "./pages/master/Products";
import Orders from "./pages/master/Orders";
import UserLayout from "./components/UserLayout";
import Home from "./pages/user/Home";
import ProductDetails from "./pages/user/ProductDetails";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import OrderHistory from "./pages/user/OrderHistory";

function LoginGate() {
  const { user } = useAuth();
  if (user) return <Navigate to={user.role === "master" ? "/master" : "/app"} replace />;
  return <Login />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <CartProvider>
            <BrowserRouter>
              <Toaster position="top-right" toastOptions={{ duration: 2600 }} />
              <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/login" element={<LoginGate />} />

                <Route
                  path="/master"
                  element={
                    <ProtectedRoute role="master">
                      <MasterLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<MasterDashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="orders" element={<Orders />} />
                </Route>

                <Route
                  path="/app"
                  element={
                    <ProtectedRoute role="user">
                      <UserLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="product/:id" element={<ProductDetails />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="orders" element={<OrderHistory />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
