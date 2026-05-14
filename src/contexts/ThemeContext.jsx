import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme } from '@mui/material';

const ThemeContext = createContext();

// ─── Shared palette tokens ─────────────────────────────────────────────────
const BRAND = {
  primary:      '#004d28',
  primaryLight: '#006233',
  primaryDark:  '#00381d',
  gold:         '#d4af37',
  goldLight:    '#e5c158',
  goldDark:     '#b89327',
};

function buildTheme(mode) {
  const isDark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary: {
        main:  BRAND.primaryLight,
        light: BRAND.primaryLight,
        dark:  BRAND.primaryDark,
      },
      secondary: {
        main:  BRAND.gold,
        light: BRAND.goldLight,
        dark:  BRAND.goldDark,
      },
      background: {
        default: isDark ? '#0f1117' : '#fafaf9',
        paper:   isDark ? '#1a1f2e' : '#ffffff',
      },
      text: {
        primary:   isDark ? '#f1f5f9' : '#1e293b',
        secondary: isDark ? '#94a3b8' : '#64748b',
      },
      divider: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
    },
    typography: {
      fontFamily: '"Inter", "Outfit", "Roboto", sans-serif',
      h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
      h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
      h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
      h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
      button: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 24,
            padding: '10px 24px',
            boxShadow: 'none',
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${BRAND.primaryLight}, ${BRAND.primary})`,
            boxShadow: '0 4px 15px rgba(0,77,40,0.2)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,77,40,0.3)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            ...(isDark && {
              background: '#1a1f2e',
              border: '1px solid rgba(255,255,255,0.06)',
            }),
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
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
