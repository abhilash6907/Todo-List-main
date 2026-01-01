import type { ApiErrorBody } from "../types";
import { clearAuth, getAuthToken } from "../modules/auth/storage";

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

  const res = await fetch(input, {
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
