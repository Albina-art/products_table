const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const theme = {
  fontWeight,
  colors: {
    primary: {
      DEFAULT: '#242EDB',
      light: '#367AFF',
      deep: '#3C538E',
      dark: '#202020',
      darker: '#161919',
    },
    grey: {
      25: '#F9F9F9',
      28: '#F6F6F6',
      30: '#F3F3F3',
      50: '#ECECEB',
      100: '#EDEDED',
      200: '#E0E0E0',
      300: '#C9C9C9',
      400: '#B2B3B9',
      500: '#9C9C9C',
      600: '#999999',
      700: '#333333',
      800: '#232323',
      900: '#222222',
    },
    second: {
      DEFAULT: '#515161',
      muted: '#969B9F',
    },
    blue: {
      50: '#eff6ff',
      100: '#367AFF',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    red: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
    },
    green: {
      500: '#22c55e',
    },
  },
  fonts: {
    cairo: 'Cairo, "Open Sans", system-ui, sans-serif',
    sans: '"Open Sans", system-ui, sans-serif',
    inter: 'Inter, "Open Sans", system-ui, sans-serif',
    roboto: 'Roboto, "Open Sans", system-ui, sans-serif',
    robotoMono: '"Roboto Mono", ui-monospace, monospace',
  },
  typography: {
    display: { fontSize: '40px', lineHeight: '110%', fontWeight: fontWeight.semibold },
    title: { fontSize: '24px', lineHeight: '120%', fontWeight: fontWeight.bold },
    subtitle: { fontSize: '20px', lineHeight: '120%' },
    lead: { fontSize: '18px', lineHeight: '150%', fontWeight: fontWeight.medium },
    body: { fontSize: '16px', lineHeight: '150%' },
    bodySm: { fontSize: '14px', lineHeight: '150%' },
    caption: { fontSize: '14px', lineHeight: '120%' },
  },
  shadow: {
    logo: '0 12px 8px 0 rgba(0, 0, 0, 0.03)',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  borderRadius: {
    xxs: '4px',
    xs: '6px',
    sm: '8px',
    md: '12px',
    lg: '23px',
    xl: '40px',
    full: '9999px',
  },
} as const;

export type AppTheme = typeof theme;
