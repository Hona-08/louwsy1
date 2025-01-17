import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
import { getProduct, addCart, onGotoStep } from '../../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// @types
import { CartItem } from '../../../../../@types/product';
// hooks
import useSettings from '../../../../../hooks/useSettings';
// layouts
import Layout from '../../../../../layouts';
// components
import Page from '../../../../../components/Page';
import Iconify from '../../../../../components/Iconify';
import Markdown from '../../../../../components/Markdown';
import { SkeletonProduct } from '../../../../../components/skeleton';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
import { useQuery } from '@tanstack/react-query';
import error from 'next/error';
import { getSingleProduct } from 'src/api/products';
import CartWidget from 'src/sections/@dashboard/e-commerce/CartWidget';
import {
  ProductDetailsSummary,
  ProductDetailsReview,
} from 'src/sections/@dashboard/e-commerce/product-details';
import useLocales from 'src/hooks/useLocales';
// sections

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

CategoryDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CategoryDetails() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const [value, setValue] = useState('1');

  const { query } = useRouter();

  const { productname } = query;

  const { data: product } = useQuery<any>(['product'], () =>
    getSingleProduct(productname as string)
  );

  const handleAddCart = (product: CartItem) => {
    dispatch(addCart(product));
  };

  const handleGotoStep = (step: number) => {
    dispatch(onGotoStep(step));
  };

  return (
    <Page title="Ecommerce: Product Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('product_details')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('ecommerce'),
              href: PATH_DASHBOARD.menu.products.root,
            },

            { name: sentenceCase(productname as string) },
          ]}
        />

        {/* <CartWidget /> */}

        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  {/* <ProductDetailsCarousel product={product} /> */}
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  {/* <ProductDetailsSummary
                                        product={product}
                                        cart={checkout.cart}
                                        onAddCart={handleAddCart}
                                        onGotoStep={handleGotoStep}
                                    /> */}
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
              {PRODUCT_DESCRIPTION.map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                    <IconWrapperStyle>
                      <Iconify icon={item.icon} width={36} height={36} />
                    </IconWrapperStyle>
                    <Typography variant="subtitle1" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab disableRipple value="1" label="Description" />
                    <Tab
                      disableRipple
                      value="2"
                      label={`Review (${product?.reviews?.length})`}
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={product.description} />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <ProductDetailsReview product={product} />
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {!product && <SkeletonProduct />}

        {error && <Typography variant="h6">{translate('product_not_found')}</Typography>}
      </Container>
    </Page>
  );
}
