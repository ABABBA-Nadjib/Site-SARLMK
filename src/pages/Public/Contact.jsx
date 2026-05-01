import React from 'react';
import { Mail, Phone, MapPin, Printer, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="animate-fade" style={{ padding: '8rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Get In Touch</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
            Have a project in mind or a question? Our team based in Touggourt is ready to assist you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem' }}>
          {/* Contact Info */}
          <div>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {[
                { 
                  title: 'Head Office', 
                  content: 'Cité Ayad, Teyissebsa\nTouggourt, Algeria', 
                  icon: MapPin, 
                  color: 'var(--accent)' 
                },
                { 
                  title: 'Email Us', 
                  content: 'Fils-Makdoud@gmail.com', 
                  icon: Mail, 
                  color: '#10b981' 
                },
                { 
                  title: 'Call Us', 
                  content: '+213 795 101 097', 
                  icon: Phone, 
                  color: '#3b82f6' 
                },
                { 
                  title: 'Fax', 
                  content: '32105556', 
                  icon: Printer, 
                  color: '#f59e0b' 
                },
              ].map((info, i) => (
                <div key={i} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: info.color + '15', color: info.color, padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{info.title}</h3>
                    <p style={{ color: 'var(--text-light)', whiteSpace: 'pre-line', fontSize: '0.9375rem', lineHeight: 1.6 }}>{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Company Badge */}
            <div className="card" style={{ marginTop: '2rem', padding: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Company</p>
              <p style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}>SARL STE FI S MAKDOUD ENTREPRENEUR</p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Director: Saïd Makdoud · Est. 1996</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: '3rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Send Us a Message</h2>
            <form style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Full Name</label>
                  <input type="text" placeholder="Your name" style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Address</label>
                  <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', outline: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Subject</label>
                <select style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', outline: 'none', backgroundColor: 'white' }}>
                  <option>Project Consultation</option>
                  <option>General Inquiry</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Message</label>
                <textarea rows="5" placeholder="How can we help you?" style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', outline: 'none', resize: 'none' }}></textarea>
              </div>
              <button type="button" className="btn btn-primary" style={{ padding: '1rem', justifyContent: 'center', fontSize: '1rem' }}>
                <Send size={18} />
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
