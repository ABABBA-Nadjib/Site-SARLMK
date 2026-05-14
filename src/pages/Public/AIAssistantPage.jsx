import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Container, Typography, TextField, IconButton, Paper, Avatar,
  CircularProgress, Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { useAI } from '../../hooks/useAI';

const SUGGESTIONS = [
  "Quels sont vos services?",
  "Comment vous contacter?",
  "Où êtes-vous situés?",
  "Combien de projets avez-vous réalisés?",
  "Quelles régions couvrez-vous?",
];

export default function AIAssistantPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const { askQuestion, loading } = useAI();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const question = (text || input).trim();
    if (!question || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    const reply = await askQuestion(question);
    setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--bg)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Background Orbs */}
      <div className="orb" style={{ top: '10%', left: '-5%', width: '400px', height: '400px', background: 'var(--accent)', opacity: 0.15 }}></div>
      <div className="orb" style={{ bottom: '20%', right: '-10%', width: '500px', height: '500px', background: 'var(--primary)', opacity: 0.1, animationDelay: '2s' }}></div>

      {/* Header */}
      <Box sx={{ 
        position: 'relative', 
        zIndex: 10,
        background: 'linear-gradient(135deg, rgba(0, 77, 40, 0.95), rgba(0, 24, 12, 0.85))', 
        py: { xs: 4, md: 8 }, 
        textAlign: 'center',
        borderBottom: '4px solid var(--accent)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
      }}>
        <Container maxWidth="md">
          <Box sx={{
            width: 80, height: 80, mx: 'auto', mb: 3, borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--accent), #b89327)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-gold)',
            animation: 'float 6s ease-in-out infinite'
          }}>
            <SmartToyIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="h3" fontWeight={800} color="white" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif' }}>
            Assistant Virtuel
          </Typography>
          <Typography color="rgba(255,255,255,0.7)" fontSize="1.15rem" maxWidth={600} mx="auto" lineHeight={1.6}>
            Posez vos questions sur nos services, projets et activités. Alimenté par l'Intelligence Artificielle de Google Gemini.
          </Typography>
        </Container>
      </Box>

      {/* Chat Area */}
      <Container maxWidth="md" sx={{ flex: 1, py: 6, display: 'flex', flexDirection: 'column', gap: 3, position: 'relative', zIndex: 10 }}>

        {/* Welcome / Empty State */}
        {messages.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }} className="animate-fade">
            <Typography variant="h5" fontWeight={700} color="var(--primary)" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif' }}>
              Comment puis-je vous aider aujourd'hui ?
            </Typography>
            <Typography color="var(--text-light)" mb={5} fontSize="1.1rem">
              Choisissez une suggestion ou posez votre propre question.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', maxWidth: '800px', mx: 'auto' }}>
              {SUGGESTIONS.map((s, i) => (
                <Chip
                  key={i}
                  label={s}
                  icon={<LightbulbOutlinedIcon style={{ color: 'var(--accent)' }} />}
                  onClick={() => send(s)}
                  clickable
                  sx={{
                    bgcolor: 'var(--bg-white)', fontWeight: 600, fontSize: '0.95rem',
                    border: '1px solid var(--border)', py: 2.5, px: 1,
                    borderRadius: '999px',
                    transition: 'all 0.3s ease',
                    boxShadow: 'var(--shadow-sm)',
                    '&:hover': { bgcolor: 'var(--bg-subtle)', borderColor: 'var(--accent)', transform: 'translateY(-2px)', boxShadow: 'var(--shadow-md)' },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <Box key={i} className="animate-fade" sx={{ display: 'flex', gap: 2, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end' }}>
            {msg.role === 'assistant' && (
              <Avatar sx={{ background: 'linear-gradient(135deg, var(--accent), #b89327)', width: 44, height: 44, flexShrink: 0, boxShadow: 'var(--shadow-gold)' }}>
                <SmartToyIcon />
              </Avatar>
            )}
            <Paper
              elevation={0}
              sx={{
                px: 3.5, py: 2.5, maxWidth: { xs: '85%', md: '75%' },
                background: msg.role === 'user' ? 'linear-gradient(135deg, var(--primary-light), var(--primary))' : 'var(--bg-white)',
                color: msg.role === 'user' ? 'white' : 'var(--text)',
                borderRadius: 'var(--radius-xl)',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : 'var(--radius-xl)',
                borderBottomLeftRadius: msg.role === 'user' ? 'var(--radius-xl)' : '4px',
                boxShadow: msg.role === 'user' ? '0 8px 25px rgba(0, 77, 40, 0.25)' : 'var(--shadow-md)',
                border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
              }}
            >
              <Typography lineHeight={1.8} fontSize="1.05rem" sx={{ whiteSpace: 'pre-wrap' }}>
                {msg.text.replace(/\*\*(.*?)\*\*/g, (_, t) => t)}
              </Typography>
            </Paper>
            {msg.role === 'user' && (
              <Avatar sx={{ bgcolor: 'var(--primary)', width: 44, height: 44, flexShrink: 0, boxShadow: 'var(--shadow-md)' }}>
                <PersonIcon />
              </Avatar>
            )}
          </Box>
        ))}

        {/* Loading */}
        {loading && (
          <Box className="animate-fade" sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar sx={{ background: 'linear-gradient(135deg, var(--accent), #b89327)', width: 44, height: 44, boxShadow: 'var(--shadow-gold)' }}>
              <SmartToyIcon />
            </Avatar>
            <Paper elevation={0} sx={{ px: 4, py: 2.5, borderRadius: 'var(--radius-xl)', borderBottomLeftRadius: '4px', bgcolor: 'var(--bg-white)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
              <CircularProgress size={24} sx={{ color: 'var(--accent)' }} />
            </Paper>
          </Box>
        )}
        <div ref={bottomRef} style={{ height: '20px' }} />
      </Container>

      {/* Input Bar */}
      <Box sx={{ 
        position: 'sticky', bottom: 0, 
        bgcolor: 'rgba(255,255,255,0.9)', 
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)', 
        py: 3, 
        zIndex: 100,
        boxShadow: '0 -10px 30px rgba(0,0,0,0.03)' 
      }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              fullWidth
              multiline maxRows={3}
              placeholder="Écrivez votre message ici..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 'var(--radius-lg)',
                  bgcolor: 'white',
                  fontSize: '1.05rem',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                  '&:hover fieldset': { borderColor: 'var(--accent)' },
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary)', borderWidth: '2px' },
                },
              }}
            />
            <IconButton
              onClick={() => send()}
              disabled={loading || !input.trim()}
              sx={{
                width: 56, height: 56, flexShrink: 0,
                background: 'linear-gradient(135deg, var(--primary-light), var(--primary))', 
                color: 'white', 
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 15px rgba(0, 77, 40, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(0, 77, 40, 0.3)' },
                '&:disabled': { background: '#cbd5e1', color: 'white', boxShadow: 'none' },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
