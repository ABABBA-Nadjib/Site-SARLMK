import React, { useState } from 'react';
import {
  Box, Container, Grid, Typography, TextField, Button,
  Paper, Alert, Chip, CircularProgress
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await addDoc(collection(db, 'contacts'), { ...form, createdAt: serverTimestamp(), status: 'unread' });
      setSent(true);
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de l\'envoi. Veuillez réessayer ou appeler directement.');
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    { icon: LocationOnIcon, label: 'Adresse', value: 'Cité Ayad, Teyissebsa\nTouggourt, Algérie', color: '#006233' },
    { icon: PhoneIcon, label: 'Téléphone', value: '+213 795 101 097', color: '#3b82f6' },
    { icon: EmailIcon, label: 'Email', value: 'Fils-Makdoud@gmail.com', color: '#f59e0b' },
  ];

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '&:hover fieldset': { borderColor: '#006233' },
      '&.Mui-focused fieldset': { borderColor: '#006233' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#006233' },
  };

  return (
    <>
      <Helmet>
        <title>Contact | SARL STE FI S MAKDOUD ENTREPRENEUR</title>
        <meta name="description" content="Contactez SARL STE FI S MAKDOUD - Téléphone, email, adresse et formulaire de contact." />
      </Helmet>

      {/* Hero */}
      <Box sx={{
        py: 10, textAlign: 'center',
        background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 100%)',
        color: 'white',
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={800} gutterBottom>Contactez-Nous</Typography>
          <Typography color="rgba(255,255,255,0.65)" fontSize="1.1rem">
            Notre équipe est disponible du dimanche au jeudi, 8h - 17h (GMT+1).
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6}>
          {/* Left: Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={800} gutterBottom color="#1a1a2e">
              Informations de Contact
            </Typography>
            <Typography color="text.secondary" mb={4} lineHeight={1.8}>
              Basée à Touggourt, SARL STE FI S MAKDOUD opère dans 6+ régions du sud algérien.
              N'hésitez pas à nous contacter pour tout projet ou consultation.
            </Typography>

            {contacts.map((c, i) => {
              const Icon = c.icon;
              return (
                <Box key={i} sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-start' }}>
                  <Box sx={{
                    width: 48, height: 48, borderRadius: 2, flexShrink: 0,
                    bgcolor: `${c.color}15`, color: c.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon />
                  </Box>
                  <Box>
                    <Typography fontWeight={700} fontSize="0.875rem" color="text.secondary" mb={0.5}>{c.label}</Typography>
                    <Typography fontWeight={600} color="#1a1a2e" sx={{ whiteSpace: 'pre-line' }}>{c.value}</Typography>
                  </Box>
                </Box>
              );
            })}

            {/* Regions */}
            <Box sx={{ mt: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)' }}>
              <Typography fontWeight={700} fontSize="0.8rem" color="text.secondary" mb={2} textTransform="uppercase" letterSpacing="0.05em">
                Zones d'Intervention
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {['Touggourt', 'Ouargla', 'Hassi Messaoud', 'Adrar', 'El Oued', 'El Meniaa'].map((z, i) => (
                  <Chip key={i} label={z} size="small" sx={{ bgcolor: '#e8f5e9', color: '#006233', fontWeight: 600 }} />
                ))}
              </Box>
            </Box>

            {/* Map placeholder */}
            <Box sx={{
              mt: 4, height: 200, borderRadius: 3, overflow: 'hidden',
              background: 'linear-gradient(135deg, #e8f5e9, #f0fdf4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(0,98,51,0.1)',
            }}>
              <Box textAlign="center">
                <LocationOnIcon sx={{ fontSize: 40, color: '#006233', mb: 1 }} />
                <Typography fontWeight={700} color="#006233">Touggourt, Algérie</Typography>
                <Typography fontSize="0.8rem" color="text.secondary">Cité Ayad, Teyissebsa</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right: Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
              <Typography variant="h5" fontWeight={800} gutterBottom color="#1a1a2e">
                Envoyez-nous un Message
              </Typography>
              <Typography color="text.secondary" mb={4}>
                Remplissez le formulaire ci-dessous. Notre équipe vous répondra sous 24h.
              </Typography>

              {sent ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <CheckCircleIcon sx={{ fontSize: 64, color: '#006233', mb: 2 }} />
                  <Typography variant="h5" fontWeight={700} color="#006233" gutterBottom>
                    Message envoyé avec succès!
                  </Typography>
                  <Typography color="text.secondary" mb={4}>
                    Nous vous répondrons dans les 24 heures. Merci de nous avoir contactés.
                  </Typography>
                  <Button variant="outlined" onClick={() => setSent(false)} sx={{ borderColor: '#006233', color: '#006233' }}>
                    Envoyer un autre message
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth required label="Nom Complet" name="name" value={form.name}
                        onChange={handleChange} sx={inputSx} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth required label="Email" name="email" type="email" value={form.email}
                        onChange={handleChange} sx={inputSx} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Téléphone" name="phone" value={form.phone}
                        onChange={handleChange} sx={inputSx} placeholder="+213 ..." />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth required label="Sujet" name="subject" value={form.subject}
                        onChange={handleChange} sx={inputSx} placeholder="Construction, Devis, Partenariat..." />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth required multiline rows={5} label="Votre Message"
                        name="message" value={form.message} onChange={handleChange} sx={inputSx}
                        placeholder="Décrivez votre projet ou votre demande..." />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit" variant="contained" fullWidth size="large"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <SendIcon />}
                        sx={{
                          py: 1.8, fontSize: '1rem', fontWeight: 700, borderRadius: 3,
                          background: 'linear-gradient(135deg, #006233, #00a651)',
                          boxShadow: '0 6px 20px rgba(0,98,51,0.35)',
                          '&:hover': { background: 'linear-gradient(135deg, #005228, #008c45)' },
                        }}
                      >
                        {loading ? 'Envoi en cours...' : 'Envoyer le Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
