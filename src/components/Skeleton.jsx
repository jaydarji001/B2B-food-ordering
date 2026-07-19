export function ProductCardSkeleton() {
  return (
    <div className="card-surface overflow-hidden rounded-xl">
      <div className="aspect-[4/3] animate-pulse bg-ink-100 dark:bg-ink-800" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-ink-100 dark:bg-ink-800" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-ink-100 dark:bg-ink-800" />
        <div className="h-5 w-1/3 animate-pulse rounded bg-ink-100 dark:bg-ink-800" />
      </div>
    </div>
  );
}

export function RowSkeleton() {
  return <div className="h-14 w-full animate-pulse rounded-lg bg-ink-100 dark:bg-ink-800" />;
}
