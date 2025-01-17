// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import ProductNewEditForm from '../../../sections/@dashboard/e-commerce/ProductNewEditForm';
import BaselineEditForm from 'src/sections/@dashboard/settings/BaselineEditForm';
import LicenceEditForm from 'src/sections/@dashboard/settings/LicenceEditForm';
import PaymentEditForm from 'src/sections/@dashboard/settings/PaymentsEditForm';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

Payment.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Payment() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  return (
    <Page title="Payment: Get your Payment Info">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('make_payment')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            { name: translate('payments') },
          ]}
        />
        <PaymentEditForm />
      </Container>
    </Page>
  );
}
