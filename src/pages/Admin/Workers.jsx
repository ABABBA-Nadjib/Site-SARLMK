import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Loader, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useFirestore } from '../../hooks/useFirestore';
import { useToast } from '../../contexts/ToastContext';

const ROLES    = ['Ingenieur de Chantier','Chef de Chantier','Ouvrier Qualifie','Technicien','Electricien','Conducteur Grue','Operateur Bulldozer','Inspecteur Securite'];
const SITES    = ['Route Hassi Messaoud','Pipeline Adrar','Developpement Urbain Touggourt','Facility Petroliere Ouargla','Route El Oued','Route El Meniaa'];
const STATUSES = ['Active','On Leave','Inactive'];
const emptyForm = { name:'', role:'', phone:'', site:'', status:'Active', dailyRate:'' };

export default function Workers() {
  const { data: workers, loading, addItem, updateItem, deleteItem } = useFirestore('workers');
  const toast = useToast();
  const [search,    setSearch]    = useState('');
  const [modal,     setModal]     = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState(emptyForm);
  const [saving,    setSaving]    = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const filtered = workers.filter(w =>
    [w.name, w.site, w.role].some(v => v?.toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd  = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (w) => { setEditing(w); setForm({ name:w.name, role:w.role, phone:w.phone||'', site:w.site, status:w.status, dailyRate:w.dailyRate||'' }); setModal(true); };
  const closeModal = () => { setModal(false); setEditing(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form, dailyRate: Number(form.dailyRate) };
      if (editing) { await updateItem(editing.id, data); toast.success(`${form.name} mis a jour.`); }
      else         { await addItem(data);                toast.success(`${form.name} ajoute.`); }
      closeModal();
    } catch { toast.error('Erreur. Reessayez.'); }
    finally  { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    try { await deleteItem(id); toast.success(`${name} supprime.`); setConfirmId(null); }
    catch { toast.error('Suppression echouee.'); }
  };

  const stColor = (s) => s === 'Active' ? '#006233' : s === 'On Leave' ? '#a16207' : '#d21034';
  const stBg    = (s) => s === 'Active' ? '#dcfce7' : s === 'On Leave' ? '#fef9c3' : '#fee2e2';

  return (
    <div className="animate-fade" style={{ padding:'2.5rem' }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'2rem' }}>
        <div>
          <h1 style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>Gestion du Personnel</h1>
          <p style={{ color:'var(--text-light)' }}>Donnees en temps reel depuis Firebase Firestore.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={20}/>Ajouter Employe</button>
      </header>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.5rem', marginBottom:'2rem' }}>
        {[
          { label:'Total',    value:workers.length,                              color:'var(--primary)', Icon:Users },
          { label:'Actifs',   value:workers.filter(w=>w.status==='Active').length,   color:'#006233',   Icon:CheckCircle },
          { label:'Conge',    value:workers.filter(w=>w.status==='On Leave').length, color:'#f59e0b',   Icon:Clock },
          { label:'Inactifs', value:workers.filter(w=>w.status==='Inactive').length, color:'#d21034',   Icon:AlertCircle },
        ].map((s,i)=>(
          <div key={i} className="card" style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <div style={{ backgroundColor:s.color+'15', color:s.color, padding:'0.875rem', borderRadius:'var(--radius-md)' }}>
              <s.Icon size={24}/>
            </div>
            <div>
              <h3 style={{ margin:0, fontSize:'1.75rem' }}>{loading?'—':s.value}</h3>
              <p style={{ margin:0, fontSize:'0.8125rem', color:'var(--text-light)', fontWeight:600 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <div style={{ padding:'1.25rem 1.5rem', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ margin:0 }}>Liste ({filtered.length})</h3>
          <div style={{ position:'relative' }}>
            <Search size={16} color="var(--text-light)" style={{ position:'absolute', left:'0.75rem', top:'50%', transform:'translateY(-50%)' }}/>
            <input type="text" placeholder="Rechercher..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{ padding:'0.5rem 1rem 0.5rem 2.25rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', minWidth:'260px' }}/>
          </div>
        </div>

        {loading ? (
          <div style={{ padding:'4rem', textAlign:'center', color:'var(--text-light)' }}>
            <Loader size={32} style={{ animation:'spin 1s linear infinite' }}/><p style={{ marginTop:'1rem' }}>Chargement Firebase...</p>
          </div>
        ) : (
          <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
            <thead style={{ backgroundColor:'var(--bg-subtle)' }}>
              <tr>{['Employe','Poste','Telephone','Chantier','Taux/Jour','Statut','Actions'].map((h,i)=>(
                <th key={i} style={{ padding:'1rem 1.5rem', fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', color:'var(--text-light)' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.length===0
                ? <tr><td colSpan={7} style={{ padding:'3rem', textAlign:'center', color:'var(--text-light)' }}>Aucun employe. Ajoutez le premier.</td></tr>
                : filtered.map(w=>(
                  <tr key={w.id} style={{ borderBottom:'1px solid var(--border)' }}>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                        <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:'linear-gradient(135deg,#006233,#3b82f6)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:800, fontSize:'0.75rem', flexShrink:0 }}>
                          {w.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <span style={{ fontWeight:700 }}>{w.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:'1.25rem 1.5rem', color:'var(--text-light)', fontSize:'0.875rem' }}>{w.role}</td>
                    <td style={{ padding:'1.25rem 1.5rem', fontSize:'0.875rem' }}>{w.phone||'—'}</td>
                    <td style={{ padding:'1.25rem 1.5rem', fontSize:'0.875rem' }}>{w.site}</td>
                    <td style={{ padding:'1.25rem 1.5rem', fontWeight:700, color:'var(--primary)' }}>{w.dailyRate?`${Number(w.dailyRate).toLocaleString('fr-DZ')} DZD`:'—'}</td>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <span style={{ backgroundColor:stBg(w.status), color:stColor(w.status), padding:'0.3rem 0.75rem', borderRadius:'999px', fontWeight:700, fontSize:'0.75rem' }}>{w.status}</span>
                    </td>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <div style={{ display:'flex', gap:'0.5rem' }}>
                        <button className="btn btn-outline" style={{ padding:'0.5rem' }} onClick={()=>openEdit(w)}><Edit2 size={16}/></button>
                        {confirmId===w.id
                          ? <><button className="btn" style={{ padding:'0.5rem', backgroundColor:'#d21034', color:'white', borderRadius:'var(--radius-sm)' }} onClick={()=>handleDelete(w.id,w.name)}>✓</button>
                              <button className="btn btn-outline" style={{ padding:'0.5rem' }} onClick={()=>setConfirmId(null)}>✕</button></>
                          : <button className="btn btn-outline" style={{ padding:'0.5rem', color:'#d21034', borderColor:'#d21034' }} onClick={()=>setConfirmId(w.id)}><Trash2 size={16}/></button>}
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.5)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div className="card" style={{ width:'100%', maxWidth:'520px', padding:'2.5rem', position:'relative', maxHeight:'90vh', overflowY:'auto' }}>
            <button onClick={closeModal} style={{ position:'absolute', top:'1.25rem', right:'1.25rem', background:'none', border:'none', cursor:'pointer' }}><X size={22} color="var(--text-light)"/></button>
            <h2 style={{ marginBottom:'1.75rem' }}>{editing?'Modifier':'Ajouter'} un Employe</h2>
            <form onSubmit={handleSubmit} style={{ display:'grid', gap:'1.25rem' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Nom Complet *</label>
                  <input required type="text" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Mohamed Benali"
                    style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', boxSizing:'border-box' }}/>
                </div>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Telephone</label>
                  <input type="text" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+213 6xx xxx xxx"
                    style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', boxSizing:'border-box' }}/>
                </div>
              </div>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Poste *</label>
                <select required value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))}
                  style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', backgroundColor:'white' }}>
                  <option value="">Selectionner un poste...</option>
                  {ROLES.map(r=><option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Chantier *</label>
                <select required value={form.site} onChange={e=>setForm(f=>({...f,site:e.target.value}))}
                  style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', backgroundColor:'white' }}>
                  <option value="">Selectionner un chantier...</option>
                  {SITES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Taux/Jour (DZD)</label>
                  <input type="number" value={form.dailyRate} onChange={e=>setForm(f=>({...f,dailyRate:e.target.value}))} placeholder="3500"
                    style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', boxSizing:'border-box' }}/>
                </div>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Statut</label>
                  <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}
                    style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', backgroundColor:'white' }}>
                    {STATUSES.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display:'flex', gap:'1rem', marginTop:'0.5rem' }}>
                <button type="button" onClick={closeModal} className="btn btn-outline" style={{ flex:1, padding:'0.875rem' }}>Annuler</button>
                <button type="submit" className="btn btn-primary" style={{ flex:1, padding:'0.875rem' }} disabled={saving}>
                  {saving?'Enregistrement...': editing?'Mettre a Jour':'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
