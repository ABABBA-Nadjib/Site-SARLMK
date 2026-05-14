import React from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Button, Chip, Avatar
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import RoadIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import OilIcon from '@mui/icons-material/LocalGasStation';
import CityIcon from '@mui/icons-material/LocationCity';
import PipelineIcon from '@mui/icons-material/Sensors';
import BridgeIcon from '@mui/icons-material/Abc';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SERVICES = [
  {
    id: 1,
    title: 'Construction de Routes & Autoroutes',
    shortDesc: 'Développement de routes et d\'infrastructures à travers plusieurs régions du sud algérien.',
    fullDesc: 'Nous concevons et construisons des routes primaires, secondaires et des autoroutes dans les conditions les plus exigeantes du désert algérien. Notre expertise couvre le terrassement, l\'asphaltage, la signalisation et les ouvrages d\'art.',
    icon: RoadIcon,
    color: '#3b82f6',
    features: ['Terrassement & nivellement', 'Asphaltage et revêtement', 'Signalisation routière', 'Ouvrages d\'art'],
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'Génie Civil & Bâtiment (BTP)',
    shortDesc: 'Projets de génie civil et de construction avec des standards élevés de qualité et de précision.',
    fullDesc: 'Notre division BTP prend en charge la construction de bâtiments industriels, de logements, d\'écoles et d\'infrastructures publiques. Nous gérons chaque phase du projet, de la conception à la livraison clé en main.',
    icon: BuildIcon,
    color: '#006233',
    features: ['Bâtiments industriels', 'Logements collectifs', 'Infrastructures publiques', 'Gestion clé en main'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    title: 'Services Pétrole & Gaz',
    shortDesc: 'Services spécialisés pour Sonatrach, Schlumberger et d\'autres grandes entreprises du secteur.',
    fullDesc: 'En collaboration avec les leaders de l\'industrie énergétique, nous fournissons des services de construction et de maintenance pour les installations pétrolières et gazières. Nos équipes certifiées interviennent dans les zones les plus isolées du Sahara.',
    icon: OilIcon,
    color: '#f59e0b',
    features: ['Construction de facilities pétrolières', 'Maintenance industrielle', 'Pipeline & canalisations', 'Zones HSE certifiées'],
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    title: 'Développement Urbain',
    shortDesc: 'Aménagement urbain et développement de nouvelles zones résidentielles et commerciales.',
    fullDesc: 'Nous participons activement au développement des villes du sud algérien, en construisant des quartiers résidentiels, des espaces commerciaux et en rénovant les infrastructures urbaines existantes pour améliorer la qualité de vie.',
    icon: CityIcon,
    color: '#8b5cf6',
    features: ['Aménagement de quartiers', 'Réseaux d\'utilités', 'Espaces publics', 'Rénovation urbaine'],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    title: 'Pipelines & Canalisations',
    shortDesc: 'Installation et maintenance de réseaux de pipelines pour le transport d\'hydrocarbures.',
    fullDesc: 'Notre équipe spécialisée installe et maintient des réseaux de pipelines pour le transport du pétrole brut, du gaz naturel et des produits raffinés. Nous intervenons sur des distances de plusieurs centaines de kilomètres.',
    icon: PipelineIcon,
    color: '#ec4899',
    features: ['Pipelines d\'hydrocarbures', 'Réseaux de gaz', 'Tests de pression', 'Maintenance préventive'],
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Nos Services | SARL STE FI S MAKDOUD ENTREPRENEUR</title>
        <meta name="description" content="Découvrez les services de SARL STE FI S MAKDOUD: construction de routes, génie civil, services pétroliers, développement urbain et pipelines." />
      </Helmet>

      {/* Hero */}
      <Box sx={{
        py: 12, textAlign: 'center',
        background: 'linear-gradient(to bottom, rgba(10,15,30,0.92), rgba(10,15,30,0.75)), url("https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000") center/cover',
        color: 'white',
      }}>
        <Container maxWidth="md">
          <Chip label="BTP · Pétrole & Gaz · Infrastructure" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', mb: 3, fontWeight: 600 }} />
          <Typography variant="h2" fontWeight={800} gutterBottom sx={{ lineHeight: 1.2 }}>
            Nos Services & Expertises
          </Typography>
          <Typography fontSize="1.2rem" color="rgba(255,255,255,0.75)" maxWidth={600} mx="auto">
            30+ années d'expérience dans les travaux publics et l'industrie pétrolière au sud de l'Algérie.
          </Typography>
        </Container>
      </Box>

      {/* Services List */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          const isEven = i % 2 === 0;
          return (
            <Box key={service.id} sx={{ mb: 10 }}>
              <Grid container spacing={6} alignItems="center" direction={isEven ? 'row' : 'row-reverse'}>
                {/* Image */}
                <Grid item xs={12} md={5}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={service.image}
                      alt={service.title}
                      sx={{ width: '100%', borderRadius: 4, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                    />
                    <Box sx={{
                      position: 'absolute', top: -16, left: isEven ? -16 : 'auto', right: isEven ? 'auto' : -16,
                      width: 64, height: 64, bgcolor: service.color, borderRadius: 3,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 8px 24px ${service.color}60`,
                    }}>
                      <Icon sx={{ color: 'white', fontSize: 32 }} />
                    </Box>
                  </Box>
                </Grid>

                {/* Content */}
                <Grid item xs={12} md={7}>
                  <Typography variant="h4" fontWeight={800} gutterBottom color="#1a1a2e">
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary" lineHeight={1.8} mb={3} fontSize="1.05rem">
                    {service.fullDesc}
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 4 }}>
                    {service.features.map((f, fi) => (
                      <Box key={fi} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon sx={{ color: service.color, fontSize: 20 }} />
                        <Typography fontWeight={600} fontSize="0.9rem">{f}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    component={Link}
                    to="/contact"
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: service.color, px: 3, py: 1.5, fontWeight: 700, borderRadius: 3,
                      boxShadow: `0 6px 20px ${service.color}50`,
                      '&:hover': { bgcolor: service.color, filter: 'brightness(0.9)' },
                    }}
                  >
                    Demander ce Service
                  </Button>
                </Grid>
              </Grid>
              {i < SERVICES.length - 1 && <Box sx={{ mt: 10, borderBottom: '1px solid rgba(0,0,0,0.06)' }} />}
            </Box>
          );
        })}
      </Container>

      {/* CTA */}
      <Box sx={{ bgcolor: '#0a0f1e', py: 10, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={800} color="white" gutterBottom>
            Un projet en tête?
          </Typography>
          <Typography color="rgba(255,255,255,0.6)" fontSize="1.1rem" mb={4}>
            Contactez notre équipe pour une consultation gratuite. Nous sommes prêts à vous accompagner.
          </Typography>
          <Button
            component={Link} to="/contact"
            variant="contained" size="large"
            sx={{
              background: 'linear-gradient(135deg, #006233, #00a651)',
              px: 5, py: 1.8, fontSize: '1.1rem', fontWeight: 700, borderRadius: 3,
              boxShadow: '0 8px 30px rgba(0,162,80,0.4)',
            }}
          >
            Contactez-nous Maintenant
          </Button>
        </Container>
      </Box>
    </>
  );
}
