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

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
}

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const token = localStorage.getItem('auth_token');
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

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
  phone: string;
}): Promise<AuthResponse> {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (response.token) {
    localStorage.setItem('auth_token', response.token);
  }
  
  return response;
}

export async function verifyEmail(token: string): Promise<{ message: string }> {
  return apiRequest(`/auth/verify-email?token=${token}`);
}

export async function getCurrentUser(): Promise<User> {
  return apiRequest('/auth/me');
}

export function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function removeAuthToken() {
  localStorage.removeItem('auth_token');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
