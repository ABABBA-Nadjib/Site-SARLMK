import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, CircularProgress } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useFirestore } from '../../hooks/useFirestore';
import { useToast } from '../../contexts/ToastContext';

// Helper component for Tab Panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other} style={{ width: '100%' }}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// ─── EMPLOYEES TAB ────────────────────────────────────────────────────────
const EmployeesTab = () => {
  const { data, loading, addItem, updateItem, deleteItem } = useFirestore('employees');
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', phone: '', joinDate: '', salary: '', status: 'نشط' });

  const handleOpen = (item = null) => {
    if (item) {
      setEditing(item.id);
      setForm(item);
    } else {
      setEditing(null);
      setForm({ name: '', role: '', phone: '', joinDate: '', salary: '', status: 'نشط' });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing) await updateItem(editing, form);
      else await addItem(form);
      toast.success('تم الحفظ بنجاح');
      setOpen(false);
    } catch (e) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('هل أنت متأكد من الحذف؟')) {
      await deleteItem(id);
      toast.success('تم الحذف');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">إدارة العمال</Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>إضافة عامل</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>الاسم</TableCell>
              <TableCell>الوظيفة</TableCell>
              <TableCell>رقم الهاتف</TableCell>
              <TableCell>تاريخ التوظيف</TableCell>
              <TableCell>الراتب</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>إجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.joinDate}</TableCell>
                <TableCell>{row.salary}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(row)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'تعديل عامل' : 'إضافة عامل'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="الاسم" value={form.name} onChange={e => setForm({...form, name: e.target.value})} fullWidth />
          <TextField label="الوظيفة" value={form.role} onChange={e => setForm({...form, role: e.target.value})} fullWidth />
          <TextField label="رقم الهاتف" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} fullWidth />
          <TextField label="تاريخ التوظيف" type="date" InputLabelProps={{ shrink: true }} value={form.joinDate} onChange={e => setForm({...form, joinDate: e.target.value})} fullWidth />
          <TextField label="الراتب" type="number" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} fullWidth />
          <TextField label="الحالة" value={form.status} onChange={e => setForm({...form, status: e.target.value})} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleSave}>حفظ</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// ─── PROJECTS TAB ─────────────────────────────────────────────────────────
const ProjectsTab = () => {
  const { data, loading, addItem, updateItem, deleteItem } = useFirestore('projects');
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', client: '', startDate: '', deadline: '', budget: '', status: 'قيد التنفيذ' });

  const handleOpen = (item = null) => {
    if (item) {
      setEditing(item.id);
      setForm(item);
    } else {
      setEditing(null);
      setForm({ title: '', client: '', startDate: '', deadline: '', budget: '', status: 'قيد التنفيذ' });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing) await updateItem(editing, form);
      else await addItem(form);
      toast.success('تم الحفظ بنجاح');
      setOpen(false);
    } catch (e) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('هل أنت متأكد من الحذف؟')) {
      await deleteItem(id);
      toast.success('تم الحذف');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">إدارة المشاريع</Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>إضافة مشروع</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>عنوان المشروع</TableCell>
              <TableCell>العميل</TableCell>
              <TableCell>تاريخ البدء</TableCell>
              <TableCell>تاريخ التسليم</TableCell>
              <TableCell>الميزانية</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>إجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.client}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.deadline}</TableCell>
                <TableCell>{row.budget}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(row)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'تعديل مشروع' : 'إضافة مشروع'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="عنوان المشروع" value={form.title} onChange={e => setForm({...form, title: e.target.value})} fullWidth />
          <TextField label="العميل" value={form.client} onChange={e => setForm({...form, client: e.target.value})} fullWidth />
          <TextField label="تاريخ البدء" type="date" InputLabelProps={{ shrink: true }} value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} fullWidth />
          <TextField label="تاريخ التسليم" type="date" InputLabelProps={{ shrink: true }} value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} fullWidth />
          <TextField label="الميزانية" type="number" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} fullWidth />
          <TextField label="الحالة" value={form.status} onChange={e => setForm({...form, status: e.target.value})} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleSave}>حفظ</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// ─── MACHINES TAB ─────────────────────────────────────────────────────────
