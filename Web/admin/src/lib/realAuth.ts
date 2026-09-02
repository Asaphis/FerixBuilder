const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:5006/api";

export interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
  message?: string;
  error?: string;
}

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const token = localStorage.getItem('adminToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (response.token) {
    localStorage.setItem('adminToken', response.token);
  }
  
  return response;
}

export async function getCurrentUser() {
  return apiRequest('/auth/me');
}

export function setAuthToken(token: string) {
  localStorage.setItem("adminToken", token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem("adminToken");
}

export function removeAuthToken() {
  localStorage.removeItem("adminToken");
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
