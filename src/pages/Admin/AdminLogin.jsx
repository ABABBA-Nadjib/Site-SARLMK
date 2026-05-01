import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, HardHat } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, this would call Firebase
    if (email === 'admin@binaatech.com' && password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials. Use admin@binaatech.com / admin123');
    }
  };

  return (
    <div className="animate-fade" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="card" style={{ 
        width: '100%', 
        maxWidth: '450px', 
        padding: '3rem',
        boxShadow: 'var(--shadow-lg)',
        border: 'none'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            backgroundColor: 'var(--primary)', 
            width: '64px', 
            height: '64px', 
            borderRadius: 'var(--radius-md)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <HardHat size={32} color="var(--secondary)" />
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Partner Portal</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9375rem' }}>Secure access for BinaaTech administrators.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Professional Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-light)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@binaatech.com" 
                style={{ 
                  width: '100%', 
                  padding: '0.875rem 1rem 0.875rem 3rem', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--border)', 
                  outline: 'none',
                  fontSize: '0.9375rem'
                }} 
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Password</label>
              <Link to="#" style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>Forgot Access?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-light)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                style={{ 
                  width: '100%', 
                  padding: '0.875rem 1rem 0.875rem 3rem', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--border)', 
                  outline: 'none',
                  fontSize: '0.9375rem'
                }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input type="checkbox" id="remember" style={{ cursor: 'pointer' }} />
            <label htmlFor="remember" style={{ fontSize: '0.875rem', color: 'var(--text-light)', cursor: 'pointer' }}>Remember this device</label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem', fontWeight: 700 }}>
            <ShieldCheck size={20} />
            Authorize Login
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-light)' }}>
          By accessing the portal, you agree to our <br />
          <Link to="#" style={{ fontWeight: 600, color: 'var(--primary)' }}>Internal Security Guidelines</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
