import { useState, type SubmitEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthInput } from '@/components/AuthInput';
import { GradientText } from '@/components/GradientText';
import { IconLock, IconPerson } from '@/components/icons';
import { IconCheckbox } from '@/components/icons/IconCheckbox';

import { useToast } from '../ui/useToast';
import * as S from './AuthForm.styles';
import { useAuth } from './useAuth';

function validateRequired(username: string, password: string) {
  const usernameError = !username.trim() ? 'Введите логин' : undefined;
  const passwordError = !password.trim() ? 'Введите пароль' : undefined;
  return { usernameError, passwordError };
}

export function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [usernameError, setUsernameError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login, isLoading, error: apiError, setError } = useAuth();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError(null);
    setUsernameError(undefined);
    setPasswordError(undefined);

    const { usernameError: currentUsernameError, passwordError: currentPasswordError } = validateRequired(username, password);

    if (currentUsernameError) {
      setUsernameError(currentUsernameError);
    }

    if (currentPasswordError) {
      setPasswordError(currentPasswordError);
    }

    if (currentUsernameError || currentPasswordError) {
      return;
    }

    await login({ username: username.trim(), password }, remember).catch((err) => {
      const message = err instanceof Error ? err.message : 'Ошибка авторизации';
      showToast(message, 'error');
    }).then(() => {
      navigate('/products');
    });
  };

  return (
    <S.Form onSubmit={handleSubmit} noValidate>
      <AuthInput
        label="Логин"
        value={username}
        error={usernameError}
        onChange={(e) => {
          setUsername(e.target.value);
          setUsernameError(undefined);
          setError(null);
        }}
        leadingIcon={
          <S.LeadIconWrap>
            <IconPerson />
          </S.LeadIconWrap>
        }
        showClear
        onClear={() => {
          setUsername('');
          setUsernameError(undefined);
          setError(null);
        }}
        autoComplete="username"
        disabled={isLoading}
      />
      <AuthInput
        label="Пароль"
        type="password"
        value={password}
        error={passwordError}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError(undefined);
          setError(null);
        }}
        leadingIcon={
          <S.LeadIconWrap $tone="light">
            <IconLock />
          </S.LeadIconWrap>
        }
        showPasswordToggle
        autoComplete="current-password"
        disabled={isLoading}
      />
      {apiError && <S.ErrorAlert role="alert">{apiError}</S.ErrorAlert>}
      <S.RememberLabel onClick={() => setRemember((currentRemember) => !currentRemember)}>
        <IconCheckbox checked={remember} />
        Запомнить данные
      </S.RememberLabel>
      <S.SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </S.SubmitButton>
      <S.DividerWrap>
        <S.DividerLine />
        <GradientText text="или" width="29px" height="24px" fontSize="16px" />
        <S.DividerLine />
      </S.DividerWrap>
      <S.Footer>
        Нет аккаунта?
        <S.FooterLink onClick={() => showToast('Эта функция пока не доступна', 'info')}>
          Создать
        </S.FooterLink>
      </S.Footer>
    </S.Form>
  );
}
