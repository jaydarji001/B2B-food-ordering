import { formatCurrency, gstAmount, finalPrice } from "../utils/pricing";

// The recurring "receipt stub" treatment: every place a price is broken into
// base + GST + total, it's rendered like a printed invoice line, in mono type.
export default function ReceiptBreakdown({ price, qty = 1, compact = false }) {
  const base = price * qty;
  const gst = gstAmount(price) * qty;
  const total = finalPrice(price) * qty;

  return (
    <div className={`font-mono ${compact ? "text-xs" : "text-sm"} text-ink-700 dark:text-ink-300`}>
      <div className="flex justify-between py-0.5">
        <span>Base{qty > 1 ? ` × ${qty}` : ""}</span>
        <span>{formatCurrency(base)}</span>
      </div>
      <div className="flex justify-between py-0.5">
        <span>GST (5%)</span>
        <span>{formatCurrency(gst)}</span>
      </div>
      <div className="receipt-rule my-1.5 text-ink-500" />
      <div className="flex justify-between py-0.5 font-semibold text-ink-900 dark:text-ink-50">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
