import { motion } from "framer-motion";
import { CheckCircle2, Circle, ExternalLink, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Task } from "../types";
import { Button } from "./Button";
import { StatusPill } from "./StatusPill";

export function TaskCard({
  task,
  onToggle,
  onDelete
}: {
  task: Task;
  onToggle: (t: Task) => void;
  onDelete: (t: Task) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className="group rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-soft transition-shadow hover:shadow-softLg dark:border-slate-800 dark:bg-slate-900/50"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="truncate text-base font-semibold">{task.title}</div>
            <StatusPill completed={task.completed} />
          </div>
          <div className="mt-2 overflow-hidden text-sm text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] dark:text-slate-300">
            {task.description || "No description"}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <Button
          variant={task.completed ? "secondary" : "primary"}
          size="sm"
          onClick={() => onToggle(task)}
        >
          {task.completed ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Circle className="h-4 w-4" />
          )}
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </Button>

        <div className="flex items-center gap-2">
          <Link to={`/task/${task.id}`}>
            <Button variant="ghost" size="sm">
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-[1px]" />
              Details
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => onDelete(task)}>
            <Trash2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
