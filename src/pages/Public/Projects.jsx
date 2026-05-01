import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  
  const projects = [
    {
      id: 1,
      name: 'Adrar Road Infrastructure',
      description: 'Construction and development of road infrastructure in Adrar region, supporting connectivity between remote areas.',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1545459720-aac273a27b3d?auto=format&fit=crop&q=80&w=800',
      category: 'Infrastructure',
      location: 'Adrar, Algeria'
    },
    {
      id: 2,
      name: 'Hassi Messaoud Site Works',
      description: 'Civil engineering and site preparation works for major oil field operations in Hassi Messaoud.',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&q=80&w=800',
      category: 'Oil & Gas',
      location: 'Hassi Messaoud, Algeria'
    },
    {
      id: 3,
      name: 'El Meniaa Public Works',
      description: 'Large-scale public works project including civil infrastructure and support facilities.',
      status: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
      category: 'Civil Works',
      location: 'El Meniaa, Algeria'
    },
    {
      id: 4,
      name: 'Ouargla Urban Infrastructure',
      description: 'Road construction and urban infrastructure development project in Ouargla.',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      category: 'Infrastructure',
      location: 'Ouargla, Algeria'
    },
    {
      id: 5,
      name: 'Touggourt Civil Development',
      description: 'Civil engineering and construction projects in and around the company\'s home base of Touggourt.',
      status: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1577493322601-3ae1f30c0552?auto=format&fit=crop&q=80&w=800',
      category: 'Civil Works',
      location: 'Touggourt, Algeria'
    },
    {
      id: 6,
      name: 'El Oued Road Network',
      description: 'Road network expansion and maintenance project for improved regional connectivity in El Oued.',
      status: 'Planning',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      category: 'Infrastructure',
      location: 'El Oued, Algeria'
    }
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="animate-fade" style={{ padding: '6rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Our Projects</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
            Explore the infrastructure and public works projects executed by SARL STE FI S MAKDOUD ENTREPRENEUR across southern Algeria.
          </p>
        </div>

        {/* Filters */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '4rem',
          flexWrap: 'wrap'
        }}>
          {['All', 'Infrastructure', 'Civil Works', 'Oil & Gas'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className="btn"
              style={{
                backgroundColor: filter === cat ? 'var(--primary)' : 'white',
                color: filter === cat ? 'white' : 'var(--text)',
                border: '1px solid var(--border)',
                padding: '0.625rem 1.5rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="dashboard-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={project.image} 
                  alt={project.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)' }} 
                  className="project-img"
                />
                <div style={{ 
                  position: 'absolute', 
                  top: '1rem', 
                  right: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  alignItems: 'flex-end'
                }}>
                  <span className={`badge ${project.status === 'Completed' ? 'badge-success' : project.status === 'Ongoing' ? 'badge-warning' : 'badge-info'}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  {project.category} • {project.location}
                </span>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{project.name}</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '2rem', fontSize: '0.9375rem', flex: 1 }}>{project.description}</p>
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'space-between' }}>
                  View Project Details
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
