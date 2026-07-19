import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, ClipboardList, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const NAV = [
  { to: "/master", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/master/products", label: "Products", icon: Package },
  { to: "/master/orders", label: "Orders", icon: ClipboardList },
];

export default function MasterLayout() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();

  return (
    <div className="flex min-h-screen bg-ink-50 dark:bg-ink-950">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-ink-100 bg-white px-4 py-6 dark:border-ink-800 dark:bg-ink-900 md:flex">
        <div className="mb-8 px-2">
          <div className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">Fareshare</div>
          <div className="text-xs text-ink-500">Master Console</div>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-herb-600 text-white"
                    : "text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-ink-100 pt-4 dark:border-ink-800">
          <div className="mb-3 px-1 text-xs text-ink-500">Signed in as</div>
          <div className="mb-4 px-1 text-sm font-medium text-ink-900 dark:text-ink-50">{user?.name}</div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
          >
            <LogOut size={18} /> Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-ink-100 bg-white px-5 py-3.5 dark:border-ink-800 dark:bg-ink-900 md:hidden">
          <div className="font-display text-base font-semibold text-ink-900 dark:text-ink-50">Fareshare</div>
          <button onClick={logout} className="text-ink-500"><LogOut size={18} /></button>
        </header>
        <div className="hidden justify-end border-b border-ink-100 bg-white px-6 py-3 dark:border-ink-800 dark:bg-ink-900 md:flex">
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
        <main className="flex-1 p-5 md:p-8">
          <Outlet />
        </main>
        <nav className="flex justify-around border-t border-ink-100 bg-white py-2 dark:border-ink-800 dark:bg-ink-900 md:hidden">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 text-[11px] font-medium ${
                  isActive ? "text-herb-600" : "text-ink-500"
                }`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
