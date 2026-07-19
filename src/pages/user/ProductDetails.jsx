import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Minus, Plus, ChevronLeft } from "lucide-react";
import { useData } from "../../context/DataContext";
import { useCart } from "../../context/CartContext";
import ReceiptBreakdown from "../../components/ReceiptBreakdown";
import { Button } from "../../components/ui";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useData();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="card-surface rounded-xl py-16 text-center">
        <p className="text-sm text-ink-500">Product not found.</p>
        <Link to="/app" className="mt-3 inline-block text-sm font-medium text-herb-600 hover:underline">Back to catalog</Link>
      </div>
    );
  }

  function handleAdd() {
    addToCart(product, qty);
    toast.success(`Added ${qty} × ${product.name} to cart`);
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900 dark:hover:text-ink-50">
        <ChevronLeft size={16} /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100 dark:bg-ink-800">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">{product.name}</h1>
          {product.description && (
            <p className="mt-3 text-sm leading-relaxed text-ink-700 dark:text-ink-300">{product.description}</p>
          )}

          <div className="card-surface mt-6 rounded-xl p-4">
            <ReceiptBreakdown price={product.price} qty={qty} />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-medium text-ink-700 dark:text-ink-300">Quantity</span>
            <div className="flex items-center rounded-lg border border-ink-100 dark:border-ink-800">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-9 w-9 items-center justify-center text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800">
                <Minus size={15} />
              </button>
              <span className="w-10 text-center text-sm font-semibold text-ink-900 dark:text-ink-50">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="flex h-9 w-9 items-center justify-center text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800">
                <Plus size={15} />
              </button>
            </div>
          </div>

          <Button onClick={handleAdd} size="lg" className="mt-6 w-full sm:w-auto">Add to cart</Button>
        </div>
      </motion.div>
    </div>
  );
}
