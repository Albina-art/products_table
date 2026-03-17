import { create } from 'zustand';

import { authApi } from '@/api/auth';
import type { AuthCredentials } from '@/types/auth';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: AuthCredentials, remember: boolean) => Promise<void>;
  logout: () => void;
  setError: (error: string | null) => void;
}

const getStoredToken = (): string | null => {
  return localStorage.getItem('auth_token') ?? sessionStorage.getItem('auth_token');
};

export const useAuth = create<AuthState>((set) => ({
  token: getStoredToken(),
  isLoading: false,
  error: null,

  login: async (credentials, remember) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authApi.login(credentials);
      const token = res.accessToken;
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('auth_token', token);
      set({ token, isLoading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка авторизации';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    set({ token: null });
  },

  setError: (error) => set({ error }),
}));
