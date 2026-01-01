import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Button } from "../../components/Button";
import { useAuth } from "./AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = useMemo(() => {
    const state = location.state as { from?: string } | null;
    return state?.from ?? "/";
  }, [location.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/50"
    >
      <div className="text-2xl font-bold tracking-tight">Login</div>
      <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Sign in to view your tasks.
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </div>
      ) : null}

      <form
        className="mt-6 grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setSubmitting(true);
          try {
            await login(email, password);
            navigate(from, { replace: true, state: { refresh: true } });
          } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <label className="grid gap-2">
          <span className="text-sm font-medium">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="h-11 rounded-xl border border-slate-200 bg-white/70 px-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/30"
            placeholder="you@example.com"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="h-11 rounded-xl border border-slate-200 bg-white/70 px-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/30"
            placeholder="••••••••"
          />
        </label>

        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? "Signing in..." : "Login"}
        </Button>
      </form>

      <div className="mt-5 text-sm text-slate-600 dark:text-slate-300">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-semibold text-indigo-600 dark:text-indigo-400">
          Sign up
        </Link>
      </div>
    </motion.div>
  );
}
