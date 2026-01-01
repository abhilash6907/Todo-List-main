import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, LogOut, Plus, UserPlus } from "lucide-react";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "../modules/auth/AuthContext";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/60 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/40">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -4, scale: 1.02 }}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-soft"
          >
            ✓
          </motion.div>
          <div>
            <div className="text-sm font-semibold leading-4">To-Do List</div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              Full-stack React + Node + TS
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              {onHome ? (
                <Link to="/task/new">
                  <Button variant="primary">
                    <Plus className="h-4 w-4" />
                    Add Task
                  </Button>
                </Link>
              ) : (
                <Link to="/">
                  <Button variant="secondary">Back</Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">
                  <UserPlus className="h-4 w-4" />
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
