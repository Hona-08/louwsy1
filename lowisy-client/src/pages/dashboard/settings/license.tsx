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
import LicenceEditForm from 'src/sections/@dashboard/settings/LicenceEditForm';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

LicenseUpsert.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function LicenseUpsert() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  return (
    <Page title="License: Change your webshop info">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('license')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
           
            { name: translate('license') },
          ]}
        />
        <LicenceEditForm />
      </Container>
    </Page>
  );
}
