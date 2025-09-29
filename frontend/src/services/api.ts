import axios from 'axios';
import { AuthResponse, User, Task } from '../types';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post<AuthResponse>('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data),
};

export const profileAPI = {
  getProfile: () => api.get<User>('/profile'),
  updateProfile: (data: { name?: string; email?: string }) =>
    api.put<User>('/profile', data),
};

export const taskAPI = {
  getTasks: (params?: { search?: string; status?: string; priority?: string }) =>
    api.get<Task[]>('/tasks', { params }),
  createTask: (data: { title: string; description?: string; status?: string; priority?: string }) =>
    api.post<Task>('/tasks', data),
  updateTask: (id: string, data: Partial<Task>) =>
    api.put<Task>(`/tasks/${id}`, data),
  deleteTask: (id: string) =>
    api.delete(`/tasks/${id}`),
};