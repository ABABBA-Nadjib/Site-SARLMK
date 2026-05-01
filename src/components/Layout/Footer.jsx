import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, Mail, Phone, MapPin, Printer } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--primary)', 
      padding: '6rem 0 2rem',
      color: 'white',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '4rem'
        }}>
          {/* Company Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.25rem', color: 'white', marginBottom: '1.5rem', textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                <HardHat size={24} color="var(--primary)" />
              </div>
              <span style={{ lineHeight: 1.2 }}>
                SARL STE FI S<br />
                <span style={{ color: 'var(--accent)', fontSize: '1rem' }}>MAKDOUD ENTREPRENEUR</span>
              </span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.9375rem' }}>
              Entreprise de travaux publics et de construction (BTP) fondée en 1996, basée à Touggourt. 
              Opérant dans plusieurs wilayas du sud algérien en collaboration avec les grandes entreprises nationales.
            </p>
            {/* DZ Flag accent bar */}
            <div style={{ display: 'flex', gap: '0', height: '4px', width: '80px', borderRadius: '2px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1, backgroundColor: '#006233' }} />
              <div style={{ flex: 1, backgroundColor: 'white' }} />
              <div style={{ width: '12px', backgroundColor: '#d21034' }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem' }}>Fondée en 1996 · Touggourt, Algérie 🇩🇿</p>
          </div>

          {/* Services Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.125rem', marginBottom: '1.5rem' }}>Nos Activités</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem', color: 'rgba(255,255,255,0.6)' }}>
              {[
                'Construction de Routes',
                'Génie Civil & BTP',
                'Services Pétrole & Gaz',
                'Développement Urbain',
                'Grands Projets Nationaux',
              ].map((item, i) => (
                <li key={i}>
                  <Link to="/projects" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    <span style={{ color: '#006233', fontWeight: 700 }}>›</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.125rem', marginBottom: '1.5rem' }}>La Société</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem', color: 'rgba(255,255,255,0.6)' }}>
              {[
                { label: 'À Propos',         path: '/about' },
                { label: 'Nos Projets',      path: '/projects' },
                { label: 'Équipements',      path: '/equipment' },
                { label: 'Nous Contacter',   path: '/contact' },
                { label: 'Portail Admin ERP', path: '/admin/login' },
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.path} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    <span style={{ color: '#006233', fontWeight: 700 }}>›</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.125rem', marginBottom: '1.5rem' }}>Contact</h4>
            <div style={{ display: 'grid', gap: '1.25rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Cité Ayad, Teyissebsa<br />Touggourt, Algérie</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone size={20} color="var(--accent)" />
                <span>+213 795 101 097</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Printer size={20} color="var(--accent)" />
                <span>Fax : 32105556</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Mail size={20} color="var(--accent)" />
                <span>Fils-Makdoud@gmail.com</span>
              </div>
            </div>

            {/* Zones card */}
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Zones d'Intervention</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Touggourt', 'Hassi Messaoud', 'Ouargla', 'Adrar', 'El Oued', 'El Meniaa'].map((z, i) => (
                  <span key={i} style={{ fontSize: '0.75rem', padding: '0.25rem 0.625rem', backgroundColor: 'rgba(0,98,51,0.3)', borderRadius: '999px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{z}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          marginTop: '5rem', 
          textAlign: 'center', 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '2.5rem',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.875rem'
        }}>
          © {new Date().getFullYear()} <strong style={{ color: 'rgba(255,255,255,0.6)' }}>SARL STE FI S MAKDOUD ENTREPRENEUR</strong> — Tous droits réservés.
          <span style={{ margin: '0 1rem' }}>|</span>
          Directeur : Saïd Makdoud
          <span style={{ margin: '0 1rem' }}>|</span>
          Touggourt, Algérie 🇩🇿
        </div>
      </div>
    </footer>
  );
};

export default Footer;
