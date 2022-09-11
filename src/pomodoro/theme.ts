import { Theme } from 'theme-ui'
import { colors } from './colors'

export const theme: Theme = {
  breakpoints: ['576px', '768px', '992px', '1200px'],
  colors: {
    ...colors,
    white: '#fff',
    black: '#000',
    text: '#212529',
    background: '#fff',
    primary: '#007bff',
    secondary: '#6c757d',
    muted: '#dee2e6',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#343a40',
    textMuted: '#6c757d',
    transparent: 'transparent',
  },
  space: ['0rem', '0.25rem', '0.5rem', '1rem', '1.5rem', '3rem'],
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    heading:
      'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    monospace:
      'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  fontSizes: [
    '0.75rem',
    '0.875rem',
    '1rem',
    '1.25rem',
    '1.5rem',
    '1.75rem',
    '2rem',
    '2.5rem',
    '3.5rem',
    '4.5rem',
    '5.5rem',
    '6rem',
  ],
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 700,
    light: 300,
    normal: 400,
    display: 300,
  },
  borders: {
    default: `1px solid ${colors.gray[5]}`,
    primary: `1px solid #007bff`,
  },
  lineHeights: {
    body: 1.6,
    heading: 1.2,
  },
  sizes: {
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140,
  },
  shadows: {
    default: '0 .5rem 1rem rgba(0, 0, 0, .15)',
    sm: '0 .125rem .25rem rgba(0, 0, 0, .075)',
    lg: '0 1rem 3rem rgba(0, 0, 0, .175)',
  },
  radii: {
    default: '0.25rem',
    sm: '0.2rem',
    lg: '0.3rem',
    pill: '50rem',
  },
  text: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
    },
    display: {
      fontWeight: 'display',
      lineHeight: 'heading',
    },
  },
  buttons: {
    pomodoro: {
      bg: 'rgba(0,0,0,0.2)',
      color: 'white',
      px: 2,
      borderWidth: 1,
      cursor: 'pointer',
      textDecoration: 'none',
      borderRadius: 'default',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontFamily: 'monospace',
      '&.active, &:active, &:hover:active, &.active:hover': {
        color: 'background',
        bg: 'rgba(0,0,0,0.55)',
      },
      transition:
        'box-shadow 200ms ease-in-out, color 200ms ease-in-out, background-color 200ms ease-in-out',
      '&:hover': {
        bg: 'rgba(0, 0, 0, 0.35)',
        boxShadow: 'default',
      },
    },
    primary: {
      color: 'primary',
      borderColor: 'primary',
      borderStyle: 'solid',
      borderWidth: 1,
      bg: 'background',
      cursor: 'pointer',
      textDecoration: 'none',
      borderRadius: 'default',
      '&.active, &:active, &:hover:active, &.active:hover': {
        color: 'background',
        bg: 'primary',
      },
      transition:
        'box-shadow 200ms ease-in-out, color 200ms ease-in-out, background-color 200ms ease-in-out',
      '&:hover': {
        bg: 'rgba(0, 123, 255, 0.2)',
        boxShadow: 'default',
      },
      '&.hidden': {
        display: 'none',
      },
    },
    secondary: {
      color: 'background',
      bg: 'secondary',
    },
    gray: {
      color: 'background',
      bg: 'gray',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
    },
    p: {
      mb: 3,
      lineHeight: 'body',
    },
    h1: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 7,
    },
    h2: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 6,
    },
    h3: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 5,
    },
    h4: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 4,
    },
    h5: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 3,
    },
    h6: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 2,
    },
    blockquote: {
      fontSize: 3,
      mb: 3,
    },
    table: {
      width: '100%',
      marginBottom: 3,
      color: 'gray.9',
      borderCollapse: 'collapse',
    },
    th: {
      verticalAlign: 'bottom',
      borderTopWidth: 2,
      borderTopStyle: 'solid',
      borderTopColor: 'gray.3',
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: 'gray.3',
      padding: '.75rem',
      textAlign: 'inherit',
    },
    td: {
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: 'gray.3',
      verticalAlign: 'top',
      padding: '.75rem',
    },
    inlineCode: {
      color: 'pink',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  cards: {
    primary: {
      border: 'default',
      borderRadius: 'default',

      transition:
        'box-shadow 200ms ease-in-out, color 200ms ease-in-out, background-color 200ms ease-in-out',
      '&:hover': {
        boxShadow: 'default',
      },
    },
    stigmata: {
      padding: 2,
      borderRadius: 4,
      borderColor: 'gray.3',
      borderWidth: 1,
      borderStyle: 'solid',
    },
  },
  badges: {
    primary: {
      backgroundColor: 'primary',
    },
    secondary: {
      backgroundColor: 'secondary',
    },
  },
}
