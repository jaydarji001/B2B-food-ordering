import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { loadJSON, saveJSON } from "../utils/storage";
import { finalPrice, gstAmount } from "../utils/pricing";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadJSON("cart", []));

  useEffect(() => saveJSON("cart", items), [items]);

  const addToCart = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, image: product.image, qty }];
    });
  }, []);

  const updateQty = useCallback((productId, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, qty } : i))
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totals = useMemo(() => {
    const subTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const gstTotal = items.reduce((sum, i) => sum + gstAmount(i.price) * i.qty, 0);
    const grandTotal = items.reduce((sum, i) => sum + finalPrice(i.price) * i.qty, 0);
    const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
    return { subTotal, gstTotal, grandTotal, itemCount };
  }, [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQty, removeFromCart, clearCart, totals }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
