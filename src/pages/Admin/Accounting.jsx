import React, { useState } from 'react';
import { 
  Download, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  FileText,
  PieChart,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const Accounting = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income',  amount: 14500000, description: 'Contrat Sonatrach — Facility Ouargla, Tranche 3', category: 'Revenu Projet', date: '2026-04-20' },
    { id: 2, type: 'expense', amount:  3200000, description: 'Acier HA 50T — Chantier Route Hassi Messaoud', category: 'Matériaux', date: '2026-04-22' },
    { id: 3, type: 'expense', amount:  1850000, description: 'Maintenance Hydraulique — Excavatrice CAT 320', category: 'Maintenance', date: '2026-04-25' },
    { id: 4, type: 'income',  amount:  8200000, description: 'Acompte Projet Urbain — Touggourt Phase 1', category: 'Revenu Projet', date: '2026-04-26' },
    { id: 5, type: 'expense', amount:   980000, description: 'Assurance Chantier Personnel — T2 2026', category: 'Assurance', date: '2026-04-27' },
    { id: 6, type: 'expense', amount:  2400000, description: 'Carburant Flotte Engins — Avril 2026', category: 'Exploitation', date: '2026-04-28' },
    { id: 7, type: 'income',  amount:  6000000, description: 'Paiement Jalons — Infrastructure Adrar', category: 'Revenu Projet', date: '2026-04-29' },
  ]);

  const totalIncome  = transactions.filter(t => t.type === 'income').reduce((acc, t)  => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const profit = totalIncome - totalExpense;

  const formatDZD = (val) => val.toLocaleString('fr-DZ') + ' DZD';

  return (
    <div className="animate-fade" style={{ padding: '2.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Comptabilité & Finances</h1>
          <p style={{ color: 'var(--text-light)' }}>Vue complète des flux de trésorerie, des dépenses et des marges bénéficiaires.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ borderRadius: 'var(--radius-md)' }}>
            <Calendar size={18} />
            Période Fiscale
          </button>
          <button className="btn btn-primary" style={{ borderRadius: 'var(--radius-md)' }}>
            <Download size={18} />
            Exporter Relevé
          </button>
        </div>
      </header>

      {/* Financial Health Overview */}
      <div className="dashboard-grid" style={{ marginBottom: '2.5rem' }}>
        <div className="card" style={{ borderLeft: '6px solid #006233', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: '0 0 0.5rem', color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 600 }}>Total Revenus</p>
            <h2 style={{ fontSize: '1.875rem', margin: 0 }}>{formatDZD(totalIncome)}</h2>
          </div>
          <div style={{ backgroundColor: '#dcfce7', color: '#006233', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <TrendingUp size={32} />
          </div>
        </div>
        <div className="card" style={{ borderLeft: '6px solid #d21034', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: '0 0 0.5rem', color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 600 }}>Total Dépenses</p>
            <h2 style={{ fontSize: '1.875rem', margin: 0 }}>{formatDZD(totalExpense)}</h2>
          </div>
          <div style={{ backgroundColor: '#fee2e2', color: '#d21034', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <TrendingDown size={32} />
          </div>
        </div>
        <div className="card" style={{ backgroundColor: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: '0 0 0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', fontWeight: 600 }}>Bénéfice Net</p>
            <h2 style={{ fontSize: '1.875rem', margin: 0, color: 'white' }}>{formatDZD(profit)}</h2>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#f59e0b', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <DollarSign size={32} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Transaction History */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Transactions Récentes</h3>
            <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
              Voir Tout
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-light)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                <th style={{ padding: '1rem 1.5rem' }}>Détail Transaction</th>
                <th style={{ padding: '1rem 1.5rem' }}>Catégorie</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Montant (DZD)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>{t.date}</td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{t.description}</div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      padding: '0.25rem 0.625rem', 
                      backgroundColor: t.type === 'income' ? '#dcfce7' : '#fef2f2', 
                      borderRadius: '4px',
                      color: t.type === 'income' ? '#15803d' : '#b91c1c',
                      fontWeight: 600
                    }}>
                      {t.category}
                    </span>
                  </td>
                  <td style={{ 
                    padding: '1.25rem 1.5rem', 
                    fontWeight: 700, 
                    textAlign: 'right',
                    color: t.type === 'income' ? '#006233' : '#d21034' ,
                    whiteSpace: 'nowrap'
                  }}>
                    {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('fr-DZ')} DZD
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sidebar Tools */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Actions Rapides</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Soumettre une Facture', icon: FileText },
                { label: 'Allocation Budgétaire', icon: PieChart },
                { label: 'Audit Financier', icon: ShieldCheck },
              ].map((tool, i) => (
                <button key={i} className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start', gap: '1rem', padding: '1rem' }}>
                  <tool.icon size={20} color="var(--accent)" />
                  <span style={{ fontWeight: 600 }}>{tool.label}</span>
                  <ArrowRight size={16} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#15803d' }}>Prévision Mensuelle</h4>
            <p style={{ fontSize: '0.875rem', color: '#166534', marginBottom: '1.5rem' }}>
              Sur la base des jalons en cours, le chiffre d'affaires prévu pour <strong>Mai 2026</strong> est de <strong>26 500 000 DZD</strong>.
            </p>
            <div style={{ height: '4px', backgroundColor: '#bbf7d0', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '68%', height: '100%', backgroundColor: '#006233' }} />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#15803d', marginTop: '0.5rem', fontWeight: 600 }}>68% de l'objectif trimestriel atteint</p>
          </div>

          {/* Currency note */}
          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #f59e0b', backgroundColor: '#fffbeb' }}>
            <p style={{ fontSize: '0.8125rem', color: '#92400e', margin: 0, fontWeight: 600 }}>
              💱 Toutes les valeurs sont exprimées en <strong>Dinars Algériens (DZD)</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounting;
