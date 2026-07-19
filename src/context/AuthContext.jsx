import { createContext, useContext, useState, useCallback } from "react";
import { loadJSON, saveJSON, removeKey } from "../utils/storage";
import { DUMMY_USERS } from "../data/seed";

const AuthContext = createContext(null);

function getUsers() {
  const existing = loadJSON("users", null);
  if (existing) return existing;
  saveJSON("users", DUMMY_USERS);
  return DUMMY_USERS;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadJSON("session", null));

  const login = useCallback(({ email, password }) => {
    const users = getUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) return { ok: false, error: "Invalid email or password." };
    const session = { email: match.email, role: match.role, name: match.name };
    saveJSON("session", session);
    setUser(session);
    return { ok: true, session };
  }, []);

  const register = useCallback(({ name, email, password }) => {
    if (!name?.trim()) return { ok: false, error: "Business name is required." };
    if (!EMAIL_RE.test(email || "")) return { ok: false, error: "Enter a valid email address." };
    if (!password || password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };

    const users = getUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, error: "An account with this email already exists." };

    const newUser = { email, password, role: "user", name: name.trim() };
    const nextUsers = [...users, newUser];
    saveJSON("users", nextUsers);

    const session = { email: newUser.email, role: newUser.role, name: newUser.name };
    saveJSON("session", session);
    setUser(session);
    return { ok: true, session };
  }, []);

  const logout = useCallback(() => {
    removeKey("session");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}


  
