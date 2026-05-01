import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
