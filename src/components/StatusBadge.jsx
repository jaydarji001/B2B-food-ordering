const STYLES = {
  Pending: "bg-amber-soft text-amber-warm",
  Processing: "bg-sky-soft text-sky-info",
  Delivered: "bg-herb-100 text-herb-700 dark:bg-herb-700/20 dark:text-herb-500",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[status] || STYLES.Pending}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
