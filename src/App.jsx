import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import AdminLayout from './components/Layout/AdminLayout';

// Public Pages
import Home from './pages/Public/Home';
import Projects from './pages/Public/Projects';
import About from './pages/Public/About';
import EquipmentPublic from './pages/Public/Equipment';
import Contact from './pages/Public/Contact';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/AdminLogin';
import Workers from './pages/Admin/Workers';

import Tracking from './pages/Admin/Tracking';
import Accounting from './pages/Admin/Accounting';
import Payroll from './pages/Admin/Payroll';
import Equipment from './pages/Admin/Equipment';

import ProjectsList from './pages/Admin/Projects';

const PublicLayout = () => (
  <div className="public-container">
    <Navbar />
    <main style={{ minHeight: '80vh' }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/equipment" element={<EquipmentPublic />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/workers" element={<Workers />} />
          <Route path="/admin/payroll" element={<Payroll />} />
          <Route path="/admin/projects" element={<ProjectsList />} />
          <Route path="/admin/equipment" element={<Equipment />} />
          <Route path="/admin/tracking" element={<Tracking />} />
          <Route path="/admin/accounting" element={<Accounting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
