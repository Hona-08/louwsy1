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
import LogisticsEditForm from 'src/sections/@dashboard/settings/LogisticsEditForm';
import BrandingForm from 'src/sections/@dashboard/settings/BrandingForm';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

Branding.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Branding() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  return (
    <Page title="Branding: Add Information">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('branding')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            
            { name: translate('branding') },
          ]}
        />
        <BrandingForm />
      </Container>
    </Page>
  );
}
