const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5006/api';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
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

// Auth API
export const authApi = {
  register: (data: { email: string; password: string; name: string; phone: string }) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  login: (data: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  verifyEmail: (token: string) =>
    apiRequest(`/auth/verify-email?token=${token}`),
  
  getCurrentUser: () =>
    apiRequest('/auth/me'),
};

// Project Requests API
export const projectRequestsApi = {
  create: (data: { name: string; businessName: string; email: string; serviceType: string; message: string; userId?: string }) =>
    apiRequest('/project-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  getByUser: (userId: string) =>
    apiRequest(`/project-requests/user/${userId}`),
  
  getAll: () =>
    apiRequest('/project-requests'),
  
  updateStatus: (id: string, status: string) =>
    apiRequest(`/project-requests/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  
  delete: (id: string) =>
    apiRequest(`/project-requests/${id}`, {
      method: 'DELETE',
    }),
};

// Contact API
export const contactApi = {
  submit: (data: { name: string; business: string; email: string; serviceType: string; message: string }) =>
    apiRequest('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Admin API
export const adminApi = {
  getStats: () =>
    apiRequest('/admin/stats'),
  
  getUsers: () =>
    apiRequest('/admin/users'),
};
