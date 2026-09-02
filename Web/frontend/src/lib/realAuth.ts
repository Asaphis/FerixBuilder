const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:5006/api/trpc";

export interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
  emailSent?: boolean;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  emailVerified: boolean;
}

async function tRPCCall(procedure: string, input?: any) {
  const response = await fetch(`${API_URL}/${procedure}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input ? { input } : {}),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message || "API call failed");
  }
  return data.result?.data;
}

export async function registerUser(data: {
  email: string;
  password: string;
  name?: string;
}): Promise<AuthResponse> {
  return tRPCCall("auth.register", data);
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  return tRPCCall("auth.login", { email, password });
}

export async function verifyEmail(token: string): Promise<{ success: boolean; alreadyVerified: boolean }> {
  return tRPCCall("auth.verifyEmail", { token });
}

export async function getCurrentUser(token: string): Promise<User> {
  return tRPCCall("auth.me", { token });
}

export function setAuthToken(token: string) {
  localStorage.setItem("authToken", token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

export function removeAuthToken() {
  localStorage.removeItem("authToken");
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
