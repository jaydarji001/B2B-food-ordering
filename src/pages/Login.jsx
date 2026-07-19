
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Store, Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Input, Button } from "../components/ui";


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin"); 

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function switchMode(next) {
    setMode(next);
    setErrors({});
    setForm({ name: "", email: "", password: "", confirm: "" });
  }

  function validate() {
    const next = {};
    if (mode === "signup" && !form.name.trim()) next.name = "Business name is required.";
    if (!form.email) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.password) next.password = "Password is required.";
    else if (mode === "signup" && form.password.length < 6)
      next.password = "Use at least 6 characters.";
    if (mode === "signup" && form.confirm !== form.password)
      next.confirm = "Passwords don't match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      const result =
        mode === "signin"
          ? login({ email: form.email, password: form.password })
          : register({ name: form.name, email: form.email, password: form.password });
      setSubmitting(false);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(
        mode === "signin" ? `Welcome back, ${result.session.name}` : `Account created — welcome, ${result.session.name}`
      );
      navigate(result.session.role === "master" ? "/master" : "/app", { replace: true });
    }, 450); 
  }

  function fillDemo(role) {
    setMode("signin");
    setForm((f) => ({
      ...f,
      ...(role === "master"
        ? { email: "master@test.com", password: "123456" }
        : { email: "user@test.com", password: "123456" }),
    }));
    setErrors({});
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4 dark:bg-ink-950">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="card-surface w-full max-w-sm rounded-2xl p-8"
      >
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-herb-600 text-white">
            <Store size={22} />
          </div>
          <h1 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-50">
            {mode === "signin" ? "Sign in to Fareshare" : "Create your Fareshare account"}
          </h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
            {mode === "signin" ? "Wholesale ordering for your kitchen" : "Set up a shop account in seconds"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            {mode === "signup" && (
              <Input
                label="Business name"
                type="text"
                placeholder="Green Leaf Kitchen"
                value={form.name}
                error={errors.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            )}
            <Input
              label="Email"
              type="email"
              placeholder="you@business.com"
              value={form.email}
              error={errors.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••"
              value={form.password}
              error={errors.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
            {mode === "signup" && (
              <Input
                label="Confirm password"
                type="password"
                placeholder="••••••"
                value={form.confirm}
                error={errors.confirm}
                onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
              />
            )}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? mode === "signin"
                  ? "Signing in…"
                  : "Creating account…"
                : mode === "signin"
                ? "Sign in"
                : "Create account"}
            </Button>
          </motion.form>
        </AnimatePresence>

        <p className="mt-5 text-center text-sm text-ink-500 dark:text-ink-300">
          {mode === "signin" ? (
            <>
              New to Fareshare?{" "}
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className="font-medium text-herb-600 hover:underline"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("signin")}
                className="font-medium text-herb-600 hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>

        {mode === "signin" && (
          <div className="mt-6 rounded-lg bg-ink-50 p-3.5 text-xs text-ink-500 dark:bg-ink-800/60 dark:text-ink-300">
            <div className="mb-2 font-medium text-ink-700 dark:text-ink-300">Demo credentials</div>
            <div className="flex flex-col gap-1.5">
              <button type="button" onClick={() => fillDemo("master")} className="flex items-center gap-1.5 text-left hover:text-herb-600">
                <Mail size={12} /> master@test.com — Master Console
              </button>
              <button type="button" onClick={() => fillDemo("user")} className="flex items-center gap-1.5 text-left hover:text-herb-600">
                <Lock size={12} /> user@test.com — Food Shop
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
