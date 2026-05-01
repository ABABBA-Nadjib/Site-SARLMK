import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HardHat, ArrowRight, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil',    path: '/' },
    { name: 'Projets',    path: '/projects' },
    { name: 'Équipements',path: '/equipment' },
    { name: 'À Propos',   path: '/about' },
    { name: 'Contact',    path: '/contact' },
  ];

  return (
    <nav className="glass" style={{ 
      color: 'var(--primary)', 
      padding: '0.875rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{ backgroundColor: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HardHat size={22} color="white" />
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary)' }}>STE FI S MAKDOUD</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>ENTREPRENEUR · BTP · Est. 1996</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              style={{ 
                fontWeight: 600, 
                fontSize: '0.9375rem',
                color: location.pathname === link.path ? 'var(--accent)' : 'var(--text)',
                position: 'relative',
                textDecoration: 'none'
              }}
            >
              {link.name}
              {location.pathname === link.path && (
                <div style={{ 
                  position: 'absolute', 
                  bottom: '-4px', 
                  left: 0, 
                  width: '100%', 
                  height: '2px', 
                  backgroundColor: 'var(--accent)',
                  borderRadius: '2px'
                }} />
              )}
            </Link>
          ))}

          {/* Admin Portal Button */}
          <Link to="/admin/login" className="btn btn-primary" style={{ padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Portail ERP
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Toggle (visual only) */}
        <button 
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Algerian identity sub-bar */}
      <div style={{ height: '3px', background: 'linear-gradient(to right, #006233 50%, white 50%, white 55%, #d21034 55%)', opacity: 0.7 }} />
    </nav>
  );
};

export default Navbar;
