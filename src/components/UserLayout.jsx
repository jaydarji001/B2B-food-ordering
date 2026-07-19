import { NavLink, Outlet } from "react-router-dom";
import { ShoppingCart, ClipboardList, LogOut, Moon, Sun, Store } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

export default function UserLayout() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const { totals } = useCart();

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/90 backdrop-blur dark:border-ink-800 dark:bg-ink-900/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <NavLink to="/app" className="flex items-center gap-2">
            <Store size={20} className="text-herb-600" />
            <span className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">Fareshare</span>
          </NavLink>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <NavLink
              to="/app/orders"
              className={({ isActive }) =>
                `flex h-9 w-9 items-center justify-center rounded-lg ${isActive ? "bg-herb-100 text-herb-700 dark:bg-herb-700/20 dark:text-herb-500" : "text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800"}`
              }
              aria-label="Order history"
            >
              <ClipboardList size={18} />
            </NavLink>
            <NavLink
              to="/app/cart"
              className={({ isActive }) =>
                `relative flex h-9 w-9 items-center justify-center rounded-lg ${isActive ? "bg-herb-100 text-herb-700 dark:bg-herb-700/20 dark:text-herb-500" : "text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800"}`
              }
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              {totals.itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-amber-warm px-1 text-[10px] font-bold text-white">
                  {totals.itemCount}
                </span>
              )}
            </NavLink>
            <div className="mx-1.5 hidden h-6 w-px bg-ink-100 dark:bg-ink-800 sm:block" />
            <div className="hidden text-right sm:block">
              <div className="text-xs font-medium text-ink-900 dark:text-ink-50">{user?.name}</div>
              <div className="text-[11px] text-ink-500">Food shop</div>
            </div>
            <button
              onClick={logout}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800"
              aria-label="Log out"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-6">
        <Outlet />
      </main>
    </div>
  );
}
