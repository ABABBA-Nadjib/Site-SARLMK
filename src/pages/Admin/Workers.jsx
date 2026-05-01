import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  UserPlus, 
  Filter, 
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';

const Workers = () => {
  const [workers, setWorkers] = useState([
    { 
      id: 1, 
      name: 'Mohamed Benali', 
      role: 'Ingénieur de Chantier', 
      experience: '9 Ans', 
      project: 'Route Hassi Messaoud', 
      status: 'On-Site',
      performance: 96,
      avatar: 'MB'
    },
    { 
      id: 2, 
      name: 'Ahmed Boulahoual', 
      role: 'Inspecteur Sécurité', 
      experience: '6 Ans', 
      project: 'Pipeline Adrar', 
      status: 'On-Site',
      performance: 89,
      avatar: 'AB'
    },
    { 
      id: 3, 
      name: 'Yacine Khelifi', 
      role: 'Conducteur Grue', 
      experience: '11 Ans', 
      project: 'Urbain Touggourt', 
      status: 'Off-Site',
      performance: 92,
      avatar: 'YK'
    },
    { 
      id: 4, 
      name: 'Sofiane Meziane', 
      role: 'Chef de Chantier', 
      experience: '14 Ans', 
      project: 'Facility Ouargla', 
      status: 'On-Site',
      performance: 98,
      avatar: 'SM'
    },
    { 
      id: 5, 
      name: 'Abdelkader Touati', 
      role: 'Électricien', 
      experience: '5 Ans', 
      project: 'Route Hassi Messaoud', 
      status: 'Sick Leave',
      performance: 83,
      avatar: 'AT'
    },
    { 
      id: 6, 
      name: 'Rachid Hamidi', 
      role: 'Opérateur Bulldozer', 
      experience: '8 Ans', 
      project: 'Pipeline Adrar', 
      status: 'On-Site',
      performance: 91,
      avatar: 'RH'
    },
    { 
      id: 7, 
      name: 'Nabil Zeroual', 
      role: 'Géomètre Topographe', 
      experience: '7 Ans', 
      project: 'Urbain Touggourt', 
      status: 'On-Site',
      performance: 87,
      avatar: 'NZ'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-fade" style={{ padding: '2.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Gestion du Personnel</h1>
          <p style={{ color: 'var(--text-light)' }}>Superviser et déployer le personnel technique sur tous les chantiers actifs.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '0.875rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
          <UserPlus size={20} />
          Ajouter un Employé
        </button>
      </header>

      {/* Filters & Actions */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem',
        gap: '1rem' 
      }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search 
            size={18} 
            color="var(--text-light)" 
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input 
            type="text" 
            placeholder="Rechercher par nom, rôle ou chantier..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 2.5rem', 
              borderRadius: 'var(--radius-sm)', 
              border: '1px solid var(--border)',
              fontSize: '0.875rem',
              backgroundColor: 'white'
            }} 
          />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" style={{ padding: '0.75rem' }}>
            <Filter size={18} />
          </button>
          <button className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Workforce Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.05em' }}>Nom Complet</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.05em' }}>Rôle & Expérience</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.05em' }}>Chantier Assigné</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.05em' }}>Statut</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.05em' }}>Performance</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.05em' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase())).map((worker) => (
              <tr key={worker.id} style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #006233, #3b82f6)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                    }}>
                      {worker.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{worker.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>ID: #SM-{1000 + worker.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{worker.role}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{worker.experience} d'Expérience</div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.375rem 0.75rem', 
                    backgroundColor: '#f1f5f9', 
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem',
                    fontWeight: 500
                  }}>
                    {worker.project}
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      backgroundColor: worker.status === 'On-Site' ? '#10b981' : worker.status === 'Sick Leave' ? '#ef4444' : '#94a3b8' 
                    }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      {worker.status === 'On-Site' ? 'Sur Chantier' : worker.status === 'Off-Site' ? 'Hors Site' : 'Congé Maladie'}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1, width: '100px', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px' }}>
                      <div style={{ width: `${worker.performance}%`, height: '100%', backgroundColor: worker.performance > 90 ? '#006233' : '#f59e0b', borderRadius: '3px' }} />
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700 }}>{worker.performance}%</span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', color: '#ef4444' }}>
                      <Trash2 size={16} />
                    </button>
                    <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem' }}>
        <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.5rem' }}>268</h4>
            <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.875rem' }}>Sur Chantier Actuellement</p>
          </div>
        </div>
        <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#fef9c3', color: '#a16207', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <Clock size={32} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.5rem' }}>38</h4>
            <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.875rem' }}>En Congé Planifié</p>
          </div>
        </div>
        <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <AlertTriangle size={32} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.5rem' }}>18</h4>
            <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.875rem' }}>Pointages Manquants</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workers;
