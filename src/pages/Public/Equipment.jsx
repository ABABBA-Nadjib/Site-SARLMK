import React from 'react';
import { Truck, ShieldCheck, CheckCircle, MapPin, Wrench, AlertTriangle } from 'lucide-react';

const EquipmentPublic = () => {
  const categories = [
    { 
      name: 'Levage Lourd',
      label: 'Grues & Levage',
      desc: "Grues tour et mobiles de grande capacité pour les travaux de construction verticale et d'infrastructure. Déployées sur les chantiers pétroliers et routiers du sud algérien.",
      assets: ['Grue Tour Liebherr 280', 'Grue Mobile Terex RT 90', 'Potain MDT 219'],
      img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
      color: '#006233',
      sites: ['Hassi Messaoud', 'Ouargla']
    },
    { 
      name: 'Terrassement',
      label: 'Excavation & Nivelage',
      desc: "Excavateurs et bulldozers de précision pour la préparation de terrain, le terrassement et le nivellement. Indispensables pour nos projets routiers et de génie civil en Algérie.",
      assets: ['Excavatrice CAT 320', 'Bulldozer Komatsu D155AX', 'Niveleuse Caterpillar 140M', 'Compacteur Dynapac CA 250'],
      img: 'https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&q=80&w=800',
      color: '#3b82f6',
      sites: ['Adrar', 'El Meniaa', 'Touggourt']
    },
    { 
      name: 'Béton & Logistique',
      label: 'Malaxage & Transport',
      desc: "Camions malaxeurs, pompes à béton et véhicules de transport pour les grands volumes de coulage et la logistique de chantier sur l'ensemble de nos zones d'intervention.",
      assets: ['Camion Malaxeur Mercedes Arocs', 'Pompe à Béton Putzmeister BSF 36', 'Camion Benne 20T'],
      img: 'https://images.unsplash.com/photo-1517089534706-33c241f2b000?auto=format&fit=crop&q=80&w=800',
      color: '#f59e0b',
      sites: ['El Oued', 'Touggourt', 'Ouargla']
    },
    { 
      name: 'Énergie & Support',
      label: 'Groupes Électrogènes',
      desc: "Groupes électrogènes mobiles haute puissance pour l'alimentation des chantiers isolés dans le désert algérien, garantissant la continuité des opérations 24h/24.",
      assets: ['Groupe Électrogène 500 kVA', 'Groupe Électrogène 250 kVA', 'Compresseur Atlas Copco'],
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      color: '#d21034',
      sites: ['Adrar', 'Hassi Messaoud', 'El Meniaa']
    },
  ];

  const stats = [
    { label: 'Engins Totaux',       value: '85+', color: '#006233' },
    { label: 'Opérationnels',        value: '70',  color: '#3b82f6' },
    { label: 'Chantiers Couverts',  value: '6',   color: '#f59e0b' },
    { label: 'Maintenance/An',      value: '240', color: '#d21034' },
  ];

  return (
    <div className="animate-fade">
      {/* Header */}
      <section style={{ 
        padding: '8rem 0 4rem', 
        background: 'linear-gradient(to bottom, rgba(0,18,8,0.85), rgba(0,18,8,0.7)), url("https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000") center/cover',
        color: 'white', 
        textAlign: 'center' 
      }}>
        <div className="container">
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1.25rem', backgroundColor: 'rgba(0,98,51,0.3)',
            borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600,
            marginBottom: '2rem', border: '1px solid rgba(0,98,51,0.5)'
          }}>
            <Truck size={16} color="#4ade80" />
            <span style={{ color: '#4ade80' }}>85+ Engins Opérationnels</span>
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'white' }}>Parc Matériel & Équipements</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
            SARL STE FI S MAKDOUD ENTREPRENEUR dispose d'un parc matériel complet et moderne, 
            déployé sur l'ensemble de ses chantiers à travers le sud algérien.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ padding: '0 0 6rem' }}>
        <div className="container" style={{ marginTop: '-3rem' }}>
          <div className="dashboard-grid">
            {stats.map((s, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                <h2 style={{ fontSize: '3rem', margin: 0, color: s.color }}>{s.value}</h2>
                <p style={{ color: 'var(--text-light)', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9375rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section style={{ padding: '0 0 8rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gap: '6rem' }}>
            {categories.map((cat, i) => (
              <div key={i} style={{ 
                display: 'grid', 
                gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr', 
                gap: '5rem', 
                alignItems: 'center' 
              }}>
                {i % 2 !== 0 && (
                  <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '400px' }}>
                    <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div>
                  {/* Category badge */}
                  <div style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 1rem', backgroundColor: cat.color + '15',
                    borderRadius: 'var(--radius-sm)', color: cat.color,
                    fontWeight: 700, fontSize: '0.875rem', marginBottom: '1.5rem',
                    border: `1px solid ${cat.color}30`
                  }}>
                    <Truck size={16} />
                    {cat.label}
                  </div>
                  <h2 style={{ fontSize: '2.25rem', marginBottom: '1.25rem' }}>{cat.name}</h2>
                  <p style={{ fontSize: '1.0625rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '2rem' }}>
                    {cat.desc}
                  </p>

                  {/* Asset list */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '2rem' }}>
                    {cat.assets.map((asset, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                        <CheckCircle size={20} color={cat.color} />
                        <span style={{ fontSize: '0.9375rem' }}>{asset}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sites deployed */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Déployé à :</span>
                    {cat.sites.map((site, si) => (
                      <span key={si} style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                        fontSize: '0.8125rem', padding: '0.3rem 0.75rem',
                        backgroundColor: 'var(--bg-subtle)', borderRadius: '999px', fontWeight: 600,
                        color: cat.color
                      }}>
                        <MapPin size={12} /> {site}
                      </span>
                    ))}
                  </div>
                </div>
                {i % 2 === 0 && (
                  <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '400px' }}>
                    <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Policy */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '3rem' }}>
              <div style={{ backgroundColor: '#006233', color: 'white', padding: '1.25rem', borderRadius: 'var(--radius-md)', flexShrink: 0 }}>
                <ShieldCheck size={36} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Politique de Maintenance Préventive</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                  Chaque engin fait l'objet d'une inspection en 50 points avant tout déploiement. 
                  La maintenance est planifiée automatiquement pour garantir la disponibilité maximale des équipements sur chantier.
                </p>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '3rem' }}>
              <div style={{ backgroundColor: '#d21034', color: 'white', padding: '1.25rem', borderRadius: 'var(--radius-md)', flexShrink: 0 }}>
                <AlertTriangle size={36} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Suivi des Alertes en Temps Réel</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                  Notre système ERP intégré surveille l'état de santé de chaque engin en continu. 
                  Toute anomalie est signalée immédiatement au responsable de parc pour intervention rapide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EquipmentPublic;
