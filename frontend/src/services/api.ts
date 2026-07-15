import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Uploaded/seeded images come back from the backend as paths relative to its
// own origin (e.g. "/uploads/seed/x.jpg"), served by Express's static
// middleware — not the Vite dev server. Used directly as an <img src>, the
// browser resolves them against the frontend's own origin instead, so
// backend-sourced image paths must be resolved through this first.
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export function resolveImageUrl(path?: string): string {
  if (!path) return "";
  if (/^(https?:|blob:|data:)/.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tabletime_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
