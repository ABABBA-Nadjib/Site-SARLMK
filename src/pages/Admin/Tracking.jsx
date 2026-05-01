import React, { useState } from 'react';
import { MapPin, CheckCircle, XCircle, Clock, RefreshCw, AlertTriangle, FileText } from 'lucide-react';

const Tracking = () => {
  const [lastUpdate] = useState('15:34:02');

  const statusData = [
    { id: 1, worker: 'Mohamed Benali',    initials: 'MB', project: 'Route Hassi Messaoud',            status: 'On-Site',  lastSeen: 'Il y a 3 min',  role: 'Ingénieur de Chantier' },
    { id: 2, worker: 'Ahmed Boulahoual', initials: 'AB', project: 'Pipeline Adrar',                   status: 'On-Site',  lastSeen: 'Il y a 8 min',  role: 'Inspecteur Sécurité' },
    { id: 3, worker: 'Yacine Khelifi',   initials: 'YK', project: 'Développement Urbain — Touggourt', status: 'Off-Site', lastSeen: 'Il y a 2h 15min',role: 'Conducteur Grue' },
    { id: 4, worker: 'Sofiane Meziane',  initials: 'SM', project: 'Facility Pétrolière — Ouargla',   status: 'On-Site',  lastSeen: 'Il y a 1 min',  role: 'Chef de Chantier' },
    { id: 5, worker: 'Abdelkader Touati',initials: 'AT', project: 'Route Hassi Messaoud',            status: 'Break',    lastSeen: 'Il y a 18 min', role: 'Électricien' },
    { id: 6, worker: 'Mustapha Rahmani', initials: 'MR', project: 'Route El Oued',                   status: 'On-Site',  lastSeen: 'Il y a 5 min',  role: 'Ouvrier Qualifié' },
    { id: 7, worker: 'Ali Cherif',       initials: 'AC', project: 'Route de Désenclavement — El Meniaa', status: 'On-Site', lastSeen: 'Il y a 11 min', role: 'Technicien Hydraulique' },
    { id: 8, worker: 'Karim Boudjemaa', initials: 'KB', project: 'Pipeline Adrar',                   status: 'Off-Site', lastSeen: 'Il y a 3h 40min',role: 'Opérateur Bulldozer' },
  ];

  const siteDistribution = [
    { name: 'Route Hassi Messaoud',             count: 98, pct: 38, color: '#006233' },
    { name: 'Pipeline Adrar',                   count: 74, pct: 28, color: '#3b82f6' },
    { name: 'Développement Urbain — Touggourt', count: 56, pct: 22, color: '#f59e0b' },
    { name: 'Facility Pétrolière — Ouargla',    count: 43, pct: 16, color: '#8b5cf6' },
    { name: 'Route El Oued',                    count: 31, pct: 12, color: '#d21034' },
    { name: 'Route El Meniaa',                  count: 22, pct: 8,  color: '#ec4899' },
  ];

  const getStatusStyle = (status) => {
    if (status === 'On-Site')  return { color: '#006233', bg: '#dcfce7', icon: <CheckCircle size={18} />, label: 'Sur Chantier' };
    if (status === 'Break')    return { color: '#a16207', bg: '#fef9c3', icon: <Clock size={18} />,       label: 'En Pause' };
    return                            { color: '#d21034', bg: '#fee2e2', icon: <XCircle size={18} />,     label: 'Hors Site' };
  };

  const onSiteCount  = statusData.filter(s => s.status === 'On-Site').length;
  const offSiteCount = statusData.filter(s => s.status === 'Off-Site').length;
  const breakCount   = statusData.filter(s => s.status === 'Break').length;

  return (
    <div className="animate-fade" style={{ padding: '2.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Suivi des Chantiers en Temps Réel</h1>
          <p style={{ color: 'var(--text-light)' }}>Présence et localisation du personnel sur les sites actifs en Algérie.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.875rem', backgroundColor: 'var(--bg-subtle)', padding: '0.625rem 1rem', borderRadius: 'var(--radius-md)' }}>
          <RefreshCw size={15} />
          Mis à jour : {lastUpdate}
        </div>
      </header>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Sur Chantier', count: onSiteCount,  color: '#006233', bg: '#dcfce7', icon: <CheckCircle size={24} /> },
          { label: 'En Pause',     count: breakCount,   color: '#a16207', bg: '#fef9c3', icon: <Clock size={24} /> },
          { label: 'Hors Site',    count: offSiteCount, color: '#d21034', bg: '#fee2e2', icon: <XCircle size={24} /> },
        ].map((s, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ backgroundColor: s.bg, color: s.color, padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              {s.icon}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800 }}>{s.count}</h3>
              <p style={{ margin: 0, color: 'var(--text-light)', fontWeight: 600, fontSize: '0.875rem' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem' }}>
        {/* Tracking List */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>État en Temps Réel du Personnel</h3>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={14} /> Actualisation automatique chaque minute
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {statusData.map((item) => {
              const st = getStatusStyle(item.status);
              return (
                <div key={item.id} style={{ 
                  padding: '1.25rem 1.5rem', 
                  borderBottom: '1px solid var(--border)', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  backgroundColor: item.status === 'Off-Site' ? 'rgba(210,16,52,0.02)' : 'transparent'
                }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ 
                      width: '46px', height: '46px', borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #006233, #3b82f6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 800, fontSize: '0.8125rem', flexShrink: 0
                    }}>
                      {item.initials}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700 }}>{item.worker}</h4>
                      <p style={{ margin: '0.2rem 0 0', fontSize: '0.8125rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={12} /> {item.project}
                      </p>
                      <p style={{ margin: '0.1rem 0 0', fontSize: '0.75rem', color: 'var(--text-light)', fontStyle: 'italic' }}>{item.role}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      color: st.color, fontWeight: 700, marginBottom: '0.25rem',
                      fontSize: '0.875rem'
                    }}>
                      {st.icon} {st.label}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Dernière activité : {item.lastSeen}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Site Distribution */}
          <div className="card">
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Répartition par Chantier</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {siteDistribution.map((p, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8125rem' }}>
                    <span style={{ fontWeight: 600 }}>{p.name}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-light)' }}>{p.count}</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${p.pct}%`, height: '100%', backgroundColor: p.color, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Reports */}
          <div className="card">
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Rapports Journaliers</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { site: 'Route Hassi Messaoud', engineer: 'M. Benali', time: '08:12' },
                { site: 'Pipeline Adrar',        engineer: 'A. Boulahoual', time: '08:45' },
                { site: 'Facility Ouargla',      engineer: 'S. Meziane', time: '09:05' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                  <FileText size={18} color="#006233" />
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem' }}>{r.site}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-light)' }}>Ing. {r.engineer} — {r.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert */}
          <div className="card" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <AlertTriangle size={20} color="#f59e0b" />
              <h4 style={{ color: 'white', margin: 0 }}>Alerte Système</h4>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              ⚠️ 2 ouvriers ont quitté le chantier <strong>"Route Hassi Messaoud"</strong> 45 min avant la fin du quart de travail.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
