import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  Truck, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: TrendingUp },
    { name: 'Workforce', path: '/admin/workers', icon: Users },
    { name: 'Payroll', path: '/admin/payroll', icon: DollarSign },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Fleet', path: '/admin/equipment', icon: Truck },
    { name: 'Site Tracking', path: '/admin/tracking', icon: MapPin },
    { name: 'Accounting', path: '/admin/accounting', icon: DollarSign },
  ];

  return (
    <div style={{ 
      width: '280px', 
      backgroundColor: 'var(--primary)', 
      color: 'white', 
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        marginBottom: '3rem',
        padding: '0 0.75rem' 
      }}>
        <div style={{ backgroundColor: 'var(--accent)', padding: '0.625rem', borderRadius: 'var(--radius-sm)' }}>
          <ShieldCheck size={24} color="white" />
        </div>
        <div>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>BinaaTech</h2>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Enterprise ERP</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.875rem 1rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <item.icon size={20} />
                <span>{item.name}</span>
              </div>
              {isActive && <div style={{ width: '4px', height: '16px', backgroundColor: 'var(--accent)', borderRadius: '2px' }} />}
            </Link>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
        <button style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.875rem 1rem',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'transparent',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'left'
        }}>
          <Settings size={20} />
          <span>System Settings</span>
        </button>
        <button style={{
          marginTop: '0.5rem',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.875rem 1rem',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: '#fca5a5',
          textAlign: 'left'
        }}>
          <LogOut size={20} />
          <span>Logout Session</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
