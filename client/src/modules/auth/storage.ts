export type AuthUser = {
  id: string;
  email: string;
};

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

function notifyAuthChanged() {
  window.dispatchEvent(new Event("auth:changed"));
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  notifyAuthChanged();
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
  notifyAuthChanged();
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof (parsed as { id?: unknown }).id === "string" &&
      typeof (parsed as { email?: unknown }).email === "string"
    ) {
      return {
        id: (parsed as { id: string }).id,
        email: (parsed as { email: string }).email
      };
    }
  } catch {
    return null;
  }
  return null;
}

export function setStoredUser(user: AuthUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  notifyAuthChanged();
}

export function clearStoredUser() {
  localStorage.removeItem(USER_KEY);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  notifyAuthChanged();
}
