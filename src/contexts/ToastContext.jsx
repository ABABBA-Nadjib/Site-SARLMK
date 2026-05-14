import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error:   (msg) => addToast(msg, 'error'),
    warning: (msg) => addToast(msg, 'warning'),
  };

  const icons = {
    success: <CheckCircle size={20} />,
    error:   <XCircle size={20} />,
    warning: <AlertTriangle size={20} />,
  };

  const colors = {
    success: { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d' },
    error:   { bg: '#fff1f2', border: '#fecdd3', color: '#be123c' },
    warning: { bg: '#fffbeb', border: '#fde68a', color: '#92400e' },
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast Container */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        {toasts.map(t => {
          const c = colors[t.type];
          return (
            <div key={t.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              backgroundColor: c.bg,
              border: `1px solid ${c.border}`,
              borderRadius: '12px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              color: c.color,
              fontWeight: 600,
              fontSize: '0.9375rem',
              minWidth: '280px',
              maxWidth: '420px',
              animation: 'slideInRight 0.3s ease',
            }}>
              {icons[t.type]}
              <span style={{ flex: 1 }}>{t.message}</span>
              <button onClick={() => removeToast(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.color, opacity: 0.6, padding: 0 }}>
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
};
