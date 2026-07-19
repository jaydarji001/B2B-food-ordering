// Small set of shared primitives kept in one file on purpose —
// they're used everywhere and have no internal state of their own.

export function Input({ label, error, className = "", ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">{label}</span>
      )}
      <input
        {...props}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition
          bg-white dark:bg-ink-900 text-ink-900 dark:text-ink-50
          border-ink-100 dark:border-ink-800
          focus:border-herb-500 focus:ring-2 focus:ring-herb-500/20
          ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""} ${className}`}
      />
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

export function Textarea({ label, error, className = "", ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">{label}</span>
      )}
      <textarea
        {...props}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition
          bg-white dark:bg-ink-900 text-ink-900 dark:text-ink-50
          border-ink-100 dark:border-ink-800
          focus:border-herb-500 focus:ring-2 focus:ring-herb-500/20 ${className}`}
      />
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

export function Button({ variant = "primary", size = "md", className = "", ...props }) {
  const variants = {
    primary: "bg-herb-600 text-white hover:bg-herb-700 active:bg-herb-700",
    secondary: "bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-50 hover:brightness-95",
    ghost: "bg-transparent text-ink-700 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800",
    danger: "bg-transparent text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold
        transition disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
    />
  );
}
