import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AuthInput } from '@/components/AuthInput';
import { Button } from '@/components/Button';

import { useAuth } from './useAuth';

const PersonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7.25" r="4" stroke="#C9C9C9" stroke-width="2" />
    <path d="M9 13.75H15C16.6569 13.75 18 15.0931 18 16.75V20.75H6V16.75C6 15.1449 7.26055 13.8342 8.8457 13.7539L9 13.75Z" stroke="#CACACA" stroke-width="2" />
  </svg>
);

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_i_1046_82)">
      <path d="M17 11V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V11M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H8.8C7.11984 11 6.27976 11 5.63803 11.327C5.07354 11.6146 4.6146 12.0735 4.32698 12.638C4 13.2798 4 14.1198 4 15.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z" stroke="#EDEDED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <filter id="filter0_i_1046_82" x="3" y="2" width="18" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1046_82" />
      </filter>
    </defs>
  </svg>
);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
`;

const RememberLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border-color: ${({ theme }) => theme.colors.grey[300]};
  accent-color: ${({ theme }) => theme.colors.blue[600]};
`;

const ErrorAlert = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.red[600]};
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
`;

const DividerWrap = styled.div`
  position: relative;
  padding: 0.5rem 0;
`;

const DividerLine = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

const DividerText = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 0 0.5rem;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[400]};
`;

const Footer = styled.p`
  margin: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.blue[600]};
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.colors.blue[700]};
  }
`;

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
    <Form onSubmit={handleSubmit}>
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
      <RememberLabel>
        <Checkbox
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        Запомнить данные
      </RememberLabel>
      {error && <ErrorAlert role="alert">{error}</ErrorAlert>}
      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </SubmitButton>
      <DividerWrap>
        <DividerText>или</DividerText>
        <DividerLine />
      </DividerWrap>
      <Footer>
        Нет аккаунта?{' '}
        <FooterLink href="#" onClick={(e) => e.preventDefault()}>
          Создать
        </FooterLink>
      </Footer>
    </Form>
  );
}
