import { useMemo, useState, useEffect } from "react";
import { useData } from "../../context/DataContext";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { ProductCardSkeleton } from "../../components/Skeleton";

const PAGE_SIZE = 8;

export default function Home() {
  const { products } = useData();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [products, query]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Catalog</h1>
        <p className="mt-1 text-sm text-ink-500">Browse wholesale stock and add to your order.</p>
      </div>

      <div className="mb-6 max-w-md">
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : pageItems.length === 0 ? (
        <div className="card-surface rounded-xl py-16 text-center text-sm text-ink-500">No products match "{query}".</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {pageItems.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
