import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useData } from "../../context/DataContext";
import { formatCurrency, finalPrice, gstAmount } from "../../utils/pricing";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { Input, Textarea, Button } from "../../components/ui";

const PAGE_SIZE = 6;
const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80";

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [errors, setErrors] = useState({});

  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [products, query]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openAdd() {
    setEditing(null);
    setForm({ name: "", price: "", description: "", image: "" });
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(p) {
    setEditing(p);
    setForm({ name: p.name, price: String(p.price), description: p.description || "", image: p.image || "" });
    setErrors({});
    setModalOpen(true);
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Product name is required.";
    if (!form.price || Number(form.price) <= 0) next.price = "Enter a valid price.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSave(e) {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      image: form.image.trim() || PLACEHOLDER_IMG,
    };
    if (editing) {
      updateProduct(editing.id, payload);
      toast.success("Product updated");
    } else {
      addProduct(payload);
      toast.success("Product added");
    }
    setModalOpen(false);
  }

  function handleDelete() {
    deleteProduct(confirmDelete.id);
    toast.success("Product deleted");
    setConfirmDelete(null);
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Products</h1>
          <p className="mt-1 text-sm text-ink-500">Manage your wholesale catalog.</p>
        </div>
        <Button onClick={openAdd}><Plus size={16} /> Add product</Button>
      </div>

      <div className="mb-5 max-w-sm">
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} />
      </div>

      <div className="card-surface overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-500 dark:border-ink-800">
                <th className="py-3 pl-5 pr-3 font-medium">Product</th>
                <th className="py-3 px-3 font-medium">Price</th>
                <th className="py-3 px-3 font-medium">GST (5%)</th>
                <th className="py-3 px-3 font-medium">Final price</th>
                <th className="py-3 pl-3 pr-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((p) => (
                <tr key={p.id} className="border-b border-ink-100 last:border-0 dark:border-ink-800">
                  <td className="py-3 pl-5 pr-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      <span className="font-medium text-ink-900 dark:text-ink-50">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono">{formatCurrency(p.price)}</td>
                  <td className="py-3 px-3 font-mono text-ink-500">{formatCurrency(gstAmount(p.price))}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-herb-600">{formatCurrency(finalPrice(p.price))}</td>
                  <td className="py-3 pl-3 pr-5">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => setConfirmDelete(p)} className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-ink-500">No products match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit product" : "Add product"}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Product name" value={form.name} error={errors.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <Input label="Product price (₹)" type="number" min="0" step="0.01" value={form.price} error={errors.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
          <Input label="Image URL (optional)" placeholder="https://…" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
          <Textarea label="Description (optional)" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <div className="rounded-lg bg-ink-50 px-3 py-2.5 text-xs text-ink-500 dark:bg-ink-800/60">
            GST is fixed at 5% and calculated automatically for every product.
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? "Save changes" : "Add product"}</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete product">
        <p className="text-sm text-ink-700 dark:text-ink-300">
          Delete <span className="font-semibold">{confirmDelete?.name}</span>? This cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" className="bg-red-500 text-white hover:bg-red-600" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
