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
import BaselineEditForm from 'src/sections/@dashboard/settings/BaselineEditForm';
import PoliciesEditForm from 'src/sections/@dashboard/settings/PoliciesEditForm';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

BaseLineUpsert.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function BaseLineUpsert() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  return (
    <Page title="Baseline: Change your webshop info">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('enable_or_disable_shop_info')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            { name: translate('policies') },
          ]}
        />
        <PoliciesEditForm />
      </Container>
    </Page>
  );
}
