import React, { useState } from 'react';
import { 
  Truck, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Plus, 
  Search,
  MapPin,
  Wrench
} from 'lucide-react';

const Equipment = () => {
  const [fleet, setFleet] = useState([
    { id: 1, name: 'Grue Tour — Liebherr 280', type: 'Grue Lourde', status: 'Operational', site: 'Route Hassi Messaoud', health: 91 },
    { id: 2, name: 'Excavatrice — CAT 320', type: 'Terrassement', status: 'Maintenance', site: 'Atelier Central — Touggourt', health: 42 },
    { id: 3, name: 'Camion Malaxeur Béton', type: 'Logistique', status: 'Operational', site: 'Urbain Touggourt', health: 85 },
    { id: 4, name: 'Bulldozer — Komatsu D155', type: 'Terrassement', status: 'Operational', site: 'Pipeline Adrar', health: 78 },
    { id: 5, name: 'Groupe Électrogène 500 kVA', type: 'Énergie', status: 'Standby', site: 'Facility Ouargla', health: 97 },
    { id: 6, name: 'Niveleuse — Caterpillar 140M', type: 'Voirie', status: 'Operational', site: 'Route El Oued', health: 83 },
    { id: 7, name: 'Compacteur — Dynapac CA 250', type: 'Compactage', status: 'Operational', site: 'Route Hassi Messaoud', health: 72 },
    { id: 8, name: 'Camion Benne 20T', type: 'Transport', status: 'Maintenance', site: 'Atelier Central — Touggourt', health: 38 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = fleet.filter(
    item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.site.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade" style={{ padding: '2.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Gestion du Parc Matériel</h1>
          <p style={{ color: 'var(--text-light)' }}>Suivi des engins lourds, état de santé et déploiement sur les chantiers actifs.</p>
        </div>
        <button className="btn btn-primary" style={{ borderRadius: 'var(--radius-md)' }}>
          <Plus size={20} />
          Enregistrer un Engin
        </button>
      </header>

      {/* Asset Summary */}
      <div className="dashboard-grid" style={{ marginBottom: '2.5rem' }}>
        {[
          { label: 'Total Engins', value: '85', icon: Truck, color: 'var(--primary)' },
          { label: 'Opérationnels', value: '70', icon: CheckCircle, color: '#006233' },
          { label: 'En Maintenance', value: '10', icon: Settings, color: '#f59e0b' },
          { label: 'État Critique', value: '5', icon: AlertTriangle, color: '#d21034' },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ backgroundColor: stat.color + '15', color: stat.color, padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <stat.icon size={28} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.5rem' }}>{stat.value}</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)', fontWeight: 600 }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fleet Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Inventaire du Parc</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-light)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Rechercher un engin ou chantier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.875rem', minWidth: '260px' }}
              />
            </div>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'var(--bg-subtle)' }}>
            <tr>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Engin & Catégorie</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Chantier Actuel</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Statut</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>État de Santé</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>Catégorie : {item.type}</div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <MapPin size={14} color="var(--text-light)" />
                    {item.site}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span className={`badge ${item.status === 'Operational' ? 'badge-success' : item.status === 'Standby' ? 'badge-info' : 'badge-warning'}`}>
                    {item.status === 'Operational' ? 'Opérationnel' : item.status === 'Standby' ? 'En Attente' : 'Maintenance'}
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1, width: '80px', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px' }}>
                      <div style={{ 
                        width: `${item.health}%`, 
                        height: '100%', 
                        backgroundColor: item.health > 80 ? '#006233' : item.health > 50 ? '#f59e0b' : '#d21034', 
                        borderRadius: '3px' 
                      }} />
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700 }}>{item.health}%</span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.5rem' }} title="Modifier">
                      <Settings size={16} />
                    </button>
                    <button className="btn btn-outline" style={{ padding: '0.5rem' }} title="Maintenance">
                      <Wrench size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Equipment;
