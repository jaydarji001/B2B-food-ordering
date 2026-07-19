import { createContext, useContext, useState, useCallback } from "react";
import { loadJSON, saveJSON, removeKey } from "../utils/storage";
import { DUMMY_USERS } from "../data/seed";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadJSON("session", null));

  const login = useCallback(({ email, password }) => {
    const match = DUMMY_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) return { ok: false, error: "Invalid email or password." };
    const session = { email: match.email, role: match.role, name: match.name };
    saveJSON("session", session);
    setUser(session);
    return { ok: true, session };
  }, []);

  const logout = useCallback(() => {
    removeKey("session");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
