import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme } from '@mui/material';

const ThemeContext = createContext();

// ─── Shared palette tokens ─────────────────────────────────────────────────
const BRAND = {
  primary:      '#0A2B4E', // Navy Blue
  primaryLight: '#0D3A6B', // Slightly lighter navy
  primaryDark:  '#051A31', // Darker navy
  secondary:    '#D95A2B', // Burnt Orange / Terracotta
  secondaryLight: '#E86F43',
  secondaryDark:  '#B8471D',
  accent:       '#E2B13C', // Soft Gold
};

function buildTheme(mode) {
  const isDark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary: {
        main:  BRAND.primary,
        light: BRAND.primaryLight,
        dark:  BRAND.primaryDark,
        contrastText: '#FFFFFF',
      },
      secondary: {
        main:  BRAND.secondary,
        light: BRAND.secondaryLight,
        dark:  BRAND.secondaryDark,
        contrastText: '#FFFFFF',
      },
      error: { main: '#EF4444' },
      warning: { main: '#F59E0B' },
      info: { main: '#3B82F6' },
      success: { main: '#10B981' },
      background: {
        default: isDark ? '#0F172A' : '#FFFFFF',
        paper:   isDark ? '#1E293B' : '#F8FAFC',
      },
      text: {
        primary:   isDark ? '#F1F5F9' : '#1E2A3A',
        secondary: isDark ? '#94A3B8' : '#5A6A7A',
        disabled:  isDark ? '#475569' : '#94A3B8',
      },
      divider: isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0',
    },
    typography: {
      fontFamily: '"Inter", "Outfit", "Roboto", sans-serif',
      h1: { fontFamily: '"Poppins", "Inter", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
      h2: { fontFamily: '"Poppins", "Inter", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontFamily: '"Poppins", "Inter", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' },
      h4: { fontFamily: '"Poppins", "Inter", sans-serif', fontWeight: 700 },
      body1: { fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: '1rem' },
      button: { fontFamily: '"Outfit", sans-serif', fontWeight: 500 },
    },
    shape: { borderRadius: 8 }, // 8px for basic elements
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            padding: '10px 24px',
            boxShadow: 'none',
            transition: 'all 0.2s ease-in-out',
          },
          containedPrimary: {
            background: BRAND.primary,
            '&:hover': {
              background: '#0A1E3A',
              boxShadow: '0 4px 12px rgba(10, 43, 78, 0.2)',
            },
          },
          containedSecondary: {
            background: BRAND.secondary,
            '&:hover': {
              background: BRAND.secondaryDark,
              boxShadow: '0 4px 12px rgba(217, 90, 43, 0.2)',
            },
          },
          outlinedSecondary: {
            borderColor: BRAND.secondary,
            color: BRAND.secondary,
            '&:hover': {
              background: BRAND.secondary,
              color: '#FFFFFF',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            ...(isDark && {
              background: '#1E293B',
              border: '1px solid rgba(255,255,255,0.06)',
            }),
          },
          rounded: {
            borderRadius: 12,
            boxShadow: isDark ? 'none' : '0 4px 12px rgba(0,0,0,0.05)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isDark ? 'none' : '0 4px 12px rgba(0,0,0,0.05)',
            backgroundImage: 'none',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 6,
          },
        },
      },
    },
  });
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('theme_mode') || 'light';
  });

  // Sync CSS data-attribute & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme_mode', mode);
  }, [mode]);

  const toggleMode = () =>
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children(theme)}
    </ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useThemeMode() {
  return useContext(ThemeContext);
}
