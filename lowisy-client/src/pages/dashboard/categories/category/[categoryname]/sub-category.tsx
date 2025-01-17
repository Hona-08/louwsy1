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
import CategoryNewEditForm from 'src/sections/@dashboard/category-list/CategoryNewEditForm';
import { getCategory } from 'src/api/categories';
import CategorySubCategoryNewEditForm from 'src/sections/@dashboard/category-list/CategorySubCategoryNewEditForm';

// ----------------------------------------------------------------------

CategoryEdit.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------



export default function CategoryEdit() {
    const { themeStretch } = useSettings();

    const dispatch = useDispatch();

    const { query } = useRouter();

    const { categoryname } = query;

    const { data: category } = useQuery<any>(['product'], () => getCategory(categoryname as string))

    return (
        <Page title="Shop: Add sub category">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Add sub category"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'sub category',
                            href: PATH_DASHBOARD.menu.categories.root,
                        },
                        { name: categoryname as string },
                    ]}
                />
                <CategorySubCategoryNewEditForm isEdit currentCategory={category} />
            </Container>
        </Page>
    );
}
