import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// hooks
import useSettings from '../../../../../hooks/useSettings';
// layouts
import Layout from '../../../../../layouts';
// components
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
// sections
import ProductNewEditForm from '../../../../../sections/@dashboard/e-commerce/ProductNewEditForm';
import { Product } from 'src/@types/product';
import { useQuery } from '@tanstack/react-query';
import { getSingleProduct } from 'src/api/products';
import { getCategoriesInTreeFormat } from 'src/api/categories';

// ----------------------------------------------------------------------

EcommerceProductEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------



export default function EcommerceProductEdit() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { query } = useRouter();

  const { productname } = query;

  const { data: product } = useQuery<any>(['product'], () => getSingleProduct(productname as string))

  const { data: categories, isFetching } = useQuery<any>(
    ['categories_tree'],
    getCategoriesInTreeFormat,
    {
      refetchOnWindowFocus: false,
    }
  );


  return (
    <Page title="Ecommerce: Edit product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit product"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Products',
              href: PATH_DASHBOARD.menu.products.list,
            },
            { name: productname as string },
          ]}
        />

        <ProductNewEditForm isEdit currentProduct={product} categories={categories} />
      </Container>
    </Page>
  );
}
