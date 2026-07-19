import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatCurrency, finalPrice } from "../../utils/pricing";
import { Button } from "../../components/ui";

export default function Cart() {
  const { items, updateQty, removeFromCart, totals } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="card-surface flex flex-col items-center rounded-xl py-16 text-center">
        <ShoppingCart size={28} className="mb-3 text-ink-300" />
        <p className="text-sm text-ink-500">Your cart is empty.</p>
        <Link to="/app" className="mt-3 text-sm font-medium text-herb-600 hover:underline">Browse the catalog</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Your cart</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card-surface flex items-center gap-4 rounded-xl p-3.5"
              >
                <img src={item.image} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-ink-900 dark:text-ink-50">{item.name}</div>
                  <div className="font-mono text-xs text-ink-500">{formatCurrency(finalPrice(item.price))} each · GST incl.</div>
                </div>
                <div className="flex items-center rounded-lg border border-ink-100 dark:border-ink-800">
                  <button onClick={() => updateQty(item.productId, item.qty - 1)} className="flex h-8 w-8 items-center justify-center text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800">
                    <Minus size={13} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-ink-900 dark:text-ink-50">{item.qty}</span>
                  <button onClick={() => updateQty(item.productId, item.qty + 1)} className="flex h-8 w-8 items-center justify-center text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800">
                    <Plus size={13} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.productId)} className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40">
                  <Trash2 size={15} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="card-surface h-fit rounded-xl p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-ink-900 dark:text-ink-50">Summary</h2>
          <div className="font-mono text-sm text-ink-700 dark:text-ink-300">
            <div className="flex justify-between py-1"><span>Subtotal</span><span>{formatCurrency(totals.subTotal)}</span></div>
            <div className="flex justify-between py-1"><span>GST (5%)</span><span>{formatCurrency(totals.gstTotal)}</span></div>
            <div className="receipt-rule my-2 text-ink-500" />
            <div className="flex justify-between py-1 text-base font-semibold text-ink-900 dark:text-ink-50">
              <span>Grand total</span><span>{formatCurrency(totals.grandTotal)}</span>
            </div>
          </div>
          <Button onClick={() => navigate("/app/checkout")} className="mt-5 w-full">Proceed to checkout</Button>
        </div>
      </div>
    </div>
  );
}
