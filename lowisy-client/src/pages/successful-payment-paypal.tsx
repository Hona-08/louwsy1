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
import { fetchKlarnaOrder, fetchPaypalOrder } from 'src/api/settings';
import useLocales from 'src/hooks/useLocales';
import { Grid4x4Sharp } from '@mui/icons-material';
import { Grid } from 'swiper';

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

export default function PayPalSuccess() {
  const router = useRouter();
  const orderId = router.query.order_id as string;
  // console.log('paypal id', orderId)
  const { translate } = useLocales();
  useQuery(['get-paypal-order', orderId], () => fetchPaypalOrder(orderId), {
    enabled: Boolean(orderId),
    onSuccess: (data) => {
      // console.log({ data });
    },
  });

  return (
    <Page title="Plan Purchased Successfully">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            {translate('plan_purchased_successfully')}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            {translate('you_can_now_start_using_lowisy_platform_at_its_fullest')}
          </Typography>

          <OrderCompleteIllustration sx={{ height: 260, my: 10 }} />

          <Stack direction="row" spacing={2}>
            <NextLink href="/dashboard/settings/license" passHref>
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
