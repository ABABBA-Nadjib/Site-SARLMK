import React, { useState } from 'react';
import { Truck, Settings, AlertTriangle, CheckCircle, Clock, Plus, Search, Wrench, Edit2, Trash2, X, Loader, MapPin } from 'lucide-react';
import { useFirestore } from '../../hooks/useFirestore';
import { useToast } from '../../contexts/ToastContext';

const TYPES   = ['Grue Lourde','Terrassement','Logistique','Energie','Voirie','Compactage','Transport'];
const SITES   = ['Route Hassi Messaoud','Pipeline Adrar','Developpement Urbain Touggourt','Facility Petroliere Ouargla','Route El Oued','Route El Meniaa','Atelier Central Touggourt'];
const STATUSES= ['Operational','Maintenance','Standby'];
const emptyForm = { name:'', type:'', site:'', status:'Operational', health:85 };

export default function Equipment() {
  const { data: fleet, loading, addItem, updateItem, deleteItem } = useFirestore('equipment');
  const toast = useToast();
  const [search,    setSearch]    = useState('');
  const [modal,     setModal]     = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState(emptyForm);
  const [saving,    setSaving]    = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const filtered = fleet.filter(item =>
    [item.name, item.site, item.type].some(v => v?.toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd  = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ name:item.name, type:item.type||'', site:item.site, status:item.status, health:item.health||85 }); setModal(true); };
  const closeModal = () => { setModal(false); setEditing(null); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const data = { ...form, health:Number(form.health) };
      if (editing) { await updateItem(editing.id, data); toast.success(`${form.name} mis a jour.`); }
      else         { await addItem(data);                toast.success(`${form.name} enregistre.`); }
      closeModal();
    } catch { toast.error('Erreur. Reessayez.'); }
    finally  { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    try { await deleteItem(id); toast.success(`Engin supprime.`); setConfirmId(null); }
    catch { toast.error('Suppression echouee.'); }
  };

  const healthColor = (h) => h > 80 ? '#006233' : h > 50 ? '#f59e0b' : '#d21034';
  const counts = {
    operational: fleet.filter(f=>f.status==='Operational').length,
    maintenance: fleet.filter(f=>f.status==='Maintenance').length,
    standby:     fleet.filter(f=>f.status==='Standby').length,
  };

  return (
    <div className="animate-fade" style={{ padding:'2.5rem' }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2.5rem' }}>
        <div>
          <h1 style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>Gestion du Parc Materiel</h1>
          <p style={{ color:'var(--text-light)' }}>Suivi des engins lourds — donnees Firebase en temps reel.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={20}/>Enregistrer un Engin</button>
      </header>

      <div className="dashboard-grid" style={{ marginBottom:'2.5rem' }}>
        {[
          { label:'Total Engins',    value:fleet.length,        icon:Truck,         color:'var(--primary)' },
          { label:'Operationnels',   value:counts.operational,  icon:CheckCircle,   color:'#006233' },
          { label:'En Maintenance',  value:counts.maintenance,  icon:Settings,      color:'#f59e0b' },
          { label:'En Attente',      value:counts.standby,      icon:AlertTriangle, color:'#d21034' },
        ].map((s,i)=>(
          <div key={i} className="card" style={{ display:'flex', alignItems:'center', gap:'1.25rem' }}>
            <div style={{ backgroundColor:s.color+'15', color:s.color, padding:'1rem', borderRadius:'var(--radius-md)' }}><s.icon size={28}/></div>
            <div>
              <h4 style={{ margin:0, fontSize:'1.5rem' }}>{loading?'—':s.value}</h4>
              <p style={{ margin:0, fontSize:'0.875rem', color:'var(--text-light)', fontWeight:600 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <div style={{ padding:'1.5rem', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ margin:0 }}>Inventaire ({filtered.length})</h3>
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
              <tr>{['Engin','Type','Chantier','Statut','Sante','Actions'].map((h,i)=>(
                <th key={i} style={{ padding:'1rem 1.5rem', fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', color:'var(--text-light)' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.length===0
                ? <tr><td colSpan={6} style={{ padding:'3rem', textAlign:'center', color:'var(--text-light)' }}>Aucun engin enregistre.</td></tr>
                : filtered.map(item=>(
                  <tr key={item.id} style={{ borderBottom:'1px solid var(--border)' }}>
                    <td style={{ padding:'1.25rem 1.5rem', fontWeight:600 }}>{item.name}</td>
                    <td style={{ padding:'1.25rem 1.5rem', color:'var(--text-light)', fontSize:'0.875rem' }}>{item.type}</td>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.875rem' }}>
                        <MapPin size={14} color="var(--text-light)"/>{item.site}
                      </div>
                    </td>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <span className={`badge ${item.status==='Operational'?'badge-success':item.status==='Standby'?'badge-info':'badge-warning'}`}>
                        {item.status==='Operational'?'Operationnel':item.status==='Standby'?'En Attente':'Maintenance'}
                      </span>
                    </td>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                        <div style={{ width:'80px', height:'6px', backgroundColor:'#f1f5f9', borderRadius:'3px' }}>
                          <div style={{ width:`${item.health||0}%`, height:'100%', backgroundColor:healthColor(item.health||0), borderRadius:'3px' }}/>
                        </div>
                        <span style={{ fontSize:'0.8125rem', fontWeight:700 }}>{item.health||0}%</span>
                      </div>
                    </td>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <div style={{ display:'flex', gap:'0.5rem' }}>
                        <button className="btn btn-outline" style={{ padding:'0.5rem' }} onClick={()=>openEdit(item)}><Edit2 size={16}/></button>
                        {confirmId===item.id
                          ? <><button className="btn" style={{ padding:'0.5rem', backgroundColor:'#d21034', color:'white', borderRadius:'var(--radius-sm)' }} onClick={()=>handleDelete(item.id,item.name)}>✓</button>
                              <button className="btn btn-outline" style={{ padding:'0.5rem' }} onClick={()=>setConfirmId(null)}>✕</button></>
                          : <button className="btn btn-outline" style={{ padding:'0.5rem', color:'#d21034', borderColor:'#d21034' }} onClick={()=>setConfirmId(item.id)}><Trash2 size={16}/></button>}
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.5)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div className="card" style={{ width:'100%', maxWidth:'520px', padding:'2.5rem', position:'relative' }}>
            <button onClick={closeModal} style={{ position:'absolute', top:'1.25rem', right:'1.25rem', background:'none', border:'none', cursor:'pointer' }}><X size={22} color="var(--text-light)"/></button>
            <h2 style={{ marginBottom:'1.75rem' }}>{editing?'Modifier':'Enregistrer'} un Engin</h2>
            <form onSubmit={handleSubmit} style={{ display:'grid', gap:'1.25rem' }}>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Nom de l&#39;Engin *</label>
                <input required type="text" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Excavatrice CAT 320"
                  style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', boxSizing:'border-box' }}/>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Categorie</label>
                  <select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}
                    style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', backgroundColor:'white' }}>
                    <option value="">Choisir...</option>
                    {TYPES.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Statut</label>
                  <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}
                    style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', backgroundColor:'white' }}>
                    {STATUSES.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Chantier *</label>
                <select required value={form.site} onChange={e=>setForm(f=>({...f,site:e.target.value}))}
                  style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', backgroundColor:'white' }}>
                  <option value="">Choisir...</option>
                  {SITES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Etat de Sante: {form.health}%</label>
                <input type="range" min="0" max="100" value={form.health} onChange={e=>setForm(f=>({...f,health:e.target.value}))}
                  style={{ width:'100%', accentColor:healthColor(Number(form.health)) }}/>
              </div>
              <div style={{ display:'flex', gap:'1rem', marginTop:'0.5rem' }}>
                <button type="button" onClick={closeModal} className="btn btn-outline" style={{ flex:1, padding:'0.875rem' }}>Annuler</button>
                <button type="submit" className="btn btn-primary" style={{ flex:1, padding:'0.875rem' }} disabled={saving}>
                  {saving?'Enregistrement...':editing?'Mettre a Jour':'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
