// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// assets
import { MaintenanceIllustration, OrderCompleteIllustration } from '../assets';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchKlarnaOrder } from 'src/api/settings';
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

export default function KlarnaSuccess() {
  const router = useRouter();
  const orderId = router.query.order_id as string;
  // console.log('successful payment')
  // console.log({ orderId })
  const { translate } = useLocales();
  useQuery(['get-kalrna-order'], () => fetchKlarnaOrder(orderId), {
    enabled: Boolean(orderId),
    onSuccess: (data) => {
      // console.log({ data });
    },
  });

  // console.log('this pgae is called')
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
        </ContentStyle>
      </Container>
    </Page>
  );
}
