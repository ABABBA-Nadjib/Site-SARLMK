import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import AdminLayout from './components/Layout/AdminLayout';
import ChatBot from './components/ChatBot';

// Admin Pages (static - keep auth fast)
import AdminLogin   from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
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
      {/* ThemeContextProvider builds the MUI theme and passes it via render-prop */}
      <ThemeContextProvider>
        {(theme) => (
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
                        <Route path="/admin/dashboard"  element={<AdminDashboard />} />
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
        )}
      </ThemeContextProvider>
    </HelmetProvider>
  );
}

export default App;
