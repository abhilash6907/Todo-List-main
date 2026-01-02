import type { ApiErrorBody } from "../types";
import { clearAuth, getAuthToken } from "../modules/auth/storage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' 
    ? "https://todo-list-main-server.vercel.app"
    : "http://localhost:5174");

export class ApiError extends Error {
  status: number;
  body?: ApiErrorBody;

  constructor(status: number, message: string, body?: ApiErrorBody) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const token = getAuthToken();
  
  // Construct full URL if input is a relative path
  const url = typeof input === 'string' && input.startsWith('/') 
    ? `${API_BASE_URL}${input}` 
    : input;

  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  const providedHeaders = init?.headers ?? {};
  if (providedHeaders instanceof Headers) {
    providedHeaders.forEach((value, key) => {
      headers[key] = value;
    });
  } else if (Array.isArray(providedHeaders)) {
    for (const [key, value] of providedHeaders) {
      headers[key] = value;
    }
  } else {
    Object.assign(headers, providedHeaders);
  }

  if (token && !headers.Authorization && !headers.authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...init,
    headers: {
      ...headers
    }
  });

  if (res.status === 204) {
    return undefined as T;
  }

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const body = (isJson ? await res.json() : undefined) as unknown;

  if (!res.ok) {
    const errBody = body as ApiErrorBody | undefined;

    if (res.status === 401) {
      clearAuth();
      window.dispatchEvent(new Event("auth:changed"));
    }

    throw new ApiError(
      res.status,
      errBody?.message ?? `Request failed (${res.status})`,
      errBody
    );
  }

  return body as T;
}
