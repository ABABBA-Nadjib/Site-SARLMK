import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, createTheme, CssBaseline, CircularProgress, Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import AdminLayout from './components/Layout/AdminLayout';
import ChatBot from './components/ChatBot';

// Admin Pages (static - keep auth fast)
import AdminLogin   from './pages/Admin/AdminLogin';
import Dashboard    from './pages/Admin/Dashboard';
import Workers      from './pages/Admin/Workers';
import Tracking     from './pages/Admin/Tracking';
import Accounting   from './pages/Admin/Accounting';
import Payroll      from './pages/Admin/Payroll';
import Equipment    from './pages/Admin/Equipment';
import ProjectsList from './pages/Admin/Projects';

// Lazy-loaded Public Pages
const Home            = lazy(() => import('./pages/Public/Home'));
const About           = lazy(() => import('./pages/Public/About'));
const Services        = lazy(() => import('./pages/Public/Services'));
const Projects        = lazy(() => import('./pages/Public/Projects'));
const EquipmentPublic = lazy(() => import('./pages/Public/Equipment'));
const Contact         = lazy(() => import('./pages/Public/Contact'));
const AIAssistantPage = lazy(() => import('./pages/Public/AIAssistantPage'));

// MUI Theme
const theme = createTheme({
  palette: {
    primary: { main: '#004d28', light: '#006233', dark: '#00381d' },
    secondary: { main: '#d4af37', light: '#e5c158', dark: '#b89327' },
    background: { default: '#fafaf9', paper: '#ffffff' },
    text: { primary: '#1e293b', secondary: '#64748b' }
  },
  typography: {
    fontFamily: '"Inter", "Outfit", "Roboto", sans-serif',
    h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    button: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 }
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 24, padding: '10px 24px', boxShadow: 'none' },
        containedPrimary: {
          background: 'linear-gradient(135deg, #006233, #004d28)',
          boxShadow: '0 4px 15px rgba(0, 77, 40, 0.2)',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(0, 77, 40, 0.3)' }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' }
      }
    }
  },
});

const PageLoader = () => (
  <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <CircularProgress sx={{ color: '#006233' }} />
  </Box>
);

const PublicLayout = () => (
  <div className="public-container">
    <Navbar />
    <main style={{ minHeight: '80vh' }}>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
    <ChatBot />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <ToastProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/"             element={<Home />} />
                  <Route path="/about"        element={<About />} />
                  <Route path="/services"     element={<Services />} />
                  <Route path="/projects"     element={<Projects />} />
                  <Route path="/equipment"    element={<EquipmentPublic />} />
                  <Route path="/contact"      element={<Contact />} />
                  <Route path="/ai-assistant" element={<AIAssistantPage />} />
                  <Route path="/admin/login"  element={<AdminLogin />} />
                </Route>

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard"  element={<Dashboard />} />
                    <Route path="/admin/workers"    element={<Workers />} />
                    <Route path="/admin/payroll"    element={<Payroll />} />
                    <Route path="/admin/projects"   element={<ProjectsList />} />
                    <Route path="/admin/equipment"  element={<Equipment />} />
                    <Route path="/admin/tracking"   element={<Tracking />} />
                    <Route path="/admin/accounting" element={<Accounting />} />
                  </Route>
                </Route>
              </Routes>
            </Router>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
