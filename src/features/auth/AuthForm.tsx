import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthInput } from '@/components/AuthInput';
import { Button } from '@/components/Button';

import { useAuth } from './useAuth';

const PersonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

export function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading, error, setError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('Введите логин');
      return;
    }
    if (!password.trim()) {
      setError('Введите пароль');
      return;
    }

    try {
      await login({ username, password }, remember);
      navigate('/products');
    } catch {
      // error already set in store
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <AuthInput
        label="Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        leadingIcon={<PersonIcon />}
        showClear
        onClear={() => setUsername('')}
        autoComplete="username"
        disabled={isLoading}
      />
      <AuthInput
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leadingIcon={<LockIcon />}
        showPasswordToggle
        autoComplete="current-password"
        disabled={isLoading}
      />
      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        Запомнить данные
      </label>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" disabled={isLoading} className="w-full py-2.5">
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>
      <div className="relative py-2">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-400">
          или
        </span>
        <div className="border-t border-gray-200" />
      </div>
      <p className="text-center text-sm text-gray-600">
        Нет аккаунта?{' '}
        <a href="#" className="text-blue-600 underline hover:text-blue-700" onClick={(e) => e.preventDefault()}>
          Создать
        </a>
      </p>
    </form>
  );
}
