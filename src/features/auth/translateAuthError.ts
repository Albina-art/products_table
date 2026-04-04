export function translateAuthError(message: string): string {
  const key = message.trim().toLowerCase();
  if (key === 'invalid credentials') {
    return 'Неверный логин или пароль';
  }
  return message;
}
