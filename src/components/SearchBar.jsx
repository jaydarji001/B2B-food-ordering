import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search products…" }) {
  return (
    <div className="relative">
      <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-ink-100 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition
          focus:border-herb-500 focus:ring-2 focus:ring-herb-500/20
          dark:border-ink-800 dark:bg-ink-900 dark:text-ink-50"
      />
    </div>
  );
}
