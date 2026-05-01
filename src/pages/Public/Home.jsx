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
    { label: 'Completed Projects', value: '150+', icon: Briefcase, color: '#6366f1' },
    { label: 'Active Personnel', value: '450+', icon: Users, color: '#10b981' },
    { label: 'Heavy Machinery', value: '85+', icon: Truck, color: '#f59e0b' },
  ];

  const services = [
    { 
      title: 'Road Construction', 
      desc: 'Road construction and infrastructure development across multiple regions in southern Algeria.', 
      icon: Globe 
    },
    { 
      title: 'Civil Engineering', 
      desc: 'Civil engineering and construction projects with high precision and quality standards.', 
      icon: ShieldCheck 
    },
    { 
      title: 'Oil & Gas Services', 
      desc: 'Specialized services for major oil and gas companies including Sonatrach and Schlumberger.', 
      icon: Zap 
    },
  ];

  const systemFeatures = [
    { title: 'Project Management', desc: 'Create, manage, and track construction projects and their phases in real time.', icon: Briefcase, color: '#6366f1' },
    { title: 'Resource Management', desc: 'Manage workers, teams, equipment, and materials efficiently.', icon: HardHat, color: '#10b981' },
    { title: 'Monitoring & Reports', desc: 'Interactive dashboard with daily engineer reports and real-time progress tracking.', icon: BarChart2, color: '#f59e0b' },
    { title: 'Notifications & Alerts', desc: 'Delay alerts, deadline tracking, and automated warnings for critical milestones.', icon: Bell, color: '#ec4899' },
    { title: 'Financial Management', desc: 'Budget tracking, cost analysis, and detailed financial reporting per project.', icon: DollarSign, color: '#3b82f6' },
    { title: 'Multi-Region Operations', desc: 'Track operations across Adrar, Hassi Messaoud, El Meniaa, Ouargla, and more.', icon: Globe, color: '#8b5cf6' },
  ];

  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section style={{ 
        padding: '10rem 0 8rem',
        background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.65)), url("https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000") center/cover',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.5rem 1rem', 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            borderRadius: '999px',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <span style={{ color: 'var(--secondary)' }}>Est. 1996 —</span>
            <span>Mini ERP System is now live</span>
            <ArrowRight size={14} />
          </div>
          <h1 style={{ color: 'white', fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '2rem', maxWidth: '1000px', margin: '0 auto 2rem' }}>
            Smart Platform for Managing <span style={{ color: 'var(--accent)' }}>Construction Projects</span>
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '750px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
            Smart platform for managing and monitoring construction and infrastructure projects — digitizing the internal operations of <strong>SARL STE FI S MAKDOUD ENTREPRENEUR</strong>.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/projects" className="btn btn-accent" style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}>
              Explore Projects
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '1rem 2rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '0 0 6rem' }}>
        <div className="container" style={{ marginTop: '-4rem' }}>
          <div className="dashboard-grid">
            {stats.map((stat, i) => (
              <div key={i} className="card" style={{ 
                textAlign: 'center', 
                padding: '3rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.25rem'
              }}>
                <div style={{ 
                  backgroundColor: stat.color + '10', 
                  color: stat.color, 
                  padding: '1.25rem',
                  borderRadius: '50%'
                }}>
                  <stat.icon size={36} />
                </div>
                <div>
                  <h2 style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>{stat.value}</h2>
                  <p style={{ color: 'var(--text-light)', fontWeight: 600, marginTop: '0.5rem', fontSize: '1rem' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--bg-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Business Activities</h2>
            <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
              Operating in the field of public works (BTP) across several regions in southern Algeria.
            </p>
          </div>
          <div className="dashboard-grid">
            {services.map((service, i) => (
              <div key={i} className="card" style={{ padding: '2.5rem' }}>
                <service.icon size={40} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>{service.desc}</p>
                <Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 600 }}>
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Features Section */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Mini ERP System Features</h2>
            <p style={{ color: 'var(--text-light)', maxWidth: '650px', margin: '0 auto' }}>
              A web-based platform designed to digitalize the company's internal operations — improving efficiency, transparency, and decision-making.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {systemFeatures.map((feature, i) => (
              <div key={i} className="card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: feature.color + '15', color: feature.color, padding: '1rem', borderRadius: 'var(--radius-md)', flexShrink: 0 }}>
                  <feature.icon size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--bg-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&q=80&w=1200" 
                alt="Construction Operations" 
                style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
              />
              <div className="glass" style={{ 
                position: 'absolute', 
                bottom: '-2rem', 
                right: '-2rem', 
                padding: '2rem', 
                borderRadius: 'var(--radius-md)', 
                maxWidth: '250px',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>30+</h4>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-light)' }}>Years of proven expertise in public works and infrastructure.</p>
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '3rem', lineHeight: 1.2, marginBottom: '2rem' }}>Engineered for Excellence Since 1996</h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-light)', marginBottom: '3rem', lineHeight: 1.8 }}>
                SARL STE FI S MAKDOUD ENTREPRENEUR is a trusted construction and public works company based in Touggourt, Algeria. We collaborate with major national companies in the oil and gas sector and execute large-scale infrastructure projects across southern Algeria.
              </p>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {[
                  'Founded in 1996 by Director Saïd Makdoud',
                  'Operating across 6+ regions in southern Algeria',
                  'Partnering with oil & gas industry leaders',
                  'Executing large-scale national infrastructure projects'
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600 }}>
                    <CheckCircle2 size={24} color="#10b981" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ 
            backgroundColor: 'var(--primary)', 
            padding: '5rem 2rem', 
            borderRadius: 'var(--radius-lg)', 
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to Start Your Next Project?</h2>
            <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.125rem' }}>
              Connect with our team today for consultation. Based in Touggourt — operating across southern Algeria.
            </p>
            <Link to="/contact" className="btn btn-accent" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
              Get in Touch Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
