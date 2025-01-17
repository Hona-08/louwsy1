import { sentenceCase } from 'change-case';
import { ChangeEvent, useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography, Tabs } from '@mui/material';
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
import checkout from '../../e-commerce/checkout';
import { CustomerDetailsSummary } from 'src/sections/@dashboard/customer-details';
import { getCustomer } from 'src/api/customer';
import CustomerOrderList from 'src/sections/@dashboard/customer-details/CustomerOrderSummary';

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

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Orders', value: 'orders' },
];

// ----------------------------------------------------------------------

CustomerDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CustomerDetails() {
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState<string>('details');
  const dispatch = useDispatch();

  const [value, setValue] = useState('1');

  const { query } = useRouter();

  const { customername } = query;

  const { data: customer, isError } = useQuery<any>(['customer'], () => getCustomer(customername as string))

  const handleTabsChange = (event: any, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <Page title=" Customer Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Customer Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Customers',
              href: PATH_DASHBOARD.menu.products.list,
            },

            { name: sentenceCase(customername as string) },
          ]}
        />

        {customer && (
          <>
            <Card>
              {/* <Box sx={{ mt: 2 }}> */}
              <Tabs
                indicatorColor="primary"
                onChange={handleTabsChange}
                scrollButtons="auto"
                textColor="primary"
                value={currentTab}
                variant="scrollable"
              >
                {tabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
              </Tabs>
              {/* </Box> */}
              <Divider />
              <Box sx={{ m: 1 }}>
                {currentTab === 'orders' &&
                  <CustomerOrderList customerId={customer.id} />
                }

                {currentTab === 'details' && (
                  <CustomerDetailsSummary
                    customer={customer}
                  />
                )}
              </Box>
            </Card>
            {/* <Card>
            </Card> */}
          </>
        )}

        {!customer && <SkeletonProduct />}

        {isError
          &&
          <Typography variant="h6">404 Customer not found</Typography>
        }
      </Container>
    </Page >
  );
}
