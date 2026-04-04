import { AuthForm } from '@/features/auth/AuthForm';
import styled from 'styled-components';
import logo from '/logo.svg';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  font-family: ${({ theme }) => theme.fonts.inter};
`;

const CardWrapper = styled.div`
  position: relative;
  padding: 6px;
  box-shadow: 0 24px 32px 0 rgba(0, 0, 0, 0.04);
  background: white;
  border-radius: 40px;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 495px;
  border-radius: 34px;
  background: white;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    border-radius: 34px;
    background: linear-gradient(180deg, rgba(35, 35, 35, 0.03) 0%, rgba(35, 35, 35, 0) 50%);
    pointer-events: none;
    z-index: 3;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 34px;
    background: linear-gradient(180deg, #EDEDED 19.5571%, rgba(237, 237, 237, 0) 100%);
    pointer-events: none;
    z-index: 1;
  }
`;

const Content = styled.div`
  position: relative;
  margin: 1px;
  border-radius: 33.5px;
  padding: 48px;
  box-sizing: border-box;
  background: white;
  z-index: 2;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Logo = styled.img`
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadow.logo};
  margin-bottom: 32px;
`;

const Title = styled.h1`
  margin: 0;
  ${({ theme }) => theme.typography.display};
`;

const Subtitle = styled.text`
  background: transparent;
  ${({ theme }) => theme.typography.lead};
  fill: ${({ theme }) => theme.colors.grey[200]};
`;

const GradientText = ({ text }: { text: string }) => (
  <svg
    width="272px"
    viewBox="0 0 272 27"
    preserveAspectRatio="xMidYMid meet"
    style={{ maxWidth: '419px', margin: '12px 0 32px' }}
  >
    <defs>
      <filter id="innerShadow">
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite operator="arithmetic" k2="-1" k3="1" in2="SourceAlpha" />
        <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.17 0" />
        <feBlend mode="normal" in2="SourceGraphic" />
      </filter>
    </defs>
    <Subtitle
      x="0"
      y="20"
      filter="url(#innerShadow)"
    >
      {text}
    </Subtitle>
  </svg>
);

export function LoginPage() {
  return (
    <Page>
      <CardWrapper>
        <Card>
          <Content>
            <Header>
              <Logo src={logo} alt="Logo" width={52} height={52} />
              <Title>Добро пожаловать!</Title>
              <GradientText text="Пожалуйста, авторизируйтесь" />
            </Header>
            <AuthForm />
          </Content>
        </Card>
      </CardWrapper>
    </Page>
  );
}