import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemText, Box, Divider, useScrollTrigger, Slide
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ConstructionIcon from '@mui/icons-material/Construction';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const navLinks = [
  { name: 'Accueil',    path: '/' },
  { name: 'À Propos',   path: '/about' },
  { name: 'Services',   path: '/services' },
  { name: 'Projets',    path: '/projects' },
  { name: 'Assistant IA', path: '/ai-assistant' },
  { name: 'Contact',    path: '/contact' },
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>;
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            background: 'linear-gradient(to right, #0a0f1e, #0d1b2a)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Toolbar sx={{ maxWidth: 1280, mx: 'auto', width: '100%', px: { xs: 2, md: 4 }, py: 0.5 }}>
            {/* Logo */}
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', flexGrow: 1 }}>
              <Box sx={{
                background: 'linear-gradient(135deg, #006233, #00a651)',
                p: 1, borderRadius: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <ConstructionIcon sx={{ color: 'white', fontSize: 22 }} />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', color: 'white', lineHeight: 1.1 }}>
                  STE FI S MAKDOUD
                </Typography>
                <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  ENTREPRENEUR · BTP · Est. 1996
                </Typography>
              </Box>
            </Box>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    sx={{
                      color: active ? '#00e676' : 'rgba(255,255,255,0.75)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      px: 1.5,
                      py: 0.8,
                      borderRadius: 2,
                      textTransform: 'none',
                      position: 'relative',
                      '&:hover': { color: 'white', backgroundColor: 'rgba(255,255,255,0.06)' },
                      '&::after': active ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%',
                        height: 2,
                        backgroundColor: '#00e676',
                        borderRadius: 1,
                      } : {},
                    }}
                  >
                    {link.name}
                  </Button>
                );
              })}
              <Button
                component={Link}
                to="/admin/login"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  ml: 2,
                  background: 'linear-gradient(135deg, #006233, #00a651)',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2.5,
                  boxShadow: '0 4px 15px rgba(0,162,80,0.3)',
                  '&:hover': { background: 'linear-gradient(135deg, #005228, #008c45)', boxShadow: '0 6px 20px rgba(0,162,80,0.4)' },
                }}
              >
                Portail ERP
              </Button>
            </Box>

            {/* Mobile Hamburger */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>

          {/* Algerian flag accent line */}
          <Box sx={{ height: 3, background: 'linear-gradient(to right, #006233 50%, white 50%, white 55%, #d21034 55%)', opacity: 0.6 }} />
        </AppBar>
      </HideOnScroll>

      {/* Toolbar spacer */}
      <Toolbar sx={{ minHeight: { xs: '60px !important', md: '70px !important' } }} />
      <Box sx={{ height: 3 }} />

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, background: '#0a0f1e', color: 'white' } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontWeight={800} color="white">Menu</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton
                component={Link}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  py: 1.5, px: 3,
                  color: location.pathname === link.path ? '#00e676' : 'rgba(255,255,255,0.75)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' },
                }}
              >
                <ListItemText primary={link.name} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ p: 2 }}>
            <Button
              component={Link}
              to="/admin/login"
              variant="contained"
              fullWidth
              onClick={() => setDrawerOpen(false)}
              sx={{
                background: 'linear-gradient(135deg, #006233, #00a651)',
                fontWeight: 700, textTransform: 'none', borderRadius: 2,
              }}
            >
              Portail ERP
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
