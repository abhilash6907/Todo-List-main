import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";
import { TaskForm, type TaskDraft } from "../components/TaskForm";
import { createTask, deleteTask, fetchTask, updateTask } from "../api/tasks";
import type { Task } from "../types";

const emptyDraft: TaskDraft = { title: "", description: "", completed: false };

export function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isNew = id === "new";

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (isNew) return;
    if (!id) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const t = await fetchTask(id);
        if (!cancelled) setTask(t);
      } catch (e) {
        if (!cancelled) {
          setNotFound(true);
          toast.error(e instanceof Error ? e.message : "Task not found");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, isNew]);

  const title = useMemo(() => {
    if (isNew) return "Add Task";
    if (task) return "Task Details";
    return "Task";
  }, [isNew, task]);

  const initial = isNew ? emptyDraft : task ?? emptyDraft;

  const onSubmit = async (draft: TaskDraft) => {
    setSubmitting(true);
    try {
      if (isNew) {
        await createTask(draft);
        toast.success("Created");
        navigate("/", { replace: true, state: { refresh: true } });
        return;
      }

      if (!id) return;
      const updated = await updateTask(id, draft);
      setTask(updated);
      toast.success("Updated");
    } catch {
      // handled via toast
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async () => {
    if (isNew) {
      navigate("/");
      return;
    }
    if (!id) return;

    setSubmitting(true);
    try {
      await deleteTask(id);
      toast.success("Deleted");
      navigate("/");
    } catch {
      // handled via toast
    } finally {
      setSubmitting(false);
    }
  };

  if (!isNew && loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/50">
        <Spinner label="Loading task..." />
      </div>
    );
  }

  if (!isNew && notFound) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/50">
        <div className="text-lg font-semibold">Task not found</div>
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          The task ID is invalid or the task was deleted.
        </div>
        <div className="mt-5">
          <Button variant="secondary" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="text-2xl font-bold tracking-tight">{title}</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {isNew ? "Create a new task" : "View or edit your task"}
          </div>
        </div>

        <Button variant="danger" onClick={onDelete} disabled={submitting}>
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </motion.div>

      <TaskForm initial={initial} onSubmit={onSubmit} submitting={submitting} />
    </div>
  );
}
