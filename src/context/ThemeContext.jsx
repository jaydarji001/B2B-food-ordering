import { createContext, useContext, useEffect, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => loadJSON("theme-dark", false));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    saveJSON("theme-dark", dark);
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
