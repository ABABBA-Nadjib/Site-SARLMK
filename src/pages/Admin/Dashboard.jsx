import React from 'react';
import { Users, Layers, Truck, TrendingUp, TrendingDown, AlertTriangle, ArrowRight, LogOut } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const chartData = [
  { month: 'Nov', revenus: 18.4, depenses: 9.2 },
  { month: 'Dec', revenus: 22.1, depenses: 11.8 },
  { month: 'Jan', revenus: 19.7, depenses: 10.5 },
  { month: 'Feb', revenus: 25.3, depenses: 13.1 },
  { month: 'Mar', revenus: 21.8, depenses: 12.4 },
  { month: 'Avr', revenus: 28.6, depenses: 14.2 },
];

export default function Dashboard() {
  const { data: workers,   loading: wLoad } = useFirestore('workers');
  const { data: projects,  loading: pLoad } = useFirestore('projects');
  const { data: equipment, loading: eLoad } = useFirestore('equipment');
  const { user, logout } = useAuth();

  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const activeWorkers  = workers.filter(w  => w.status === 'Active').length;
  const operationalEq  = equipment.filter(e => e.status === 'Operational').length;
  const maintenanceEq  = equipment.filter(e => e.status === 'Maintenance').length;

  const loading = wLoad || pLoad || eLoad;

  const stats = [
    { label: 'Employes Actifs',    value: loading ? '…' : activeWorkers,  total: `/${workers.length}`,   color: '#006233',      icon: Users,   path: '/admin/workers' },
    { label: 'Projets en Cours',   value: loading ? '…' : activeProjects,  total: `/${projects.length}`, color: '#3b82f6',      icon: Layers,  path: '/admin/projects' },
    { label: 'Engins Operationnels',value: loading ? '…' : operationalEq, total: `/${equipment.length}`, color: 'var(--accent)',icon: Truck,   path: '/admin/equipment' },
    { label: 'En Maintenance',     value: loading ? '…' : maintenanceEq,  total: ` engins`,              color: '#d21034',      icon: AlertTriangle, path: '/admin/equipment' },
  ];

  return (
    <div className="animate-fade" style={{ padding: '2.5rem' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Tableau de Bord</h1>
          <p style={{ color: 'var(--text-light)' }}>Vue d'ensemble de l'activité</p>
        </div>
        <button onClick={logout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d21034', borderColor: '#d21034' }}>
          <LogOut size={18} /> Deconnexion
        </button>
      </header>

      {/* KPI Cards */}
      <div className="dashboard-grid" style={{ marginBottom: '2.5rem' }}>
        {stats.map((s, i) => (
          <Link key={i} to={s.path} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e  => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ backgroundColor: s.color + '15', color: s.color, padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <s.icon size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1.875rem', fontWeight: 800 }}>
                  {s.value}<span style={{ fontSize: '1rem', color: 'var(--text-light)', fontWeight: 500 }}>{s.total}</span>
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)', fontWeight: 600 }}>{s.label}</p>
              </div>
              <ArrowRight size={18} color="var(--text-light)" />
            </div>
          </Link>
        ))}
      </div>

      {/* Charts + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Revenue Chart */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Flux de Tresorerie (M DZD)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} barSize={18} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`} />
              <Tooltip formatter={(v) => [`${v} M DZD`]} />
              <Bar dataKey="revenus"  name="Revenus"  fill="#006233" radius={[4,4,0,0]} />
              <Bar dataKey="depenses" name="Depenses" fill="#d21034" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Site Distribution */}
          <div className="card" style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>Distribution par Chantier</h3>
            {loading ? <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Chargement...</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {['Route Hassi Messaoud', 'Pipeline Adrar', 'Developpement Urbain Touggourt', 'Facility Petroliere Ouargla'].map((site, i) => {
                  const count = workers.filter(w => w.site?.includes(site.split(' ')[0]) || w.site === site).length;
                  const pct   = workers.length > 0 ? Math.round((count / workers.length) * 100) : 0;
                  const colors = ['#006233','#3b82f6','#f59e0b','#8b5cf6'];
                  return (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', fontSize: '0.8125rem' }}>
                        <span style={{ fontWeight: 600 }}>{site}</span>
                        <span style={{ color: 'var(--text-light)' }}>{count}</span>
                      </div>
                      <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '3px' }}>
                        <div style={{ width: `${pct}%`, height: '100%', backgroundColor: colors[i], borderRadius: '3px' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Alert */}
          {maintenanceEq > 0 && (
            <div className="card" style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <AlertTriangle size={20} color="#f59e0b" />
                <h4 style={{ margin: 0, color: '#92400e' }}>Alerte Materiel</h4>
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#92400e', lineHeight: 1.6 }}>
                {maintenanceEq} engin(s) en maintenance. Verifiez le parc.
              </p>
              <Link to="/admin/equipment" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem', fontSize: '0.8125rem', fontWeight: 700, color: '#f59e0b', textDecoration: 'none' }}>
                Voir le parc <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recent Workers + Projects Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>Derniers Employes Ajoutes</h3>
            <Link to="/admin/workers" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}>Voir tous</Link>
          </div>
          {loading ? <p style={{ padding: '1.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>Chargement...</p> : (
            workers.slice(0, 5).map(w => (
              <div key={w.id} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#006233,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                  {w.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem' }}>{w.name}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-light)' }}>{w.role}</p>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: w.status==='Active'?'#006233':'#f59e0b' }}>{w.status}</span>
              </div>
            ))
          )}
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>Projets en Cours</h3>
            <Link to="/admin/projects" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}>Voir tous</Link>
          </div>
          {loading ? <p style={{ padding: '1.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>Chargement...</p> : (
            projects.filter(p=>p.status==='Active').slice(0, 5).map(p => (
              <div key={p.id} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem' }}>{p.name}</p>
                  <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--accent)' }}>{p.progress||0}%</span>
                </div>
                <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '3px' }}>
                  <div style={{ width: `${p.progress||0}%`, height: '100%', backgroundColor: '#006233', borderRadius: '3px' }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
