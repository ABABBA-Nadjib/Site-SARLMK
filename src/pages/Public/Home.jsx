import React from 'react';
import { 
  Briefcase, 
  Users, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Globe,
  BarChart2,
  Bell,
  DollarSign,
  HardHat
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    { label: 'Projets Achevés', value: '150+', icon: Briefcase, color: '#004d28' },
    { label: 'Employés Actifs', value: '450+', icon: Users, color: '#d4af37' },
    { label: 'Engins Lourds', value: '85+', icon: Truck, color: '#f59e0b' },
  ];

  const services = [
    { 
      title: 'Travaux Routiers', 
      desc: 'Construction et développement des infrastructures routières à travers le sud de l\'Algérie.', 
      icon: Globe 
    },
    { 
      title: 'Génie Civil', 
      desc: 'Projets de construction et de génie civil avec des normes de haute précision.', 
      icon: ShieldCheck 
    },
    { 
      title: 'Services Pétroliers', 
      desc: 'Aménagement de sites pour de grandes entreprises comme Sonatrach et Schlumberger.', 
      icon: Zap 
    },
  ];

  const systemFeatures = [
    { title: 'Gestion de Projets', desc: 'Suivez les projets de construction et leurs phases en temps réel.', icon: Briefcase },
    { title: 'Gestion des Ressources', desc: 'Gérez efficacement les travailleurs, les équipes, le matériel et les matériaux.', icon: HardHat },
    { title: 'Rapports Intelligents', desc: 'Tableau de bord interactif avec rapports quotidiens.', icon: BarChart2 },
    { title: 'Notifications & Alertes', desc: 'Alertes de retard et avertissements automatisés.', icon: Bell },
  ];

  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        padding: '12rem 0 10rem',
        background: 'linear-gradient(135deg, rgba(0, 77, 40, 0.95), rgba(0, 24, 12, 0.85)), url("https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000") center/cover',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Decorative Orbs */}
        <div className="orb" style={{ top: '-10%', left: '-5%', width: '400px', height: '400px', background: '#d4af37' }}></div>
        <div className="orb" style={{ bottom: '-20%', right: '10%', width: '500px', height: '500px', background: '#006233', animationDelay: '2s' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            padding: '0.5rem 1.25rem', 
            background: 'rgba(255,255,255,0.05)', 
            backdropFilter: 'blur(10px)',
            borderRadius: '999px',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(212, 175, 55, 0.3)'
          }}>
            <span style={{ color: 'var(--accent)' }}>Excellence depuis 1996</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
            <span>BTP & Génie Civil</span>
          </div>
          
          <h1 className="animate-float" style={{ color: 'white', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '1000px', margin: '0 auto 1.5rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            L'Avenir de la <span style={{ color: 'var(--accent)' }}>Construction</span> en Algérie
          </h1>
          
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.8, fontWeight: 300 }}>
            SARL STE FI S MAKDOUD ENTREPRENEUR — Votre partenaire de confiance pour les grands projets d'infrastructure, de terrassement, et d'aménagement pétrolier dans le Sud Algérien.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/projects" className="btn btn-accent" style={{ padding: '1.25rem 2.5rem', fontSize: '1.125rem' }}>
              Découvrir nos Projets
            </Link>
            <Link to="/about" className="btn glass-dark" style={{ padding: '1.25rem 2.5rem', fontSize: '1.125rem' }}>
              En Savoir Plus
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section (Overlapping Hero) */}
      <section style={{ position: 'relative', zIndex: 20 }}>
        <div className="container" style={{ marginTop: '-5rem' }}>
          <div className="dashboard-grid">
            {stats.map((stat, i) => (
              <div key={i} className="card glass" style={{ 
                textAlign: 'center', 
                padding: '3rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.25rem',
                background: 'rgba(255,255,255,0.95)'
              }}>
                <div style={{ 
                  background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}30)`, 
                  color: stat.color, 
                  padding: '1.25rem',
                  borderRadius: '50%',
                  boxShadow: `0 8px 20px ${stat.color}20`
                }}>
                  <stat.icon size={36} />
                </div>
                <div>
                  <h2 style={{ fontSize: '3.5rem', margin: 0, lineHeight: 1, color: 'var(--text)' }}>{stat.value}</h2>
                  <p style={{ color: 'var(--text-light)', fontWeight: 600, marginTop: '0.75rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '8rem 0 6rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Notre Expertise</h4>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Domaines d'Activité</h2>
            <div style={{ width: '80px', height: '4px', background: 'var(--accent)', margin: '0 auto', borderRadius: '2px' }}></div>
          </div>
          <div className="dashboard-grid" style={{ gap: '2rem' }}>
            {services.map((service, i) => (
              <div key={i} className="card" style={{ padding: '3rem 2.5rem', borderTop: '4px solid var(--accent)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <service.icon size={32} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: 1.7 }}>{service.desc}</p>
                <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
                  Découvrir <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--primary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ top: '20%', right: '-10%', width: '400px', height: '400px', background: '#d4af37', opacity: 0.2 }}></div>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&q=80&w=1200" 
                alt="Construction Operations" 
                style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
              />
              <div className="glass-dark" style={{ 
                position: 'absolute', 
                bottom: '-2rem', 
                right: '-2rem', 
                padding: '2rem', 
                borderRadius: 'var(--radius-lg)', 
                maxWidth: '280px',
              }}>
                <h4 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>30+</h4>
                <p style={{ fontSize: '1rem', fontWeight: 500, opacity: 0.9 }}>Années d'expertise prouvée dans les travaux publics.</p>
              </div>
            </div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1rem' }}>À Propos de Nous</h4>
              <h2 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '2rem', color: 'white' }}>Bâtir l'Avenir Depuis 1996</h2>
              <p style={{ fontSize: '1.125rem', opacity: 0.8, marginBottom: '3rem', lineHeight: 1.8 }}>
                Sous la direction de M. Saïd Makdoud, notre entreprise s'est imposée comme un leader régional. Nous collaborons avec des géants comme Sonatrach pour façonner les infrastructures de l'Algérie de demain.
              </p>
              <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                {[
                  'Présence dans plus de 6 wilayas du Sud',
                  'Partenariat stratégique avec l\'industrie pétrolière',
                  'Exécution de projets d\'envergure nationale'
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 500, fontSize: '1.1rem' }}>
                    <CheckCircle2 size={24} color="var(--accent)" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-accent" style={{ padding: '1rem 2.5rem' }}>
                Notre Histoire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '8rem 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ 
            background: 'linear-gradient(135deg, #ffffff, #f8fafc)', 
            padding: '5rem 3rem', 
            borderRadius: 'var(--radius-xl)', 
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{ color: 'var(--primary)', fontSize: '3.5rem', marginBottom: '1.5rem' }}>Prêt à lancer votre projet ?</h2>
            <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.25rem' }}>
              Connectez-vous avec notre équipe d'experts aujourd'hui. Basé à Touggourt — opérant à travers tout le Sud.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.125rem' }}>
                Contactez-Nous
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
