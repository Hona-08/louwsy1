import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getProduct, addCart, onGotoStep } from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import { CartItem } from '../../../../@types/product';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import Markdown from '../../../../components/Markdown';
import { SkeletonProduct } from '../../../../components/skeleton';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import {
    ProductDetailsSummary,
    ProductDetailsReview,
    ProductDetailsCarousel,
} from '../../../../sections/@dashboard/e-commerce/product-details';
import CartWidget from '../../../../sections/@dashboard/e-commerce/CartWidget';
import { useQuery } from '@tanstack/react-query';
import error from 'next/error';
import { getSingleProduct } from 'src/api/products';
import { getOrder, getOrderStatus } from 'src/api/order';
import LoadingScreen from 'src/components/LoadingScreen';
import { isError } from 'lodash';
import OrderDetailsSummary from 'src/sections/@dashboard/e-commerce/order-details/OrderDetailsSummary';
import checkout from 'src/pages/shop/checkout';
import SkeletonOrder from 'src/components/skeleton/SkeletonOrder';

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
    {
        title: '100% Original',
        description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
        icon: 'ic:round-verified',
    },
    {
        title: '10 Day Replacement',
        description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
        icon: 'eva:clock-fill',
    },
    {
        title: 'Year Warranty',
        description: 'Cotton candy gingerbread cake I love sugar sweet.',
        icon: 'ic:round-verified-user',
    },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    justifyContent: 'center',
    height: theme.spacing(8),
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

EcommerceOrderDetails.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceOrderDetails() {
    const { themeStretch } = useSettings();

    const dispatch = useDispatch();

    const [value, setValue] = useState('1');

    const { query } = useRouter();

    const { orderName } = query;

    const { data: order, isFetching, isError } = useQuery<any>(['get_order'], () => getOrder(orderName as string))

    const { data: orderStatus, isFetching: isFetchingOrderStatus } = useQuery<any>(['get_order_status'], () => getOrderStatus())

    const handleAddCart = (product: CartItem) => {
        dispatch(addCart(product));
    };

    const handleGotoStep = (step: number) => {
        dispatch(onGotoStep(step));
    };

    if (isFetching) {
        return <LoadingScreen />
    }

    //console.log({ order })
    return (
        <Page title="Ecommerce: Order Details">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Order Details"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'Orders',
                            href: PATH_DASHBOARD.menu.orders.list,
                        },

                        { name: sentenceCase(orderName as string) },
                    ]}
                />

                {/* <CartWidget /> */}

                {order && (
                    <>
                        <OrderDetailsSummary
                            order={order}
                            orderStatus={orderStatus}
                        />

                    </>
                )}
                {!order && <SkeletonOrder />}

                {isError && <Typography variant="h6">404 Product not found</Typography>}
            </Container>
        </Page>
    );
}

