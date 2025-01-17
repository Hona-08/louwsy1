// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import ProductNewEditForm from '../../../../sections/@dashboard/e-commerce/ProductNewEditForm';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

EcommerceProductCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  return (
    <Page title="Ecommerce: Create a new product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('create_a_new_product')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('ecommerce'),
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: translate('new_product') },
          ]}
        />
        <ProductNewEditForm />
      </Container>
    </Page>
  );
}
