import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types";
import * as authService from "../services/authService";
import type { LoginPayload, RegisterPayload } from "../services/authService";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "tabletime_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as User) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const persist = (nextUser: User, token: string) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    localStorage.setItem("tabletime_token", token);
    setUser(nextUser);
  };

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const { user: loggedInUser, token } = await authService.login(payload);
      persist(loggedInUser, token);
      return loggedInUser;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const { user: newUser, token } = await authService.register(payload);
      persist(newUser, token);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("tabletime_token");
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const value: AuthContextValue = { user, isAuthenticated: Boolean(user), isLoading, login, register, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
