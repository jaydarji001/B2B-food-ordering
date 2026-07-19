import { useState } from "react";
import toast from "react-hot-toast";
import { useData } from "../../context/DataContext";
import StatusBadge from "../../components/StatusBadge";
import { formatCurrency } from "../../utils/pricing";

const STATUSES = ["Pending", "Processing", "Delivered"];

export default function Orders() {
  const { orders, updateOrderStatus } = useData();
  const [expanded, setExpanded] = useState(null);

  function handleStatusChange(id, status) {
    updateOrderStatus(id, status);
    toast.success(`Order marked ${status}`);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Orders</h1>
        <p className="mt-1 text-sm text-ink-500">All orders placed by food shops.</p>
      </div>

      {orders.length === 0 ? (
        <div className="card-surface rounded-xl py-14 text-center text-sm text-ink-500">No orders yet.</div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="card-surface rounded-xl p-4">
              <button
                onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                className="flex w-full flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-mono text-xs text-ink-500">{o.id}</div>
                  <div className="font-medium text-ink-900 dark:text-ink-50">{o.customerName}</div>
                  <div className="text-xs text-ink-500">{new Date(o.date).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono font-semibold text-ink-900 dark:text-ink-50">{formatCurrency(o.grandTotal)}</span>
                  <StatusBadge status={o.status} />
                </div>
              </button>

              {expanded === o.id && (
                <div className="mt-4 border-t border-ink-100 pt-4 dark:border-ink-800">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase tracking-wide text-ink-500">
                        <th className="pb-2 font-medium">Product</th>
                        <th className="pb-2 font-medium">Qty</th>
                        <th className="pb-2 font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {o.items.map((it) => (
                        <tr key={it.productId}>
                          <td className="py-1 text-ink-900 dark:text-ink-50">{it.name}</td>
                          <td className="py-1 font-mono">{it.qty}</td>
                          <td className="py-1 font-mono">{formatCurrency(it.price * it.qty)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-ink-500">Update status:</span>
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(o.id, s)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                          o.status === s
                            ? "bg-herb-600 text-white"
                            : "bg-ink-100 text-ink-700 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
