import { motion } from "framer-motion";

export default function StatCard({ label, value, icon: Icon, accent = "herb" }) {
  const accents = {
    herb: "bg-herb-100 text-herb-700 dark:bg-herb-700/20 dark:text-herb-500",
    amber: "bg-amber-soft text-amber-warm",
    sky: "bg-sky-soft text-sky-info",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="card-surface flex items-center gap-4 rounded-xl p-5"
    >
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${accents[accent]}`}>
        {Icon && <Icon size={20} strokeWidth={2} />}
      </div>
      <div>
        <div className="text-xs font-medium uppercase tracking-wide text-ink-500">{label}</div>
        <div className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">{value}</div>
      </div>
    </motion.div>
  );
}
