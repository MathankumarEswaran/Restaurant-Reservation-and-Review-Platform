import { api, resolveImageUrl } from "./api";
import type { User } from "../types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface BackendUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: User["role"];
  joinedAt: string;
}

const mapUser = (backendUser: BackendUser): User => ({
  id: backendUser._id,
  name: backendUser.name,
  email: backendUser.email,
  phone: backendUser.phone,
  avatar: backendUser.avatar ? resolveImageUrl(backendUser.avatar) : undefined,
  role: backendUser.role,
  joinedAt: backendUser.joinedAt,
});

export async function login(payload: LoginPayload): Promise<{ user: User; token: string }> {
  const { data } = await api.post<{ user: BackendUser; token: string }>("/auth/login", payload);
  return { user: mapUser(data.user), token: data.token };
}

export async function register(payload: RegisterPayload): Promise<{ user: User; token: string }> {
  const { data } = await api.post<{ user: BackendUser; token: string }>("/auth/register", payload);
  return { user: mapUser(data.user), token: data.token };
}

// The forgot/reset-password pages don't yet carry a real token between them
// (ResetPassword always calls this with a hardcoded "mock-token" — there's no
// email-link mechanism in place), so these stay mocked rather than hitting
// the real backend, which expects a genuine user id and would just error.
const delay = <T>(value: T, ms = 500): Promise<T> => new Promise((resolve) => setTimeout(() => resolve(value), ms));

export function requestPasswordReset(email: string): Promise<{ sent: boolean }> {
  return delay({ sent: Boolean(email) });
}

export function resetPassword(_token: string, _newPassword: string): Promise<{ success: boolean }> {
  return delay({ success: true });
}
