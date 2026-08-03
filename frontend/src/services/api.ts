import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
