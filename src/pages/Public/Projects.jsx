import React, { useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('Tous');
  
  const projects = [
    {
      id: 1,
      name: 'Infrastructures Routières d\'Adrar',
      description: 'Construction et développement d\'infrastructures routières dans la région d\'Adrar, soutenant la connectivité entre les zones éloignées.',
      status: 'Achevé',
      image: 'https://images.unsplash.com/photo-1545459720-aac273a27b3d?auto=format&fit=crop&q=80&w=800',
      category: 'Infrastructure',
      location: 'Adrar, Algérie'
    },
    {
      id: 2,
      name: 'Aménagement Site Hassi Messaoud',
      description: 'Génie civil et travaux de préparation de site pour les grandes opérations pétrolières à Hassi Messaoud.',
      status: 'Achevé',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&q=80&w=800',
      category: 'Pétrole & Gaz',
      location: 'Hassi Messaoud, Algérie'
    },
    {
      id: 3,
      name: 'Travaux Publics El Meniaa',
      description: 'Projet de travaux publics à grande échelle comprenant des infrastructures civiles et des installations de soutien.',
      status: 'En Cours',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
      category: 'Génie Civil',
      location: 'El Meniaa, Algérie'
    },
    {
      id: 4,
      name: 'Infrastructure Urbaine Ouargla',
      description: 'Projet de construction de routes et de développement des infrastructures urbaines à Ouargla.',
      status: 'Achevé',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      category: 'Infrastructure',
      location: 'Ouargla, Algérie'
    },
    {
      id: 5,
      name: 'Développement Civil Touggourt',
      description: 'Projets de génie civil et de construction à l\'intérieur et autour de la base d\'attache de l\'entreprise à Touggourt.',
      status: 'En Cours',
      image: 'https://images.unsplash.com/photo-1577493322601-3ae1f30c0552?auto=format&fit=crop&q=80&w=800',
      category: 'Génie Civil',
      location: 'Touggourt, Algérie'
    },
    {
      id: 6,
      name: 'Réseau Routier El Oued',
      description: 'Projet d\'expansion et d\'entretien du réseau routier pour améliorer la connectivité régionale à El Oued.',
      status: 'Planification',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      category: 'Infrastructure',
      location: 'El Oued, Algérie'
    }
  ];

  const filteredProjects = filter === 'Tous' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="animate-fade" style={{ padding: '8rem 0', background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative' }}>
          <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Notre Réalisations</h4>
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Projets Majeurs</h1>
          <div style={{ width: '100px', height: '4px', background: 'var(--accent)', margin: '0 auto 2rem', borderRadius: '2px' }}></div>
          <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
            Découvrez les projets d'infrastructure et de travaux publics exécutés par SARL STE FI S MAKDOUD ENTREPRENEUR à travers le sud algérien.
          </p>
        </div>

        {/* Filters */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '5rem',
          flexWrap: 'wrap'
        }}>
          {['Tous', 'Infrastructure', 'Génie Civil', 'Pétrole & Gaz'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className="btn"
              style={{
                backgroundColor: filter === cat ? 'var(--primary)' : 'rgba(255,255,255,0.8)',
                color: filter === cat ? 'white' : 'var(--text)',
                border: filter === cat ? '2px solid var(--primary)' : '2px solid var(--border)',
                padding: '0.75rem 2rem',
                borderRadius: '999px',
                fontWeight: 600,
                boxShadow: filter === cat ? '0 8px 20px rgba(0, 77, 40, 0.2)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="dashboard-grid" style={{ gap: '2.5rem' }}>
          {filteredProjects.map((project) => (
            <div key={project.id} className="card" style={{ 
              padding: 0, 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              boxShadow: 'var(--shadow-md)',
              background: '#ffffff'
            }}>
              <div style={{ height: '260px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={project.image} 
                  alt={project.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))', pointerEvents: 'none' }}></div>
                <div style={{ 
                  position: 'absolute', 
                  top: '1.5rem', 
                  right: '1.5rem',
                }}>
                  <span className={`badge ${project.status === 'Achevé' ? 'badge-success' : project.status === 'En Cours' ? 'badge-warning' : 'badge-info'}`} style={{ backdropFilter: 'blur(8px)', background: project.status === 'Achevé' ? 'rgba(20, 184, 166, 0.9)' : 'rgba(245, 158, 11, 0.9)', color: 'white', border: 'none' }}>
                    {project.status}
                  </span>
                </div>
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                  <MapPin size={18} color="var(--accent)" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{project.location}</span>
                </div>
              </div>
              <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  {project.category}
                </span>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>{project.name}</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '2.5rem', fontSize: '1rem', flex: 1, lineHeight: 1.7 }}>{project.description}</p>
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'space-between', borderRadius: 'var(--radius-md)' }}>
                  Détails du Projet
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