const MachinesTab = () => {
  const { data, loading, addItem, updateItem, deleteItem } = useFirestore('machines');
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', model: '', serialNumber: '', purchaseDate: '', status: 'تشغيلية', location: '' });

  const handleOpen = (item = null) => {
    if (item) {
      setEditing(item.id);
      setForm(item);
    } else {
      setEditing(null);
      setForm({ name: '', model: '', serialNumber: '', purchaseDate: '', status: 'تشغيلية', location: '' });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing) await updateItem(editing, form);
      else await addItem(form);
      toast.success('تم الحفظ بنجاح');
      setOpen(false);
    } catch (e) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('هل أنت متأكد من الحذف؟')) {
      await deleteItem(id);
      toast.success('تم الحذف');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">إدارة الآلات</Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>إضافة آلة</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>اسم الآلة</TableCell>
              <TableCell>الموديل</TableCell>
              <TableCell>الرقم التسلسلي</TableCell>
              <TableCell>تاريخ الشراء</TableCell>
              <TableCell>الموقع</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>إجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell>{row.serialNumber}</TableCell>
                <TableCell>{row.purchaseDate}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(row)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'تعديل آلة' : 'إضافة آلة'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="اسم الآلة" value={form.name} onChange={e => setForm({...form, name: e.target.value})} fullWidth />
          <TextField label="الموديل" value={form.model} onChange={e => setForm({...form, model: e.target.value})} fullWidth />
          <TextField label="الرقم التسلسلي" value={form.serialNumber} onChange={e => setForm({...form, serialNumber: e.target.value})} fullWidth />
          <TextField label="تاريخ الشراء" type="date" InputLabelProps={{ shrink: true }} value={form.purchaseDate} onChange={e => setForm({...form, purchaseDate: e.target.value})} fullWidth />
          <TextField label="الموقع الحالي" value={form.location} onChange={e => setForm({...form, location: e.target.value})} fullWidth />
          <TextField label="الحالة" value={form.status} onChange={e => setForm({...form, status: e.target.value})} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleSave}>حفظ</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// ─── MATERIALS TAB ────────────────────────────────────────────────────────
const MaterialsTab = () => {
  const { data, loading, addItem, updateItem, deleteItem } = useFirestore('materials');
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', unit: '', currentQuantity: '', minQuantity: '', supplier: '', lastDelivery: '' });

  const handleOpen = (item = null) => {
    if (item) {
      setEditing(item.id);
      setForm(item);
    } else {
      setEditing(null);
      setForm({ name: '', unit: '', currentQuantity: '', minQuantity: '', supplier: '', lastDelivery: '' });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing) await updateItem(editing, form);
      else await addItem(form);
      toast.success('تم الحفظ بنجاح');
      setOpen(false);
    } catch (e) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('هل أنت متأكد من الحذف؟')) {
      await deleteItem(id);
      toast.success('تم الحذف');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">إدارة المواد</Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>إضافة مادة</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>اسم المادة</TableCell>
              <TableCell>الوحدة</TableCell>
              <TableCell>الكمية الحالية</TableCell>
              <TableCell>الحد الأدنى</TableCell>
              <TableCell>المورد</TableCell>
              <TableCell>آخر توريد</TableCell>
              <TableCell>إجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>{row.currentQuantity}</TableCell>
                <TableCell>{row.minQuantity}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.lastDelivery}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(row)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'تعديل مادة' : 'إضافة مادة'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="اسم المادة" value={form.name} onChange={e => setForm({...form, name: e.target.value})} fullWidth />
          <TextField label="الوحدة (طن/متر/قطعة)" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} fullWidth />
          <TextField label="الكمية الحالية" type="number" value={form.currentQuantity} onChange={e => setForm({...form, currentQuantity: e.target.value})} fullWidth />
          <TextField label="الحد الأدنى" type="number" value={form.minQuantity} onChange={e => setForm({...form, minQuantity: e.target.value})} fullWidth />
          <TextField label="المورد" value={form.supplier} onChange={e => setForm({...form, supplier: e.target.value})} fullWidth />
          <TextField label="آخر توريد" type="date" InputLabelProps={{ shrink: true }} value={form.lastDelivery} onChange={e => setForm({...form, lastDelivery: e.target.value})} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleSave}>حفظ</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// ─── MAIN ADMIN DASHBOARD ─────────────────────────────────────────────────
export default function AdminDashboard() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ p: 4, width: '100%', direction: 'rtl' }}>
      <Typography variant="h4" mb={3} fontWeight="bold" color="primary.main">
        لوحة التحكم الإدارية
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
          <Tab label="العمال (Employees)" />
          <Tab label="المشاريع (Projects)" />
          <Tab label="الآلات (Machines)" />
          <Tab label="المواد (Materials)" />
        </Tabs>
      </Box>

      <TabPanel value={tabIndex} index={0}>
        <EmployeesTab />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <ProjectsTab />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <MachinesTab />
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <MaterialsTab />
      </TabPanel>
    </Box>
  );
}
