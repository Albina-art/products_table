import { create } from 'zustand';

import { authApi } from '@/api/auth';
import type { AuthCredentials } from '@/types/auth';

import { translateAuthError } from './translateAuthError';

const AUTH_TOKEN_KEY = 'auth_token';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: AuthCredentials, remember: boolean) => Promise<void>;
  logout: () => void;
  setError: (error: string | null) => void;
}

const getStoredToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY) ?? sessionStorage.getItem(AUTH_TOKEN_KEY);
};

function persistAuthToken(token: string, remember: boolean) {
  if (remember) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  } else {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export const useAuth = create<AuthState>((set) => ({
  token: getStoredToken(),
  isLoading: false,
  error: null,

  login: async (credentials, remember) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authApi.login(credentials);
      const token = res.accessToken;
      persistAuthToken(token, remember);
      set({ token, isLoading: false, error: null });
    } catch (err) {
      const raw = err instanceof Error ? err.message : 'Ошибка авторизации';
      const message = translateAuthError(raw);
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    set({ token: null });
  },

  setError: (error) => set({ error }),
}));
