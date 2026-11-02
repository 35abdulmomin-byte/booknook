import { authClient } from "@/lib/auth-client";

export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

async function getToken() {
  const { data, error } = await authClient.token();
  if (error || !data?.token) throw new Error("Please login again.");
  return data.token;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  auth = false
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body) headers.set("Content-Type", "application/json");
  if (auth) headers.set("Authorization", `Bearer ${await getToken()}`);

  const res = await fetch(`${API_URL}${path}`, { ...options, headers, cache: "no-store" });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.message || "Something went wrong.");
  return data as T;
}