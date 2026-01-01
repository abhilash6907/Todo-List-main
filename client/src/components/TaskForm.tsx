import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import type { Task } from "../types";
import { Button } from "./Button";
import { StatusPill } from "./StatusPill";

export type TaskDraft = {
  title: string;
  description: string;
  completed: boolean;
};

export function TaskForm({
  initial,
  onSubmit,
  submitting
}: {
  initial: Task | TaskDraft;
  onSubmit: (draft: TaskDraft) => void;
  submitting: boolean;
}) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [completed, setCompleted] = useState(initial.completed);
  const [touched, setTouched] = useState(false);

  // Reset form when initial values change (e.g., navigating between tasks)
  useEffect(() => {
    setTitle(initial.title);
    setDescription(initial.description);
    setCompleted(initial.completed);
    setTouched(false);
  }, [initial.title, initial.description, initial.completed]);

  const titleError = useMemo(() => {
    if (!touched) return null;
    if (title.trim().length === 0) return "Title cannot be empty";
    return null;
  }, [title, touched]);

  const canSubmit = title.trim().length > 0 && !submitting;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        if (!canSubmit) return;
        onSubmit({ title: title.trim(), description: description.trim(), completed });
      }}
      className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/50"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">Task</div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Fill in details and keep your work organized.
          </div>
        </div>
        <StatusPill completed={completed} />
      </div>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="e.g. Complete project report"
            className="h-11 rounded-xl border border-slate-200 bg-white/70 px-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/30"
          />
          {titleError ? (
            <div className="text-xs font-medium text-rose-600 dark:text-rose-400">
              {titleError}
            </div>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a short description (optional)"
            rows={5}
            className="resize-none rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/30"
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setCompleted((v) => !v)}
            className="group inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-medium transition hover:bg-white active:translate-y-[1px] dark:border-slate-800 dark:bg-slate-950/30 dark:hover:bg-slate-950/50"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={
                completed
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400"
              }
            >
              {completed ? "Complete" : "Incomplete"}
            </motion.span>
            <motion.span
              layout
              className={
                completed
                  ? "h-5 w-10 rounded-full bg-emerald-500/30"
                  : "h-5 w-10 rounded-full bg-amber-500/30"
              }
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                className={
                  completed
                    ? "ml-5 mt-0.5 block h-4 w-4 rounded-full bg-emerald-500"
                    : "ml-1 mt-0.5 block h-4 w-4 rounded-full bg-amber-500"
                }
              />
            </motion.span>
          </button>

          <Button type="submit" variant="primary" disabled={!canSubmit}>
            <Save className="h-4 w-4" />
            {submitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}
