import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Cairo';
    src: url('/fonts/Cairo/Cairo-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Cairo';
    src: url('/fonts/Cairo/Cairo-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Cairo';
    src: url('/fonts/Cairo/Cairo-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter/Inter_28pt-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter/Inter_24pt-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter/Inter_24pt-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter/Inter_24pt-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.sans};
    background-color: ${({ theme }) => theme.colors.grey[25]};
    color: ${({ theme }) => theme.colors.grey[800]};
  }

  #root {
    min-height: 100vh;
    max-width: 72rem;
    margin: 0 auto;
  }

  @keyframes progress-fill {
    0% {
      width: 0%;
    }
    50% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }

  .progress-bar-fill {
    background-color: ${({ theme }) => theme.colors.blue[600]};
    animation: progress-fill 2s ease-in-out infinite;
  }

  @keyframes skeleton-shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .skeleton {
    background: linear-gradient(
      90deg,
      rgb(229 231 235) 25%,
      rgb(243 244 246) 50%,
      rgb(229 231 235) 75%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s ease-in-out infinite;
    border-radius: 4px;
  }
`;
