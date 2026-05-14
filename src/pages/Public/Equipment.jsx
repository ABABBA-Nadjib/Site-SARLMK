import React from 'react';
import { Truck, ShieldCheck, CheckCircle, MapPin, Wrench, AlertTriangle } from 'lucide-react';

const EquipmentPublic = () => {
  const categories = [
    { 
      name: 'Levage Lourd',
      label: 'Grues & Levage',
      desc: "Grues à tour et mobiles de grande capacité pour les travaux de construction verticale et d'infrastructure. Déployées sur les chantiers pétroliers et routiers du sud algérien.",
      assets: ['Grue Tour Liebherr 280', 'Grue Mobile Terex RT 90', 'Potain MDT 219'],
      img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
      color: '#004d28',
      sites: ['Hassi Messaoud', 'Ouargla']
    },
    { 
      name: 'Terrassement',
      label: 'Excavation & Nivelage',
      desc: "Excavateurs et bulldozers de précision pour la préparation de terrain, le terrassement et le nivellement. Indispensables pour nos projets routiers et de génie civil en Algérie.",
      assets: ['Excavatrice CAT 320', 'Bulldozer Komatsu D155AX', 'Niveleuse Caterpillar 140M', 'Compacteur Dynapac CA 250'],
      img: 'https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&q=80&w=800',
      color: '#d4af37',
      sites: ['Adrar', 'El Meniaa', 'Touggourt']
    },
    { 
      name: 'Béton & Logistique',
      label: 'Malaxage & Transport',
      desc: "Camions malaxeurs, pompes à béton et véhicules de transport pour les grands volumes de coulage et la logistique de chantier sur l'ensemble de nos zones d'intervention.",
      assets: ['Camion Malaxeur Mercedes Arocs', 'Pompe à Béton Putzmeister BSF 36', 'Camion Benne 20T'],
      img: 'https://images.unsplash.com/photo-1517089534706-33c241f2b000?auto=format&fit=crop&q=80&w=800',
      color: '#006233',
      sites: ['El Oued', 'Touggourt', 'Ouargla']
    },
    { 
      name: 'Énergie & Support',
      label: 'Groupes Électrogènes',
      desc: "Groupes électrogènes mobiles haute puissance pour l'alimentation des chantiers isolés dans le désert algérien, garantissant la continuité des opérations 24h/24.",
      assets: ['Groupe Électrogène 500 kVA', 'Groupe Électrogène 250 kVA', 'Compresseur Atlas Copco'],
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      color: '#b89327',
      sites: ['Adrar', 'Hassi Messaoud', 'El Meniaa']
    },
  ];

  const stats = [
    { label: 'Engins Totaux',       value: '85+', color: 'var(--primary)' },
    { label: 'Opérationnels',        value: '70',  color: 'var(--accent)' },
    { label: 'Chantiers Couverts',  value: '6',   color: 'var(--primary-light)' },
    { label: 'Maintenance/An',      value: '240', color: 'var(--accent-hover)' },
  ];

  return (
    <div className="animate-fade">
      {/* Header */}
      <section style={{ 
        position: 'relative',
        padding: '10rem 0 8rem', 
        background: 'linear-gradient(135deg, rgba(0, 77, 40, 0.95), rgba(0, 24, 12, 0.85)), url("https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000") center/cover',
        color: 'white', 
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div className="orb" style={{ top: '-10%', right: '10%', width: '300px', height: '300px', background: '#d4af37' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.5rem 1.5rem', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600,
            marginBottom: '2rem', border: '1px solid rgba(212, 175, 55, 0.4)'
          }}>
            <Truck size={16} color="var(--accent)" />
            <span style={{ color: 'var(--accent)' }}>Plus de 85 Engins Déployés</span>
          </div>
          <h1 className="animate-float" style={{ fontSize: '4rem', marginBottom: '1.5rem', color: 'white', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            Parc <span style={{ color: 'var(--accent)' }}>Matériel</span> & Équipements
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
            SARL STE FI S MAKDOUD ENTREPRENEUR dispose d'un parc matériel complet et moderne, 
            déployé sur l'ensemble de ses chantiers à travers le sud algérien.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ position: 'relative', zIndex: 20 }}>
        <div className="container" style={{ marginTop: '-4rem' }}>
          <div className="dashboard-grid">
            {stats.map((s, i) => (
              <div key={i} className="card glass" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', background: 'rgba(255,255,255,0.95)' }}>
                <h2 style={{ fontSize: '3.5rem', margin: '0 0 0.5rem', color: s.color }}>{s.value}</h2>
                <p style={{ color: 'var(--text-light)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section style={{ padding: '8rem 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gap: '8rem' }}>
            {categories.map((cat, i) => (
              <div key={i} style={{ 
                display: 'grid', 
                gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr', 
                gap: '6rem', 
                alignItems: 'center' 
              }}>
                {i % 2 !== 0 && (
                  <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '450px', position: 'relative' }}>
                    <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))', pointerEvents: 'none' }}></div>
                  </div>
                )}
                <div>
                  <div style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 1.25rem', backgroundColor: `${cat.color}15`,
                    borderRadius: '999px', color: cat.color,
                    fontWeight: 700, fontSize: '0.875rem', marginBottom: '1.5rem',
                    border: `1px solid ${cat.color}30`
                  }}>
                    <Truck size={16} />
                    {cat.label}
                  </div>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>{cat.name}</h2>
                  <p style={{ fontSize: '1.125rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                    {cat.desc}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
                    {cat.assets.map((asset, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500, fontSize: '1.05rem' }}>
                        <CheckCircle size={22} color={cat.color} />
                        <span>{asset}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Déployé à :</span>
                    {cat.sites.map((site, si) => (
                      <span key={si} style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        fontSize: '0.85rem', padding: '0.4rem 1rem',
                        backgroundColor: 'var(--bg-white)', borderRadius: '999px', fontWeight: 600,
                        color: cat.color, border: `1px solid ${cat.color}30`,
                        boxShadow: 'var(--shadow-sm)'
                      }}>
                        <MapPin size={14} /> {site}
                      </span>
                    ))}
                  </div>
                </div>
                {i % 2 === 0 && (
                  <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '450px', position: 'relative' }}>
                    <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))', pointerEvents: 'none' }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Policy */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--bg-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Excellence Opérationnelle</h4>
            <h2 style={{ fontSize: '3rem', color: 'var(--primary)' }}>Politique de Maintenance</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            <div className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '3.5rem', background: 'var(--bg-white)', borderTop: '4px solid var(--primary)' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--primary-light), var(--primary))', color: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', flexShrink: 0, boxShadow: '0 8px 20px rgba(0, 77, 40, 0.2)' }}>
                <ShieldCheck size={40} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Maintenance Préventive</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
                  Chaque engin fait l'objet d'une inspection en 50 points avant tout déploiement. 
                  La maintenance est planifiée automatiquement pour garantir la disponibilité maximale des équipements sur chantier.
                </p>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '3.5rem', background: 'var(--bg-white)', borderTop: '4px solid var(--accent)' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--accent), #b89327)', color: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', flexShrink: 0, boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)' }}>
                <AlertTriangle size={40} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Suivi des Alertes</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8, margin: 0 }}>
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
