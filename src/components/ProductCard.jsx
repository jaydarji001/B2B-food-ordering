import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatCurrency, finalPrice } from "../utils/pricing";

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
    >
      <Link
        to={`/app/product/${product.id}`}
        className="card-surface group block overflow-hidden rounded-xl transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink-900/5"
      >
        <div className="aspect-[4/3] overflow-hidden bg-ink-100 dark:bg-ink-800">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-display text-base font-medium leading-snug text-ink-900 dark:text-ink-50">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-xs text-ink-500">
              {formatCurrency(product.price)} + 5% GST
            </span>
          </div>
          <div className="mt-1 font-mono text-lg font-semibold text-herb-600 dark:text-herb-500">
            {formatCurrency(finalPrice(product.price))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
