import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { loadJSON, saveJSON } from "../utils/storage";
import { SEED_PRODUCTS } from "../data/seed";

const DataContext = createContext(null);

function makeId(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function DataProvider({ children }) {
  const [products, setProducts] = useState(() => loadJSON("products", SEED_PRODUCTS));
  const [orders, setOrders] = useState(() => loadJSON("orders", []));

  useEffect(() => saveJSON("products", products), [products]);
  useEffect(() => saveJSON("orders", orders), [orders]);

  const addProduct = useCallback((product) => {
    setProducts((prev) => [{ ...product, id: makeId("p") }, ...prev]);
  }, []);

  const updateProduct = useCallback((id, patch) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const placeOrder = useCallback((order) => {
    const newOrder = {
      ...order,
      id: makeId("ORD").toUpperCase(),
      status: "Pending",
      date: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  return (
    <DataContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, orders, placeOrder, updateOrderStatus }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
