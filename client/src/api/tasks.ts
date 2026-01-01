import type { Task } from "../types";
import { apiFetch } from "./http";

export type TaskCreateInput = {
  title: string;
  description: string;
  completed: boolean;
};

export type TaskUpdateInput = TaskCreateInput;

export type TaskSort = "latest" | "oldest";

export async function fetchTasks(sort: TaskSort = "latest"): Promise<Task[]> {
  const qs = new URLSearchParams({ sort });
  return apiFetch<Task[]>(`/api/tasks?${qs.toString()}`);
}

export async function fetchTask(id: string): Promise<Task> {
  return apiFetch<Task>(`/api/tasks/${encodeURIComponent(id)}`);
}

export async function createTask(input: TaskCreateInput): Promise<Task> {
  return apiFetch<Task>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export async function updateTask(id: string, input: TaskUpdateInput): Promise<Task> {
  return apiFetch<Task>(`/api/tasks/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(input)
  });
}

export async function deleteTask(id: string): Promise<void> {
  return apiFetch<void>(`/api/tasks/${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
}
