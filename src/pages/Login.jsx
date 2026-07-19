import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Store, Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Input, Button } from "../components/ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next = {};
    if (!form.email) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      const result = login(form);
      setSubmitting(false);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(`Welcome back, ${result.session.name}`);
      navigate(result.session.role === "master" ? "/master" : "/app", { replace: true });
    }, 450); // small delay so the loading state actually reads as real auth
  }

  function fillDemo(role) {
    setForm(
      role === "master"
        ? { email: "master@test.com", password: "123456" }
        : { email: "user@test.com", password: "123456" }
    );
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
          <h1 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-50">Sign in to Fareshare</h1>
          <p className="mt-1 text-sm text-ink-500">Wholesale ordering for your kitchen</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 rounded-lg bg-ink-50 p-3.5 text-xs text-ink-500 dark:bg-ink-800/60">
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
      </motion.div>
    </div>
  );
}
