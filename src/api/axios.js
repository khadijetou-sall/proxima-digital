import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const projectAPI = {
  getMyProjects: () => api.get('/projects/client'),
  getById: (id) => api.get(`/projects/${id}`),
  getAll: () => api.get('/projects/all'),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  updateProgress: (id, progress) => api.put(`/projects/${id}/progress`, { progress }),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const contactAPI = {
  create: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  updateStatus: (id, status) => api.put(`/contact/${id}/status`, { status }),
  remove: (id) => api.delete(`/contact/${id}`),
};

export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
  unsubscribe: (email) => api.post('/newsletter/unsubscribe', { email }),
  getAll: () => api.get('/newsletter'),
  remove: (id) => api.delete(`/newsletter/${id}`),
};

export const adminAPI = {
  getClients: () => api.get('/admin/clients'),
  getClientById: (id) => api.get(`/admin/clients/${id}`),
  removeClient: (id) => api.delete(`/admin/clients/${id}`),
  getStats: () => api.get('/admin/stats'),
  login: (data) => api.post('/auth/admin/login', data),
};

export const deliverableAPI = {
  getByProject: (projectId) => api.get(`/deliverables/project/${projectId}`),
  download: (id) => api.get(`/deliverables/download/${id}`, { responseType: 'blob' }),
  create: (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, value);
    });
    return api.post('/deliverables', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  remove: (id) => api.delete(`/deliverables/${id}`),
};

export default api;
