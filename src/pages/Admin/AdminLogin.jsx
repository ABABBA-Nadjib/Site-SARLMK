import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, HardHat, AlertCircle, Loader } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin = () => {
  const { setUser } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Fallback local pour le développement si Firebase n'est pas configuré
    // ou pour tester avec des identifiants par défaut
    if (email.trim() === 'admin@makdoud-btp.dz' && password.trim() === 'admin123') {
      setTimeout(() => {
        setUser({ uid: 'mock-admin', email: email.trim(), displayName: 'Admin Makdoud' });
        setLoading(false);
        navigate('/admin/dashboard');
      }, 800);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Erreur Firebase:", err);
      setError('Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(0,18,8,0.03) 0%, rgba(0,98,51,0.05) 100%)'
    }}>
      <div className="card" style={{ 
        width: '100%', 
        maxWidth: '450px', 
        padding: '3rem',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(0,98,51,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            backgroundColor: 'var(--primary)', 
            width: '70px', height: '70px', 
            borderRadius: 'var(--radius-md)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <HardHat size={34} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Portail ERP</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9375rem' }}>
            Accès sécurisé — SARL STE FI S MAKDOUD
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '1rem', backgroundColor: '#fff1f2', 
            border: '1px solid #fecdd3', borderRadius: 'var(--radius-md)',
            color: '#be123c', fontSize: '0.875rem', fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1.5rem' }}>
          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Adresse Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-light)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@makdoud-btp.dz" 
                style={{ 
                  width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', 
                  borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', 
                  outline: 'none', fontSize: '0.9375rem', boxSizing: 'border-box'
                }} 
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Mot de Passe
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-light)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                style={{ 
                  width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', 
                  borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', 
                  outline: 'none', fontSize: '0.9375rem', boxSizing: 'border-box'
                }} 
              />
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ padding: '1rem', fontSize: '1rem', fontWeight: 700, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? <Loader size={20} className="spin" /> : <ShieldCheck size={20} />}
            {loading ? 'Connexion en cours...' : 'Se Connecter'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-light)' }}>
          Accès réservé aux administrateurs autorisés.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
