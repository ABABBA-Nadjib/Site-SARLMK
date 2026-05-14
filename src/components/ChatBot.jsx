import React, { useState, useRef, useEffect } from 'react';
import {
  Fab, Paper, Box, Typography, TextField, IconButton,
  Zoom, Avatar, CircularProgress, Divider, Button, Link
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import KeyIcon from '@mui/icons-material/Key';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useAI } from '../hooks/useAI';

function SetupScreen({ onSave }) {
  const [key, setKey] = useState('');
  return (
    <Box sx={{ flex: 1, p: 2.5, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, bgcolor: '#f8fafc' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ width: 56, height: 56, borderRadius: 3, bgcolor: '#006233', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
          <KeyIcon sx={{ color: 'white', fontSize: 28 }} />
        </Box>
        <Typography fontWeight={800} fontSize="1rem" color="#1a1a2e">تفعيل الذكاء الاصطناعي</Typography>
        <Typography fontSize="0.78rem" color="text.secondary" mt={0.5} lineHeight={1.5}>
          احصل على مفتاح مجاني من Google وأدخله هنا لتفعيل الذكاء الاصطناعي الحقيقي
        </Typography>
      </Box>
      <Button
        variant="outlined" size="small" endIcon={<OpenInNewIcon fontSize="small" />}
        href="https://aistudio.google.com/apikey" target="_blank"
        sx={{ borderColor: '#006233', color: '#006233', fontWeight: 700, borderRadius: 2, fontSize: '0.8rem' }}
      >
        احصل على مفتاح مجاني
      </Button>
      <TextField
        fullWidth size="small" placeholder="AIza..."
        value={key} onChange={e => setKey(e.target.value)}
        label="Gemini API Key"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '0.8rem' }, '& .MuiInputLabel-root': { fontSize: '0.8rem' } }}
      />
      <Button
        variant="contained" fullWidth disabled={key.length < 20}
        onClick={() => onSave(key.trim())}
        sx={{ bgcolor: '#006233', fontWeight: 700, borderRadius: 2, '&:hover': { bgcolor: '#005228' } }}
      >
        تفعيل الآن
      </Button>
      <Typography fontSize="0.7rem" color="text.secondary" textAlign="center">
        المفتاح يُحفظ محلياً في متصفحك فقط ✓
      </Typography>
    </Box>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const { askQuestion, loading, hasKey, saveKey } = useAI();

  useEffect(() => {
    if (open && messages.length === 0 && hasKey) {
      setMessages([{ role: 'assistant', text: 'مرحباً! 👋 أنا مساعدك الذكي. يمكنني الإجابة على أي سؤال — حول الشركة أو أي موضوع آخر. كيف يمكنني مساعدتك؟' }]);
    }
  }, [open, hasKey]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', text: question }];
    setMessages(newMessages);
    const history = newMessages.slice(-10);
    const reply = await askQuestion(question, history);
    if (reply === '__NO_KEY__' || reply === '__INVALID_KEY__') return;
    setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
  };

  return (
    <>
      <Zoom in={open} unmountOnExit>
        <Paper elevation={24} sx={{
          position: 'fixed', bottom: 96, right: 24, zIndex: 1300,
          width: { xs: 'calc(100vw - 48px)', sm: 400 },
          height: 550, borderRadius: 4,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          border: '1px solid rgba(0,162,80,0.3)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}>
          {/* Header */}
          <Box sx={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ background: 'linear-gradient(135deg, #006233, #00a651)', width: 40, height: 40, boxShadow: '0 4px 12px rgba(0,162,80,0.4)' }}>
              <SmartToyIcon fontSize="small" />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={800} color="white" fontSize="1rem">المساعد الذكي</Typography>
              <Typography fontSize="0.7rem" color={hasKey ? '#34d399' : 'rgba(255,255,255,0.4)'}>
                {hasKey ? '● متصل — AI جاهز' : '● بحاجة إلى تفعيل'}
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider />

          {!hasKey ? (
            <SetupScreen onSave={(k) => { saveKey(k); setMessages([{ role: 'assistant', text: 'تم التفعيل! 🎉 أنا الآن ذكاء اصطناعي حقيقي. اسألني أي شيء!' }]); }} />
          ) : (
            <>
              {/* Messages */}
              <Box ref={chatContainerRef} sx={{ 
                flex: 1, overflowY: 'auto', p: 2.5, display: 'flex', flexDirection: 'column', gap: 2, 
                bgcolor: '#f1f5f9', scrollBehavior: 'smooth',
                backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}>
                {messages.map((msg, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 1.5, alignItems: 'flex-end' }}>
                    {msg.role === 'assistant' && (
                      <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #006233, #00a651)', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <SmartToyIcon sx={{ fontSize: 18 }} />
                      </Avatar>
                    )}
                    <Paper sx={{
                      px: 2.5, py: 1.5, maxWidth: '85%', borderRadius: 4,
                      background: msg.role === 'user' ? 'linear-gradient(135deg, #006233, #004d28)' : 'white',
                      color: msg.role === 'user' ? 'white' : '#1e293b',
                      borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                      borderBottomLeftRadius: msg.role === 'user' ? 16 : 4,
                      boxShadow: msg.role === 'user' ? '0 4px 15px rgba(0,98,51,0.3)' : '0 4px 15px rgba(0,0,0,0.05)',
                    }}>
                      <Typography fontSize="0.9rem" lineHeight={1.7} fontWeight={500} sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', '& strong': { color: msg.role === 'user' ? '#fff' : '#006233' } }}>
                        {msg.text}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
                {loading && (
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #006233, #00a651)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <SmartToyIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Paper sx={{ px: 2.5, py: 2, borderRadius: 4, bgcolor: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                      <Box sx={{ display: 'flex', gap: 0.6, alignItems: 'center' }}>
                        {[0, 0.2, 0.4].map((d, i) => (
                          <Box key={i} sx={{ width: 8, height: 8, bgcolor: '#006233', borderRadius: '50%', animation: `bounce 1.4s ${d}s infinite ease-in-out both`, '@keyframes bounce': { '0%, 80%, 100%': { transform: 'scale(0)' }, '40%': { transform: 'scale(1)' } } }} />
                        ))}
                      </Box>
                    </Paper>
                  </Box>
                )}
              </Box>
              {/* Input */}
              <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.08)', bgcolor: 'white', display: 'flex', gap: 1.5 }}>
                <TextField
                  fullWidth size="small" placeholder="اكتب سؤالك هنا..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                  disabled={loading}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, fontSize: '0.9rem', bgcolor: '#f8fafc' } }}
                />
                <IconButton onClick={send} disabled={loading || !input.trim()}
                  sx={{ width: 40, height: 40, bgcolor: '#006233', color: 'white', borderRadius: 3, boxShadow: '0 4px 10px rgba(0,98,51,0.3)', '&:hover': { bgcolor: '#004d28' }, '&:disabled': { bgcolor: '#e2e8f0', color: '#94a3b8', boxShadow: 'none' } }}>
                  <SendIcon fontSize="small" sx={{ ml: input.trim() ? 0.5 : 0 }} />
                </IconButton>
              </Box>
            </>
          )}
        </Paper>
      </Zoom>

      <Fab onClick={() => setOpen(o => !o)} sx={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 1300,
        background: 'linear-gradient(135deg, #006233, #00a651)', color: 'white',
        boxShadow: '0 8px 25px rgba(0,162,80,0.4)',
        '&:hover': { background: 'linear-gradient(135deg, #005228, #008c45)' },
      }}>
        {open ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </>
  );
}
