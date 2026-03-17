import type { AuthCredentials, AuthResponse } from '@/types/auth';

import { apiClient } from './client';

export const authApi = {
  login: (credentials: AuthCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),
};
