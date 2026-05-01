import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, CheckCircle, Download, Users } from 'lucide-react';

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([
    { id: 1, worker: 'Mohamed Benali',      role: 'Ingénieur de Chantier', dailyRate: 4500, daysWorked: 26, status: 'Payé' },
    { id: 2, worker: 'Ahmed Boulahoual',    role: 'Inspecteur Sécurité',   dailyRate: 3800, daysWorked: 25, status: 'En Attente' },
    { id: 3, worker: 'Yacine Khelifi',      role: 'Conducteur Grue',       dailyRate: 3500, daysWorked: 24, status: 'Payé' },
    { id: 4, worker: 'Sofiane Meziane',     role: 'Chef de Chantier',      dailyRate: 5200, daysWorked: 26, status: 'Payé' },
    { id: 5, worker: 'Abdelkader Touati',   role: 'Électricien',           dailyRate: 3200, daysWorked: 20, status: 'En Attente' },
    { id: 6, worker: 'Mustapha Rahmani',    role: 'Ouvrier Qualifié',      dailyRate: 2400, daysWorked: 26, status: 'Payé' },
    { id: 7, worker: 'Ali Cherif',          role: 'Technicien Hydraulique',dailyRate: 3000, daysWorked: 23, status: 'En Attente' },
    { id: 8, worker: 'Karim Boudjemaa',     role: 'Opérateur Bulldozer',   dailyRate: 3300, daysWorked: 25, status: 'Payé' },
  ]);

  const calculateTotal = (rate, days) => rate * days;
  const totalPayroll   = payrollData.reduce((acc, p) => acc + calculateTotal(p.dailyRate, p.daysWorked), 0);
  const totalPaid      = payrollData.filter(p => p.status === 'Payé').reduce((acc, p) => acc + calculateTotal(p.dailyRate, p.daysWorked), 0);
  const totalPending   = totalPayroll - totalPaid;

  const formatDZD = (val) => val.toLocaleString('fr-DZ') + ' DZD';

  const handlePay = (id) => {
    setPayrollData(prev => prev.map(p => p.id === id ? { ...p, status: 'Payé' } : p));
  };

  return (
    <div className="animate-fade" style={{ padding: '2.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Gestion de la Paie</h1>
          <p style={{ color: 'var(--text-light)' }}>Calcul des salaires du personnel basé sur les jours travaillés — Période : Avril 2026.</p>
        </div>
        <button className="btn btn-primary" style={{ borderRadius: 'var(--radius-md)' }}>
          <Download size={18} />
          Exporter Bulletin de Paie
        </button>
      </header>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '5px solid #006233' }}>
          <div style={{ backgroundColor: '#dcfce7', color: '#006233', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <Calculator size={28} />
          </div>
          <div>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.8125rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Total Masse Salariale</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{formatDZD(totalPayroll)}</h3>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '5px solid #3b82f6' }}>
          <div style={{ backgroundColor: '#eff6ff', color: '#3b82f6', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <CheckCircle size={28} />
          </div>
          <div>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.8125rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Total Payé</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{formatDZD(totalPaid)}</h3>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '5px solid #f59e0b' }}>
          <div style={{ backgroundColor: '#fef9c3', color: '#a16207', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <DollarSign size={28} />
          </div>
          <div>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.8125rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>En Attente</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{formatDZD(totalPending)}</h3>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Détail des Salaires — Avril 2026</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
            <Users size={16} />
            {payrollData.length} employés
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'var(--bg-subtle)' }}>
            <tr>
              {['Employé', 'Poste', 'Taux Journalier', 'Jours Travaillés', 'Total (DZD)', 'Statut', 'Action'].map((h, i) => (
                <th key={i} style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payrollData.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #006233, #3b82f6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 700, fontSize: '0.8125rem', flexShrink: 0
                    }}>
                      {p.worker.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{p.worker}</span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>{p.role}</td>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>{p.dailyRate.toLocaleString('fr-DZ')} DZD</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.3rem 0.75rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.875rem' }}>
                    {p.daysWorked} j
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>
                  {calculateTotal(p.dailyRate, p.daysWorked).toLocaleString('fr-DZ')} DZD
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span className={`badge ${p.status === 'Payé' ? 'badge-success' : 'badge-warning'}`}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  {p.status === 'En Attente' ? (
                    <button
                      className="btn btn-accent"
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.8125rem' }}
                      onClick={() => handlePay(p.id)}
                    >
                      Confirmer Paiement
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#006233', fontWeight: 600, fontSize: '0.875rem' }}>
                      <CheckCircle size={18} /> Réglé
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Footer total row */}
        <div style={{ padding: '1.25rem 1.5rem', backgroundColor: 'var(--bg-subtle)', borderTop: '2px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '3rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Total Général</p>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{formatDZD(totalPayroll)}</p>
          </div>
        </div>
      </div>

      {/* Currency note */}
      <div style={{ marginTop: '1.5rem', padding: '1rem 1.5rem', backgroundColor: '#fffbeb', borderLeft: '4px solid #f59e0b', borderRadius: 'var(--radius-md)' }}>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#92400e', fontWeight: 600 }}>
          💱 Tous les montants sont exprimés en <strong>Dinars Algériens (DZD)</strong>. Les taux journaliers reflètent les barèmes BTP en vigueur en Algérie.
        </p>
      </div>
    </div>
  );
};

export default Payroll;
