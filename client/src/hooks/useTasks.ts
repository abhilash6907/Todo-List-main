import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { Task } from "../types";
import * as tasksApi from "../api/tasks";

export function useTasks(sort: tasksApi.TaskSort) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.fetchTasks(sort);
      setTasks(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [sort]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const create = useCallback(async (input: tasksApi.TaskCreateInput) => {
    const optimisticId = `optimistic-${Date.now()}`;
    const optimistic: Task = { id: optimisticId, ...input };

    setTasks((prev) => [optimistic, ...prev]);

    try {
      const created = await tasksApi.createTask(input);
      setTasks((prev) => prev.map((t) => (t.id === optimisticId ? created : t)));
      toast.success("Task created");
      return created;
    } catch (e) {
      setTasks((prev) => prev.filter((t) => t.id !== optimisticId));
      toast.error(e instanceof Error ? e.message : "Failed to create task");
      throw e;
    }
  }, []);

  const update = useCallback(async (id: string, input: tasksApi.TaskUpdateInput) => {
    let previous: Task | undefined;
    setTasks((prev) => {
      previous = prev.find((t) => t.id === id);
      return prev.map((t) => (t.id === id ? { ...t, ...input } : t));
    });

    try {
      const updated = await tasksApi.updateTask(id, input);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      toast.success("Task updated");
      return updated;
    } catch (e) {
      if (previous) {
        setTasks((prev) => prev.map((t) => (t.id === id ? previous! : t)));
      }
      toast.error(e instanceof Error ? e.message : "Failed to update task");
      throw e;
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    let previous: Task | undefined;
    setTasks((prev) => {
      previous = prev.find((t) => t.id === id);
      return prev.filter((t) => t.id !== id);
    });

    try {
      await tasksApi.deleteTask(id);
      toast.success("Task deleted");
    } catch (e) {
      if (previous) setTasks((prev) => [previous!, ...prev]);
      toast.error(e instanceof Error ? e.message : "Failed to delete task");
      throw e;
    }
  }, []);

  const toggleCompleted = useCallback(
    async (t: Task) => {
      return update(t.id, {
        title: t.title,
        description: t.description,
        completed: !t.completed
      });
    },
    [update]
  );

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    return { total, done, remaining: total - done };
  }, [tasks]);

  return { tasks, loading, error, refresh, create, update, remove, toggleCompleted, stats };
}
