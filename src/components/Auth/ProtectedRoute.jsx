import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Wraps admin routes. Redirects to /admin/login if no authenticated user.
 * Usage in App.jsx:  <Route element={<ProtectedRoute />}> ... </Route>
 */
const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
