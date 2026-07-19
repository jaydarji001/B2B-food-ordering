import { Package, ClipboardList, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import { formatCurrency } from "../../utils/pricing";

export default function MasterDashboard() {
  const { products, orders } = useData();
  const recent = orders.slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500">Overview of your catalog and incoming orders.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total products" value={products.length} icon={Package} accent="herb" />
        <StatCard label="Total orders" value={orders.length} icon={ClipboardList} accent="sky" />
        <StatCard
          label="Revenue (all orders)"
          value={formatCurrency(orders.reduce((s, o) => s + o.grandTotal, 0))}
          icon={TrendingUp}
          accent="amber"
        />
      </div>

      <div className="card-surface mt-6 rounded-xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">Recent orders</h2>
          <Link to="/master/orders" className="text-sm font-medium text-herb-600 hover:underline">
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink-500">No orders placed yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-500 dark:border-ink-800">
                  <th className="py-2 pr-4 font-medium">Order</th>
                  <th className="py-2 pr-4 font-medium">Customer</th>
                  <th className="py-2 pr-4 font-medium">Amount</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-b border-ink-100 last:border-0 dark:border-ink-800">
                    <td className="py-3 pr-4 font-mono text-xs text-ink-700 dark:text-ink-300">{o.id}</td>
                    <td className="py-3 pr-4 text-ink-900 dark:text-ink-50">{o.customerName}</td>
                    <td className="py-3 pr-4 font-mono">{formatCurrency(o.grandTotal)}</td>
                    <td className="py-3 pr-4"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
