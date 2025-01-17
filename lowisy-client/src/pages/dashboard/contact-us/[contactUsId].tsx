import { paramCase, sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import NextLink from 'next/link';
import { Box, Tab, Card, Grid, Divider, Container, Typography, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getProduct, addCart, onGotoStep } from '../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { CartItem } from '../../../@types/product';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Markdown from '../../../components/Markdown';
import { SkeletonProduct } from '../../../components/skeleton';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from '../../../sections/@dashboard/e-commerce/product-details';
import CartWidget from '../../../sections/@dashboard/e-commerce/CartWidget';
import { useQuery } from '@tanstack/react-query';
import error from 'next/error';
import { getSingleProduct } from 'src/api/products';
import checkout from '../e-commerce/checkout';
import { getCategory } from 'src/api/categories';
import CategoryDetailsSummary from 'src/sections/@dashboard/category-list/CategoryDetailsSummary';
import { getSingleContactUs } from 'src/api/contact-us';
import ContactUsDetailsSummary from 'src/sections/@dashboard/contact-us/ContactUsDetailsSummary';

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

ContactUsDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ContactUsDetails() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const [value, setValue] = useState('1');

  const { query } = useRouter();

  const { contactUsId } = query;
  //console.log('query', query);

  const { data: singleContactUs } = useQuery<any>(['get_single_contactUs'], () =>
    getSingleContactUs(contactUsId as string)
  );

  const handleAddCart = (product: CartItem) => {
    dispatch(addCart(product));
  };

  const handleGotoStep = (step: number) => {
    dispatch(onGotoStep(step));
  };

  return (
    <Page title="Shop: Contact Us Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Contact Us Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Contact Us ',
              href: PATH_DASHBOARD.menu.contactUs.root,
            },
            { name: sentenceCase(contactUsId as string) },
          ]}
        />
        {/* <CartWidget /> */}

        {singleContactUs && (
          <>
            <ContactUsDetailsSummary contactUs={singleContactUs[0]} />
          </>
        )}
        {!singleContactUs && <SkeletonProduct />}
        {false && <Typography variant="h6">404 Catego not found</Typography>}
      </Container>
    </Page>
  );
}
