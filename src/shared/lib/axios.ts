import axios, { isAxiosError } from "axios";
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
import { env } from "@/shared/lib/env";
import { API_ENDPOINTS } from "@/shared/lib/apiEndpoints";

const isTauri = "__TAURI_INTERNALS__" in window;

// WARNING: inside Tauri, requests go through Rust (reqwest) instead of the webview. The webview origin is cross-site to the API, so it would drop the SameSite=Strict auth cookies; the Rust cookie jar keeps them and also skips CORS.
export const apiClient = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  ...(isTauri && { adapter: "fetch", env: { fetch: tauriFetch } }),
});

const { auth } = API_ENDPOINTS.client;
const NO_REFRESH_ENDPOINTS: string[] = [
  auth.login,
  auth.register,
  auth.refresh,
  auth.logout,
];

const retriedRequests = new WeakSet<object>();
let refreshRequest: Promise<unknown> | null = null;

apiClient.interceptors.response.use(undefined, async (error: unknown) => {
  if (!isAxiosError(error) || error.response?.status !== 401) throw error;

  const request = error.config;
  if (
    !request ||
    retriedRequests.has(request) ||
    NO_REFRESH_ENDPOINTS.includes(request.url ?? "")
  ) {
    throw error;
  }

  retriedRequests.add(request);
  refreshRequest ??= apiClient
    .post(auth.refresh)
    .finally(() => (refreshRequest = null));

  try {
    await refreshRequest;
  } catch {
    throw error;
  }

  return apiClient(request);
});
