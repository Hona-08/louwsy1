// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Stack } from '@mui/material';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// assets
import { MaintenanceIllustration, OrderCompleteIllustration } from '../assets';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchKlarnaOrder, payViaKlarnaOnBoardingEntry, payViaPaypalOnBoardingEntry } from 'src/api/settings';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Maintenance() {
  const router = useRouter();
  const { translate } = useLocales();
  useQuery(['onboarding-paypal'], payViaPaypalOnBoardingEntry);

  return (
    <Page title="Plan Purchased Successfully">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            {translate('plan_purchased_successfully')}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {translate('our_support_team_will_start_working_on_your_restaurant_onboarding_soon')}
          </Typography>
          <OrderCompleteIllustration sx={{ height: 260, my: 10 }} />
          <Stack direction="row" spacing={2}>
            <NextLink href="/dashboard/settings/onboarding" passHref>
              <Button size="large" variant="outlined">
                Go Back
              </Button>
            </NextLink>

            <NextLink href="/dashboard" passHref>
              <Button size="large" variant="contained">
                Go to Home
              </Button>
            </NextLink>
          </Stack>
        </ContentStyle>
      </Container>
    </Page>
  );
}
