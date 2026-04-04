import logo from '/logo.svg';
import { AuthForm } from '@/features/auth/AuthForm';

import * as S from './LoginPage.styles';

export function LoginPage() {
  return (
    <S.Page>
      <S.CardWrapper>
        <S.Card>
          <S.Content>
            <S.Header>
              <S.Logo src={logo} alt="Logo" width={52} height={52} />
              <S.Title>Добро пожаловать!</S.Title>
              <S.GradientText text="Пожалуйста, авторизируйтесь" width="272px" height="27px" fontSize="18px" />
            </S.Header>
            <AuthForm />
          </S.Content>
        </S.Card>
      </S.CardWrapper>
    </S.Page>
  );
}
