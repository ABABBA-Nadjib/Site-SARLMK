import React, { useState } from 'react';
import { Plus, MapPin, Users, Layers, CheckCircle2, Clock, MoreVertical, Edit2, Trash2, X, Loader } from 'lucide-react';
import { useFirestore } from '../../hooks/useFirestore';
import { useToast } from '../../contexts/ToastContext';

const SITES    = ['Hassi Messaoud','Adrar','Touggourt','Ouargla','El Oued','El Meniaa'];
const STATUSES = ['Active','Completed','Planning'];
const emptyForm = { name:'', location:'', manager:'', progress:0, status:'Active', teamSize:'', deadline:'', budget:'' };

export default function ProjectsList() {
  const { data: projects, loading, addItem, updateItem, deleteItem } = useFirestore('projects');
  const toast = useToast();
  const [modal,     setModal]     = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState(emptyForm);
  const [saving,    setSaving]    = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const openAdd  = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (p) => { setEditing(p); setForm({ name:p.name, location:p.location, manager:p.manager||'', progress:p.progress||0, status:p.status, teamSize:p.teamSize||'', deadline:p.deadline||'', budget:p.budget||'' }); setModal(true); };
  const closeModal = () => { setModal(false); setEditing(null); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const data = { ...form, progress:Number(form.progress), teamSize:Number(form.teamSize) };
      if (editing) { await updateItem(editing.id, data); toast.success(`Projet "${form.name}" mis a jour.`); }
      else         { await addItem(data);                toast.success(`Projet "${form.name}" cree.`); }
      closeModal();
    } catch { toast.error('Erreur. Reessayez.'); }
    finally  { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    try { await deleteItem(id); toast.success(`Projet supprime.`); setConfirmId(null); }
    catch { toast.error('Suppression echouee.'); }
  };

  const counts = {
    active:    projects.filter(p=>p.status==='Active').length,
    completed: projects.filter(p=>p.status==='Completed').length,
    planning:  projects.filter(p=>p.status==='Planning').length,
  };

  return (
    <div className="animate-fade" style={{ padding:'2.5rem' }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2.5rem' }}>
        <div>
          <h1 style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>Gestion des Projets</h1>
          <p style={{ color:'var(--text-light)' }}>Suivre l&#39;avancement — donnees en temps reel Firebase.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={20}/>Nouveau Projet</button>
      </header>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.5rem', marginBottom:'2.5rem' }}>
        {[
          { label:'Total',          count:projects.length, color:'var(--primary)', icon:Layers },
          { label:'En Cours',       count:counts.active,   color:'#3b82f6',        icon:Clock },
          { label:'Termines',       count:counts.completed,color:'#006233',        icon:CheckCircle2 },
          { label:'Planification',  count:counts.planning, color:'#f59e0b',        icon:Layers },
        ].map((s,i)=>(
          <div key={i} className="card" style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <div style={{ backgroundColor:s.color+'15', color:s.color, padding:'0.75rem', borderRadius:'var(--radius-sm)' }}>
              <s.icon size={20}/>
            </div>
            <div>
              <h4 style={{ margin:0, fontSize:'1.25rem' }}>{loading?'—':s.count}</h4>
              <p style={{ margin:0, fontSize:'0.75rem', color:'var(--text-light)', fontWeight:600 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        {loading ? (
          <div style={{ padding:'4rem', textAlign:'center', color:'var(--text-light)' }}>
            <Loader size={32} style={{ animation:'spin 1s linear infinite' }}/><p style={{ marginTop:'1rem' }}>Chargement Firebase...</p>
          </div>
        ) : (
          <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
            <thead style={{ backgroundColor:'var(--bg-subtle)' }}>
              <tr>{['Projet','Localisation','Responsable','Avancement','Budget','Equipe','Statut','Actions'].map((h,i)=>(
                <th key={i} style={{ padding:'1rem 1.5rem', fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', color:'var(--text-light)' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {projects.length===0
                ? <tr><td colSpan={8} style={{ padding:'3rem', textAlign:'center', color:'var(--text-light)' }}>Aucun projet. Creez le premier.</td></tr>
                : projects.map(p=>(
                  <tr key={p.id} style={{ borderBottom:'1px solid var(--border)' }}>
                    <td style={{ padding:'1.25rem 1.5rem' }}><div style={{ fontWeight:700, fontSize:'0.9375rem' }}>{p.name}</div></td>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <div style={{ fontSize:'0.8125rem', color:'var(--text-light)', display:'flex', alignItems:'center', gap:'0.25rem' }}>
                        <MapPin size={12}/>{p.location}
                      </div>
                    </td>
                    <td style={{ padding:'1.25rem 1.5rem', fontSize:'0.875rem' }}>{p.manager||'—'}</td>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', width:'140px' }}>
                        <div style={{ flex:1, height:'6px', backgroundColor:'#f1f5f9', borderRadius:'3px' }}>
                          <div style={{ width:`${p.progress||0}%`, height:'100%', backgroundColor:p.progress===100?'#006233':'var(--accent)', borderRadius:'3px' }}/>
                        </div>
                        <span style={{ fontSize:'0.8125rem', fontWeight:700 }}>{p.progress||0}%</span>
                      </div>
                    </td>
                    <td style={{ padding:'1.25rem 1.5rem', fontWeight:600, color:'var(--primary)', fontSize:'0.875rem' }}>{p.budget||'—'}</td>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', color:'var(--text-light)', fontSize:'0.875rem' }}>
                        <Users size={14}/>{p.teamSize||0}
                      </div>
                    </td>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <span className={`badge ${p.status==='Completed'?'badge-success':p.status==='Planning'?'badge-info':'badge-warning'}`}>
                        {p.status==='Completed'?'Termine':p.status==='Planning'?'Planification':'En Cours'}
                      </span>
                    </td>
                    <td style={{ padding:'1.25rem 1.5rem' }}>
                      <div style={{ display:'flex', gap:'0.5rem' }}>
                        <button className="btn btn-outline" style={{ padding:'0.5rem' }} onClick={()=>openEdit(p)}><Edit2 size={16}/></button>
                        {confirmId===p.id
                          ? <><button className="btn" style={{ padding:'0.5rem', backgroundColor:'#d21034', color:'white', borderRadius:'var(--radius-sm)' }} onClick={()=>handleDelete(p.id,p.name)}>✓</button>
                              <button className="btn btn-outline" style={{ padding:'0.5rem' }} onClick={()=>setConfirmId(null)}>✕</button></>
                          : <button className="btn btn-outline" style={{ padding:'0.5rem', color:'#d21034', borderColor:'#d21034' }} onClick={()=>setConfirmId(p.id)}><Trash2 size={16}/></button>}
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
          <div className="card" style={{ width:'100%', maxWidth:'560px', padding:'2.5rem', position:'relative', maxHeight:'90vh', overflowY:'auto' }}>
            <button onClick={closeModal} style={{ position:'absolute', top:'1.25rem', right:'1.25rem', background:'none', border:'none', cursor:'pointer' }}><X size={22} color="var(--text-light)"/></button>
            <h2 style={{ marginBottom:'1.75rem' }}>{editing?'Modifier':'Nouveau'} Projet</h2>
            <form onSubmit={handleSubmit} style={{ display:'grid', gap:'1.25rem' }}>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Nom du Projet *</label>
                <input required type="text" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Construction Route..."
                  style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', boxSizing:'border-box' }}/>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Localisation *</label>
                  <select required value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))}
                    style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', backgroundColor:'white' }}>
                    <option value="">Choisir...</option>
                    {SITES.map(s=><option key={s} value={s}>{s}</option>)}
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
                <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Responsable</label>
                <input type="text" value={form.manager} onChange={e=>setForm(f=>({...f,manager:e.target.value}))} placeholder="Ing. Mohamed Benali"
                  style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', boxSizing:'border-box' }}/>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1rem' }}>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Avancement %</label>
                  <input type="number" min="0" max="100" value={form.progress} onChange={e=>setForm(f=>({...f,progress:e.target.value}))}
                    style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', boxSizing:'border-box' }}/>
                </div>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Equipe</label>
                  <input type="number" value={form.teamSize} onChange={e=>setForm(f=>({...f,teamSize:e.target.value}))} placeholder="50"
                    style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', boxSizing:'border-box' }}/>
                </div>
                <div>
                  <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Budget (DZD)</label>
                  <input type="text" value={form.budget} onChange={e=>setForm(f=>({...f,budget:e.target.value}))} placeholder="45 000 000 DZD"
                    style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', boxSizing:'border-box' }}/>
                </div>
              </div>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.4rem' }}>Echeance</label>
                <input type="text" value={form.deadline} onChange={e=>setForm(f=>({...f,deadline:e.target.value}))} placeholder="Dec 2026"
                  style={{ width:'100%', padding:'0.75rem', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)', fontSize:'0.875rem', boxSizing:'border-box' }}/>
              </div>
              <div style={{ display:'flex', gap:'1rem', marginTop:'0.5rem' }}>
                <button type="button" onClick={closeModal} className="btn btn-outline" style={{ flex:1, padding:'0.875rem' }}>Annuler</button>
                <button type="submit" className="btn btn-primary" style={{ flex:1, padding:'0.875rem' }} disabled={saving}>
                  {saving?'Enregistrement...':editing?'Mettre a Jour':'Creer Projet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
