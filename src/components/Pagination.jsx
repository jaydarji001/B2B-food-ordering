import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-6 flex items-center justify-center gap-1.5">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-700 disabled:opacity-40 dark:border-ink-800 dark:text-ink-300"
      >
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`h-8 w-8 rounded-lg text-sm font-medium transition ${
            n === page
              ? "bg-herb-600 text-white"
              : "text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
          }`}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-700 disabled:opacity-40 dark:border-ink-800 dark:text-ink-300"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
