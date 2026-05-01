import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Users, 
  Layers, 
  CheckCircle2, 
  Clock,
  MoreVertical
} from 'lucide-react';

const ProjectsList = () => {
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: 'Construction Route — Hassi Messaoud', 
      location: 'Hassi Messaoud, Ouargla', 
      manager: 'Ing. Mohamed Benali', 
      progress: 72, 
      status: 'Active', 
      teamSize: 98,
      deadline: 'Déc 2026',
      budget: '45 000 000 DZD'
    },
    { 
      id: 2, 
      name: 'Infrastructure Pipeline — Adrar', 
      location: 'Adrar, Algérie', 
      manager: 'Ing. Sofiane Meziane', 
      progress: 100, 
      status: 'Completed', 
      teamSize: 74,
      deadline: 'Terminé',
      budget: '62 000 000 DZD'
    },
    { 
      id: 3, 
      name: 'Développement Urbain — Touggourt', 
      location: 'Touggourt, Algérie', 
      manager: 'Ing. Yacine Khelifi', 
      progress: 38, 
      status: 'Active', 
      teamSize: 56,
      deadline: 'Mar 2027',
      budget: '28 500 000 DZD'
    },
    { 
      id: 4, 
      name: 'Travaux Facility Pétrolière — Ouargla', 
      location: 'Ouargla, Algérie', 
      manager: 'Ing. Ahmed Boulahoual', 
      progress: 55, 
      status: 'Active', 
      teamSize: 43,
      deadline: 'Jun 2027',
      budget: '38 000 000 DZD'
    },
    { 
      id: 5, 
      name: 'Route de Désenclavement — El Meniaa', 
      location: 'El Meniaa, Algérie', 
      manager: 'Ing. Rachid Hamidi', 
      progress: 0, 
      status: 'Planning', 
      teamSize: 14,
      deadline: 'Oct 2027',
      budget: '19 000 000 DZD'
    },
    { 
      id: 6, 
      name: 'Infrastructure Routière — El Oued', 
      location: 'El Oued, Algérie', 
      manager: 'Ing. Nabil Zeroual', 
      progress: 18, 
      status: 'Active', 
      teamSize: 31,
      deadline: 'Fév 2027',
      budget: '22 000 000 DZD'
    },
  ]);

  return (
    <div className="animate-fade" style={{ padding: '2.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Gestion des Projets</h1>
          <p style={{ color: 'var(--text-light)' }}>Suivre l'avancement, les ressources et les délais de tous les chantiers actifs.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '0.875rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
          <Plus size={20} />
          Nouveau Projet
        </button>
      </header>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'En Cours', count: 4, color: '#3b82f6', icon: Clock },
          { label: 'Terminés', count: 1, color: '#006233', icon: CheckCircle2 },
          { label: 'En Planification', count: 1, color: '#f59e0b', icon: Layers },
          { label: 'En Attente', count: 0, color: '#ef4444', icon: CheckCircle2 },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
            <div style={{ backgroundColor: stat.color + '15', color: stat.color, padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <stat.icon size={20} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.25rem' }}>{stat.count}</h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'var(--bg-subtle)' }}>
            <tr>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Projet & Localisation</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Responsable</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Avancement</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Budget</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Équipe</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Statut</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{project.name}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={12} /> {project.location}
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{project.manager}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Échéance : {project.deadline}</div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '150px' }}>
                    <div style={{ flex: 1, height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${project.progress}%`, 
                        height: '100%', 
                        backgroundColor: project.progress === 100 ? '#006233' : 'var(--accent)', 
                        borderRadius: '3px' 
                      }} />
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700 }}>{project.progress}%</span>
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)' }}>{project.budget}</div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
                    <Users size={16} />
                    <span>{project.teamSize} Personnes</span>
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <span className={`badge ${project.status === 'Completed' ? 'badge-success' : project.status === 'Planning' ? 'badge-info' : 'badge-warning'}`}>
                    {project.status === 'Completed' ? 'Terminé' : project.status === 'Planning' ? 'Planification' : 'En Cours'}
                  </span>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <button className="btn btn-outline" style={{ padding: '0.5rem' }}>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsList;
