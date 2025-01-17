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
import CategoryNewEditForm from 'src/sections/@dashboard/category-list/CategoryNewEditForm';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

CategoryCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CategoryCreate() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  return (
    <Page title="Ecommerce: Create a new category">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('create_a_new_category')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('category'),
              href: PATH_DASHBOARD.menu.categories.root,
            },
            { name: translate('new_category') },
          ]}
        />
        <CategoryNewEditForm />
      </Container>
    </Page>
  );
}
