import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import toast from "react-hot-toast";
import * as authApi from "./api";
import {
  clearAuth,
  getAuthToken,
  getStoredUser,
  setAuthToken,
  setStoredUser,
  type AuthUser
} from "./storage";

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getAuthToken());
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  const applyAuth = useCallback((next: authApi.AuthResponse) => {
    if (next.token) {
      setAuthToken(next.token);
      setStoredUser(next.user);
      setToken(next.token);
      setUser(next.user);
      window.dispatchEvent(new Event("auth:changed"));
    }
  }, []);

  const signup = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.signup(email, password);
      if (res.message) {
        toast.success(res.message);
      } else {
        applyAuth(res);
        toast.success("Account created");
      }
    },
    [applyAuth]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.login(email, password);
      applyAuth(res);
      toast.success("Logged in");
    },
    [applyAuth]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    } finally {
      clearAuth();
      setToken(null);
      setUser(null);
      toast.success("Logged out");
    }
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      signup,
      login,
      logout
    }),
    [token, user, signup, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
