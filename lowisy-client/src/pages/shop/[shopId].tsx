import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack, Button, Grid } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts, filterProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { Product, ProductFilter } from '../../@types/product';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider } from '../../components/hook-form';
// sections
import { AppWelcome } from '../../sections/@dashboard/general/app';
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
  ShopProductSearch,
} from '../../sections/@dashboard/e-commerce/shop';
import CartWidget from './CartWidget';
import { SeoIllustration } from '../../assets';
import ShopFooter from 'src/layouts/main/MainFooter';
import ShopHeader from 'src/layouts/shop/ShopHeader';
import { useQuery } from '@tanstack/react-query';
import { getShopProductsByShopId, getShopDetailsById } from 'src/api/products';
import { Translate } from '@mui/icons-material';
import { translateRect } from '@fullcalendar/common';
import useLocales from 'src/hooks/useLocales';
// ----------------------------------------------------------------------

// EcommerceShop.getLayout = function getLayout(page: React.ReactElement) {
//   return <Layout>{page}</Layout>;
// };

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const [openFilter, setOpenFilter] = useState(false);

  const { products, sortBy, filters } = useSelector((state) => state.product);
  const { query } = useRouter();
  const { translate } = useLocales();
  const { shopId } = query;

  const [totalProducts, setTotalProducts] = useState(0);

  const filteredProducts = applyFilter(products, sortBy, filters);

  const { data: shopProducts } = useQuery<any>(
    ['get_shop_products'],
    () => getShopProductsByShopId(shopId as string),
    {
      initialData: { products: [], totalProducts: 0 },
    }
  );
  //console.log('shop products', shopProducts);

  // let imgArray: string[];
  // shopProducts.forEach((item) => {
  //   imgArray.push(item.)
  // });

  const { data: shopDetails, isLoading: detailsLoading } = useQuery<any>(
    ['get_shop_details'],
    () => getShopDetailsById(shopId as string),
    {}
  );

  //console.log(shopDetails);
  // //console.log(shopProducts[0].productImages);

  const defaultValues = {
    gender: filters.gender,
    category: filters.category,
    colors: filters.colors,
    priceRange: filters.priceRange,
    rating: filters.rating,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  const min = values.priceRange[0];

  const max = values.priceRange[1];

  const isDefault =
    min === 0 &&
    max === 200 &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.category === 'All';

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(filterProducts(values));
  // }, [dispatch, values]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    if (openFilter) {
      handleCloseFilter();
    }
    reset({
      gender: [],
      category: 'All',
      colors: [],
      priceRange: [0, 200],
      rating: '',
    });
  };

  const handleRemoveGender = (value: string) => {
    const newValue = filters.gender.filter((item: any) => item !== value);
    setValue('gender', newValue);
  };

  const handleRemoveCategory = () => {
    setValue('category', 'All');
  };

  const handleRemoveColor = (value: string) => {
    const newValue = filters.colors.filter((item: any) => item !== value);
    setValue('colors', newValue);
  };

  const handleRemovePrice = () => {
    setValue('priceRange', [0, 200]);
  };

  const handleRemoveRating = () => {
    setValue('rating', '');
  };

  //const img = shopProducts.map((item: any) => item.images);

  return (
    <Page title="Ecommerce: Shop">
      <ShopHeader />
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ mt: 15 }}>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} md={12}>
            <AppWelcome
              title={translate('welcome_back') + ` ! ${shopDetails?.name} \n`}
              description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={<Button variant="contained">{translate('go_now')}</Button>}
            />
          </Grid>
        </Grid>

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch />

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FormProvider methods={methods}>
              <ShopFilterSidebar
                isDefault={isDefault}
                isOpen={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
                onResetAll={handleResetFilter}
              />
            </FormProvider>

            <ShopProductSort />
          </Stack>
        </Stack>
        <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{filteredProducts.length}</strong>
                &nbsp;{translate('product_found')}
              </Typography>

              <ShopTagFiltered
                filters={filters}
                isShowReset={!isDefault && !openFilter}
                onRemoveGender={handleRemoveGender}
                onRemoveCategory={handleRemoveCategory}
                onRemoveColor={handleRemoveColor}
                onRemovePrice={handleRemovePrice}
                onRemoveRating={handleRemoveRating}
                onResetAll={handleResetFilter}
              />
            </>
          )}
        </Stack>

        {/* <ShopProductList products={shopProducts} loading={!products.length && isDefault} /> */}

        <ShopProductList products={shopProducts} loading={detailsLoading} />
        {/* <CartWidget /> */}
      </Container>
      <ShopFooter />
    </Page>
  );
}

// ----------------------------------------------------------------------

function applyFilter(products: Product[], sortBy: string | null, filters: ProductFilter) {
  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }
  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }
  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }
  // FILTER PRODUCTS
  if (filters.gender.length > 0) {
    products = products.filter((product) => filters.gender.includes(product.gender));
  }
  if (filters.category !== 'All') {
    products = products.filter((product) => product.category === filters.category);
  }
  if (filters.colors.length > 0) {
    products = products.filter((product) =>
      product.colors.some((color: any) => filters.colors.includes(color))
    );
  }

  const min = filters.priceRange[0];
  const max = filters.priceRange[1];

  if (min !== 0 || max !== 200) {
    products = products.filter((product) => product.price >= min && product.price <= max);
  }

  if (filters.rating) {
    products = products.filter((product) => {
      const convertRating = (value: string) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRating > convertRating(filters.rating);
    });
  }
  return products;
}
