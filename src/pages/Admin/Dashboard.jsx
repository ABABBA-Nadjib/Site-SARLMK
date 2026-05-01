import React from 'react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  AlertCircle,
  HardHat
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const stats = [
    { label: 'Total Workforce', value: '324', change: '+8%', trend: 'up', icon: Users, color: '#006233' },
    { label: 'Active Projects', value: '12', change: '+2', trend: 'up', icon: Briefcase, color: '#3b82f6' },
    { label: 'Monthly Revenue', value: '18.4M DZD', change: '+11.2%', trend: 'up', icon: TrendingUp, color: '#f59e0b' },
    { label: 'Opex Ratio', value: '38%', change: '-3.1%', trend: 'down', icon: Activity, color: '#d21034' },
  ];

  const chartData = [
    { name: 'Jan', revenue: 12500000, expenses: 7200000 },
    { name: 'Feb', revenue: 14800000, expenses: 8100000 },
    { name: 'Mar', revenue: 13200000, expenses: 8900000 },
    { name: 'Apr', revenue: 16500000, expenses: 9200000 },
    { name: 'Mai', revenue: 15900000, expenses: 9800000 },
    { name: 'Jun', revenue: 18400000, expenses: 10500000 },
  ];

  const projectDistribution = [
    { label: 'Road Infrastructure', val: 5, max: 8, color: '#006233' },
    { label: 'Civil Works (BTP)', val: 4, max: 6, color: '#3b82f6' },
    { label: 'Oil & Gas Support', val: 2, max: 4, color: '#f59e0b' },
    { label: 'Urban Development', val: 1, max: 3, color: '#d21034' },
  ];

  return (
    <div className="animate-fade" style={{ padding: '2.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Tableau de Bord — Vue Générale</h1>
          <p style={{ color: 'var(--text-light)' }}>
            Bienvenue, Admin. Voici la performance opérationnelle de <strong>SARL STE FI S MAKDOUD ENTREPRENEUR</strong> aujourd'hui.
          </p>
        </div>
        <button className="btn btn-primary">
          Générer Rapport Q2
        </button>
      </header>

      {/* Stats Grid */}
      <div className="dashboard-grid" style={{ marginBottom: '2.5rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="card" style={{ border: 'none', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ 
                backgroundColor: stat.color + '15', 
                color: stat.color, 
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                <stat.icon size={24} />
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.25rem',
                color: stat.trend === 'up' ? '#10b981' : '#ef4444',
                fontSize: '0.875rem',
                fontWeight: 700,
                backgroundColor: stat.trend === 'up' ? '#dcfce7' : '#fee2e2',
                padding: '0.25rem 0.5rem',
                borderRadius: '999px'
              }}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <h3 style={{ fontSize: '1.875rem', margin: 0, fontWeight: 800 }}>{stat.value}</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9375rem', marginTop: '0.25rem', fontWeight: 500 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Revenus vs Charges Opérationnelles (DZD)</h3>
            <select style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.875rem' }}>
              <option>6 Derniers Mois</option>
              <option>Dernière Année</option>
            </select>
          </div>
          <div style={{ height: '350px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006233" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#006233" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dx={-10} tickFormatter={v => (v/1000000).toFixed(1)+'M'} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)', padding: '1rem' }}
                  formatter={(value) => [`${(value/1000000).toFixed(2)}M DZD`]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#006233" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" name="Revenus" />
                <Area type="monotone" dataKey="expenses" stroke="#d21034" strokeWidth={3} fillOpacity={0} name="Charges" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Répartition des Projets</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {projectDistribution.map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
                  <span style={{ color: 'var(--text-light)', fontWeight: 700 }}>{item.val} / {item.max}</span>
                </div>
                <div style={{ height: '10px', backgroundColor: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${(item.val / item.max) * 100}%`, 
                    height: '100%', 
                    backgroundColor: item.color,
                    borderRadius: '5px' 
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            marginTop: '3rem', 
            padding: '1.25rem', 
            backgroundColor: '#fef2f2', 
            borderRadius: 'var(--radius-md)', 
            display: 'flex', 
            gap: '1rem',
            border: '1px solid #fee2e2'
          }}>
            <AlertCircle color="#ef4444" size={24} />
            <div>
              <h4 style={{ color: '#991b1b', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>Alerte Équipement</h4>
              <p style={{ color: '#b91c1c', fontSize: '0.8125rem', margin: 0 }}>Excavatrice CAT-320 sur le chantier de Hassi Messaoud — maintenance hydraulique urgente requise.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Activité Récente</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { text: 'Rapport journalier soumis — Chantier Route Hassi Messaoud', time: 'Il y a 2h', color: '#006233' },
            { text: 'Nouveau travailleur ajouté : Yacine Khelifi (Chef de chantier)', time: 'Il y a 4h', color: '#3b82f6' },
            { text: 'Facture #INV-0042 payée — Sonatrach Contrat Pipeline Adrar', time: 'Hier', color: '#f59e0b' },
            { text: 'Commande matériaux : 80T acier HA — Touggourt Urbain', time: 'Hier', color: '#d21034' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: '0.9375rem' }}>{item.text}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
