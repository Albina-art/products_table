import { AuthForm } from '@/features/auth/AuthForm';

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-gray-800">
    <rect x="8" y="12" width="3" height="8" rx="1.5" fill="currentColor" />
    <rect x="14.5" y="8" width="3" height="16" rx="1.5" fill="currentColor" />
    <rect x="21" y="14" width="3" height="4" rx="1.5" fill="currentColor" />
  </svg>
);

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-gray-50/50 p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800">
            <LogoIcon />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Добро пожаловать!</h1>
          <p className="mt-1 text-sm text-gray-500">Пожалуйста, авторизируйтесь</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
