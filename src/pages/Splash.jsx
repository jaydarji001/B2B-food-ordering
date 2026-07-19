import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Store } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Splash() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      if (user) navigate(user.role === "master" ? "/master" : "/app", { replace: true });
      else navigate("/login", { replace: true });
    }, 1100);
    return () => clearTimeout(t);
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-50 dark:bg-ink-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-herb-600 text-white shadow-lg shadow-herb-600/20">
          <Store size={30} />
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Fareshare</h1>
        <p className="mt-1 text-sm text-ink-500">Wholesale food ordering, simplified</p>
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="mt-8 h-0.5 overflow-hidden rounded-full bg-herb-600/30"
      >
        <motion.div
          animate={{ x: [-120, 120] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-1/2 bg-herb-600"
        />
      </motion.div>
    </div>
  );
}
