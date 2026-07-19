import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { formatCurrency, finalPrice } from "../../utils/pricing";
import { Button } from "../../components/ui";

export default function Checkout() {
  const { items, totals, clearCart } = useCart();
  const { placeOrder } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) return <Navigate to="/app/cart" replace />;

  function handlePlaceOrder() {
    setPlacing(true);
    setTimeout(() => {
      placeOrder({
        customerName: user.name,
        customerEmail: user.email,
        items,
        subTotal: totals.subTotal,
        gstTotal: totals.gstTotal,
        grandTotal: totals.grandTotal,
      });
      clearCart();
      setPlacing(false);
      toast.success("Order placed successfully");
      navigate("/app/orders");
    }, 500);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Checkout</h1>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-surface rounded-xl p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-500">Order summary</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between text-sm">
              <div className="text-ink-900 dark:text-ink-50">{item.name} <span className="text-ink-500">× {item.qty}</span></div>
              <div className="font-mono text-ink-700 dark:text-ink-300">{formatCurrency(finalPrice(item.price) * item.qty)}</div>
            </div>
          ))}
        </div>

        <div className="receipt-rule my-4 text-ink-500" />

        <div className="font-mono text-sm text-ink-700 dark:text-ink-300">
          <div className="flex justify-between py-1"><span>Subtotal</span><span>{formatCurrency(totals.subTotal)}</span></div>
          <div className="flex justify-between py-1"><span>GST (5%)</span><span>{formatCurrency(totals.gstTotal)}</span></div>
          <div className="flex justify-between py-1.5 text-base font-semibold text-ink-900 dark:text-ink-50">
            <span>Total amount</span><span>{formatCurrency(totals.grandTotal)}</span>
          </div>
        </div>

        <Button onClick={handlePlaceOrder} disabled={placing} className="mt-5 w-full">
          {placing ? "Placing order…" : "Place order"}
        </Button>
      </motion.div>
    </div>
  );
}
