import type {
  AuthResponse,
  AuthTokens,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8080";

async function authFetch<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(
      payload?.error?.message ?? payload?.error ?? `Auth request failed (${response.status})`,
    );
  }
  return response.json() as Promise<T>;
}

type LegacyLoginResponse = {
  user_id: string;
  username: string;
  token: string;
  expires_at: string;
};

export const authService = {
  login: async (req: LoginRequest): Promise<AuthResponse> => {
    const response = await authFetch<LegacyLoginResponse>("/auth/login", {
      username: req.email,
      email: req.email,
      password: req.password,
    });
    return {
      user: {
        id: response.user_id,
        email: req.email,
        displayName: response.username,
      },
      tokens: {
        accessToken: response.token,
        expiresAt: response.expires_at,
      },
    };
  },

  register: async (req: RegisterRequest): Promise<AuthResponse> => {
    await authFetch("/auth/register", {
      username: req.displayName.trim(),
      email: req.email,
      password: req.password,
    });
    return authService.login({ email: req.email, password: req.password });
  },

  refresh: async (_refreshToken: string): Promise<{ tokens: AuthTokens }> => {
    throw new Error("Token refresh is not supported by this backend yet.");
  },

  logout: (accessToken: string) =>
    fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    }),
};
