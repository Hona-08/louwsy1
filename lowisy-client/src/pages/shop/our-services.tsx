// @mui
import { styled } from '@mui/material/styles';
import {
  Grid,
  Container,
  ImageList,
  ImageListItem,
  Typography,
  Box,
  Card,
  CardMedia,
  CardHeader,
} from '@mui/material';

import CleanHandsIcon from '@mui/icons-material/CleanHands';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import HandshakeIcon from '@mui/icons-material/Handshake';
// layouts
import Layout from '../../layouts';
// _mock
import { _mapContact } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import { ContactHero, ContactForm, ContactMap } from '../../sections/contact';
import ShopFooter from '../../layouts/shop/ShopFooter';
import ShopHeader from '../../layouts/shop/ShopHeader';
import ServicesHero from 'src/sections/services/ServicesHero';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

// Contact.getLayout = function getLayout(page: React.ReactElement) {
//   return <Layout variant="main">{page}</Layout>;
// };

// ----------------------------------------------------------------------

export default function Services() {
  return (
    <Page title="Our Services">
      <ShopHeader />
      <RootStyle>
        <ServicesHero />

        <Container sx={{ my: 10 }}>
          <Grid
            container
            spacing={5}
            sx={{
              fontSize: '70px',
              color: 'black',
              mb: { md: 5 },
            }}
          >
            <Grid item xs={6} md={4}>
              <Card
                sx={{
                  padding: '25px',
                  textAlign: 'center',
                  display: 'flex-column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CleanHandsIcon
                  fontSize="inherit"
                  style={{
                    color: '#111D4D',
                  }}
                />

                <Typography sx={{ color: '#111D4D', mb: 2, padding: '2px' }} variant="h6">
                  Onboarding Service
                </Typography>

                <Typography
                  sx={{ color: '#111D4D', mb: 1, padding: '10px', textAlign: 'left' }}
                  variant="subtitle1"
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={4}>
              <Card
                sx={{
                  padding: '25px',
                  textAlign: 'center',
                  display: 'flex-column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SettingsSuggestIcon fontSize="inherit" style={{ color: '#111D4D' }} />

                <Typography sx={{ color: '#111D4D', mb: 2, padding: '2px' }} variant="h6">
                  Social Media Service
                </Typography>

                <Typography
                  sx={{ color: '#111D4D', mb: 1, padding: '10px', textAlign: 'left' }}
                  variant="subtitle1"
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={4}>
              <Card
                sx={{
                  padding: '25px',
                  textAlign: 'center',
                  display: 'flex-column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <DashboardCustomizeIcon fontSize="inherit" style={{ color: '#111D4D' }} />

                <Typography sx={{ color: '#111D4D', mb: 2, padding: '2px' }} variant="h6">
                  Custome Interfaces
                </Typography>

                <Typography
                  sx={{ color: '#111D4D', mb: 1, padding: '10px', textAlign: 'left' }}
                  variant="subtitle1"
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={4}>
              <Card
                sx={{
                  padding: '25px',
                  textAlign: 'center',
                  display: 'flex-column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <BackupTableIcon fontSize="inherit" style={{ color: '#111D4D' }} />

                <Typography sx={{ color: '#111D4D', mb: 2, padding: '2px' }} variant="h6">
                  Custome Templates
                </Typography>

                <Typography
                  sx={{ color: '#111D4D', mb: 1, padding: '10px', textAlign: 'left' }}
                  variant="subtitle1"
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={4}>
              <Card
                sx={{
                  padding: '25px',
                  textAlign: 'center',
                  display: 'flex-column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <HandshakeIcon fontSize="inherit" style={{ color: '#111D4D' }} />

                <Typography sx={{ color: '#111D4D', mb: 2, padding: '2px' }} variant="h6">
                  Partnership
                </Typography>

                <Typography
                  sx={{ color: '#111D4D', mb: 1, padding: '10px', textAlign: 'left' }}
                  variant="subtitle1"
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={4}>
              <Card
                sx={{
                  padding: '25px',
                  textAlign: 'center',
                  display: 'flex-column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <HandshakeIcon fontSize="inherit" style={{ color: '#111D4D' }} />

                <Typography sx={{ color: '#111D4D', mb: 2, padding: '2px' }} variant="h6">
                  Partnership
                </Typography>

                <Typography
                  sx={{ color: '#111D4D', mb: 1, padding: '10px', textAlign: 'left' }}
                  variant="subtitle1"
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
      <ShopFooter />
    </Page>
  );
}
