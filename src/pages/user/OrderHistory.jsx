import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import StatusBadge from "../../components/StatusBadge";
import { formatCurrency } from "../../utils/pricing";

export default function OrderHistory() {
  const { orders } = useData();
  const { user } = useAuth();
  const mine = orders.filter((o) => o.customerEmail === user.email);

  if (mine.length === 0) {
    return (
      <div className="card-surface flex flex-col items-center rounded-xl py-16 text-center">
        <ClipboardList size={28} className="mb-3 text-ink-300" />
        <p className="text-sm text-ink-500">You haven't placed any orders yet.</p>
        <Link to="/app" className="mt-3 text-sm font-medium text-herb-600 hover:underline">Browse the catalog</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Order history</h1>
      <div className="space-y-3">
        {mine.map((o) => (
          <div key={o.id} className="card-surface rounded-xl p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-mono text-xs text-ink-500">{o.id}</div>
                <div className="text-xs text-ink-500">{new Date(o.date).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono font-semibold text-ink-900 dark:text-ink-50">{formatCurrency(o.grandTotal)}</span>
                <StatusBadge status={o.status} />
              </div>
            </div>
            <div className="mt-3 border-t border-ink-100 pt-3 text-sm text-ink-700 dark:border-ink-800 dark:text-ink-300">
              {o.items.map((it) => it.name + " × " + it.qty).join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
