import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowDownUp, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { Button } from "../components/Button";
import { EmptyState } from "../components/EmptyState";
import { SkeletonCard } from "../components/SkeletonCard";
import { TaskCard } from "../components/TaskCard";
import type { Task } from "../types";
import type { TaskSort } from "../api/tasks";

export function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sort, setSort] = useState<TaskSort>("latest");
  const { tasks, loading, error, refresh, remove, toggleCompleted, stats } = useTasks(sort);

  // Refresh tasks when navigating back to home page
  useEffect(() => {
    if (location.state && (location.state as any).refresh) {
      void refresh();
      // Clear the state to prevent repeated refreshes
      window.history.replaceState({}, document.title);
    }
  }, [location.key, refresh]);

  const sortedTasks = useMemo(() => {
    const order = sort === "oldest" ? 1 : -1;
    return [...tasks].sort((a, b) => {
      const da = a.createdAt ? Date.parse(a.createdAt) : 0;
      const db = b.createdAt ? Date.parse(b.createdAt) : 0;
      return (da - db) * order;
    });
  }, [tasks, sort]);

  const onDelete = async (t: Task) => {
    try {
      await remove(t.id);
    } catch {
      // handled via toast
    }
  };

  const onToggle = async (t: Task) => {
    try {
      await toggleCompleted(t);
    } catch {
      // handled via toast
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-2xl font-bold tracking-tight"
          >
            Your Tasks
          </motion.h1>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {stats.total} total • {stats.done} complete • {stats.remaining} remaining
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setSort((s) => (s === "latest" ? "oldest" : "latest"))}
          >
            <ArrowDownUp className="h-4 w-4" />
            {sort === "latest" ? "Newest" : "Oldest"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              void refresh();
              toast.success("Refreshing...");
            }}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : sortedTasks.length === 0 ? (
        <EmptyState onAdd={() => navigate("/task/new")} />
      ) : (
        <motion.div
          layout
          className="grid gap-4 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <AnimatePresence mode="popLayout">
            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
