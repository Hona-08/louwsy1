// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// _mock_
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets';
import { useRouter } from 'next/router';
import { isValidToken } from 'src/utils/jwt';
import { useQuery } from '@tanstack/react-query';
import { getPendingOrders, getTotalOrders } from 'src/api/order';
import { getTotalNumberOfProducts } from 'src/api/products';
import { getTotalNoOfCategories } from 'src/api/categories';
import useLocales from 'src/hooks/useLocales';
import { getBaseLine } from 'src/api/settings';
import LoadingScreen from 'src/components/LoadingScreen';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const theme = useTheme();

  //console.log({ shop });
  const { translate } = useLocales();
  const { themeStretch } = useSettings();
  const { pathname, push } = useRouter();
  const { data: baseline } = useQuery<any>(['baseline'], getBaseLine);
  const path = `https://uat-restaurant.lowisy.com/restaurants/${baseline?.slug}`;
  const handleClick = () => {
    push(path);
  };

  const { data: totalCounts } = useQuery<any>(
    ['get_total_no_of_products'],
    async () => getTotalNumberOfProducts(),
    {
      initialData: { totalProducts: 0 },
      onSuccess(data) {
        //console.log('total no of counts', data);
      },
    }
  );

  if (!baseline) {
    return <LoadingScreen />;
  }

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome
              title={translate('welcome_back') + ' ' + baseline?.name + ' ' + '\n'}
              description=""
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={
                <a
                  style={{ textDecoration: 'none' }}
                  href={`https://uat-restaurant.lowisy.com/restaurants/${baseline?.slug}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Button variant="contained">{translate('visit_your_web_shop')}</Button>
                </a>
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title={translate('total_orders')}
              //percent={2.6}
              total={totalCounts?.data?.totalOrders[0]?.totalOrders}
              //chartColor={theme.palette.primary.main}
              //chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title={translate('total_products')}
              //percent={0.0}
              total={totalCounts?.data?.totalProducts[0]?.totalProducts}
              //chartColor={theme.palette.chart.blue[0]}
              //chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title={translate('total_customers')}
              //percent={-0.1}
              total={totalCounts?.data?.totalCustomers[0]?.totalCustomers}
              //chartColor={theme.palette.chart.red[0]}
              //chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
