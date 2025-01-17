// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Page from '../../components/Page';
import Layout from 'src/layouts';
import { FaqsHero, FaqsCategory, FaqsList, FaqsForm } from 'src/sections/faqs';
import { useQuery } from '@tanstack/react-query';
import { getBaseLine } from 'src/api/settings';
import LoadingScreen from 'src/components/LoadingScreen';

// layouts
// components
// sections

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(0),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(0),
  },
}));

// ----------------------------------------------------------------------

Help.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Help() {
  const { data: shop } = useQuery<any>(['shop'], getBaseLine);

  if (!shop) {
    return <LoadingScreen />;
  }

  return (
    <Page title="General: Help">
      <RootStyle>
        <FaqsHero />

        <Container sx={{ mt: 10, mb: 5, position: 'relative' }}>
          {/* <FaqsCategory /> */}

          <Typography variant="h3" sx={{ mb: 5 }}>
            Frequently asked questions
          </Typography>

          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <FaqsList />
            </Grid>
            <Grid item xs={12} md={6}>
              <FaqsForm shop={shop} />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
