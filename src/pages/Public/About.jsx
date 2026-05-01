import React from 'react';
import { Shield, Target, Users, Award, CheckCircle, MapPin, Building2, Briefcase, Globe } from 'lucide-react';

const About = () => {
  const values = [
    { title: 'Quality First', desc: 'We never compromise on the materials or methods used in our construction and public works projects.', icon: Award, color: '#f59e0b' },
    { title: 'Safety Always', desc: 'Ensuring the well-being of our workers and the public is our top priority on every site.', icon: Shield, color: '#10b981' },
    { title: 'Client Centric', desc: 'We build relationships through transparency and a commitment to exceeding client expectations.', icon: Users, color: '#6366f1' },
    { title: 'National Scale', desc: "Executing large-scale infrastructure projects that serve Algeria's oil & gas and public sectors.", icon: Globe, color: '#ec4899' },
  ];

  const regions = ['Adrar', 'Hassi Messaoud', 'El Meniaa', 'Ouargla', 'Touggourt', 'El Oued'];

  const companyInfo = [
    { label: 'Company Name', value: 'SARL STE FI S MAKDOUD ENTREPRENEUR' },
    { label: 'Founded', value: '1996' },
    { label: 'Director', value: 'Saïd Makdoud' },
    { label: 'Head Office', value: 'Cité Ayad, Teyissebsa, Touggourt, Algeria' },
    { label: 'Phone', value: '+213 795 101 097' },
    { label: 'Fax', value: '32105556' },
    { label: 'Email', value: 'Fils-Makdoud@gmail.com' },
  ];

  return (
    <div className="animate-fade">
      {/* Header */}
      <section style={{ padding: '8rem 0 4rem', backgroundColor: 'var(--bg-subtle)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>About Our Company</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
            Founded in 1996 — Building infrastructure and public works across southern Algeria for over 30 years.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Three Decades of Excellence</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Founded in 1996, <strong>SARL STE FI S MAKDOUD ENTREPRENEUR</strong> is a construction and public works company specializing in large-scale infrastructure projects. Based in Touggourt, the company operates across several regions in southern Algeria.
            </p>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '3rem' }}>
              The company collaborates with major national companies, particularly in the oil and gas sector, executing critical infrastructure and civil engineering projects that support Algeria's development.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '0.25rem' }}>30+</h4>
                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Years of Experience</p>
              </div>
              <div>
                <h4 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '0.25rem' }}>6+</h4>
                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Regions of Operation</p>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000" 
              alt="Construction Operations" 
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
            />
          </div>
        </div>
      </section>

      {/* Company Info Card */}
      <section style={{ padding: '0 0 8rem' }}>
        <div className="container">
          <div className="card" style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <Building2 size={32} color="var(--accent)" />
              <h2 style={{ fontSize: '2rem', margin: 0 }}>Company Information</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {companyInfo.map((item, i) => (
                <div key={i} style={{ 
                  padding: '1.25rem 1.5rem', 
                  backgroundColor: 'var(--bg-subtle)', 
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '3px solid var(--accent)'
                }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>{item.label}</p>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem', margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--primary)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>Our Core Values</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
              The principles that guide every decision we make and every structure we build.
            </p>
          </div>
          <div className="dashboard-grid">
            {values.map((v, i) => (
              <div key={i} className="card" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                <v.icon size={40} color={v.color} style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>{v.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Operation */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Areas of Operation</h2>
            <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
              The company operates in multiple strategic regions across southern Algeria.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {regions.map((region, i) => (
              <div key={i} className="card" style={{ 
                textAlign: 'center', 
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ backgroundColor: 'var(--accent)' + '15', color: 'var(--accent)', padding: '1rem', borderRadius: '50%' }}>
                  <MapPin size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{region}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--bg-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Leadership</h2>
            <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
              Guided by decades of experience in construction and public works.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="card" style={{ 
              maxWidth: '420px', 
              width: '100%', 
              textAlign: 'center', 
              padding: '3rem 2rem'
            }}>
              <div style={{ 
                width: '100px', height: '100px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--accent)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 2rem',
                fontSize: '2.5rem',
                fontWeight: 800,
                color: 'white'
              }}>
                SM
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Saïd Makdoud</h3>
              <p style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: '1rem' }}>Director & Founder</p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
                Founded the company in 1996 and has led it to become a key player in public works and infrastructure across southern Algeria.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
