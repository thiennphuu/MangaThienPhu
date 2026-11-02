"use client";

/**
 * AuthContext.tsx
 *
 * Provides authentication state and actions to the whole app.
 * Token is persisted in localStorage so sessions survive page reloads.
 * The access token is stored under the key "mh_access_token".
 * The user profile is stored under "mh_user".
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authService } from "../../services/authService";
import type {
  AuthContextValue,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "../../types/auth";

const TOKEN_KEY = "mh_access_token";
const USER_KEY = "mh_user";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // true until we hydrate from storage

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setUser(JSON.parse(storedUser) as AuthUser);
      }
    } catch {
      // Corrupted storage — start fresh
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persist = useCallback((token: string, authUser: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    setAccessToken(token);
    setUser(authUser);
  }, []);

  const login = useCallback(
    async (req: LoginRequest) => {
      const { user: authUser, tokens } = await authService.login(req);
      persist(tokens.accessToken, authUser);
    },
    [persist],
  );

  const register = useCallback(
    async (req: RegisterRequest) => {
      const { user: authUser, tokens } = await authService.register(req);
      persist(tokens.accessToken, authUser);
    },
    [persist],
  );

  const logout = useCallback(() => {
    if (accessToken) {
      // Fire-and-forget; don't block UI on network
      authService.logout(accessToken).catch(() => undefined);
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAccessToken(null);
    setUser(null);
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!accessToken,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Must be used inside <AuthProvider> */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
