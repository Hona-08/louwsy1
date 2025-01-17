import FilterList from "@mui/icons-material/FilterList";
import { Container, Grid, IconButton, styled } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Navbar from "components/navbar/Navbar";
import ProductCardList from "components/products/ProductCard1List";
import ProductFilterCard from "components/products/ProductFilterCard";
import ResturantProductsList from "components/products/ResturantProductsList";
import ShopIntroCard from "components/shop/ShopIntroCard";
import Sidenav from "components/sidenav/Sidenav";
import useWindowSize from "hooks/useWindowSize";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import LoadingScreen from "components/loading-screen";
import { GetStaticPaths } from "next";
import nextI18NextConfig from "../../next-i18next.config.js";
import axios from "utils/axios";
import SEO from "components/SEO";
import { useQuery } from "react-query";
import { getRestaurantBySlug } from "utils/api/restaurants";



const Shop = () => {
  const { query } = useRouter();
  const { id: shopId } = query;
  const width = useWindowSize();

  const isTablet = width < 960;
  const [filterValues, setFilterValues] = useState<any>({});

  const {
    data: restaurantDetails,
    isLoading,
    isFetching,
    isFetched,
  } = useQuery<any>(["get_shop", shopId], () =>
    getRestaurantBySlug(shopId as string)
  );

  if (!shopId) {
    return <LoadingScreen />;
  }
  return (
    <ShopLayout1>
      <SEO title={restaurantDetails?.name ?? "Restaurant"} />
      <Container sx={{ mt: 4, mb: 6 }}>
        <ShopIntroCard shopId={shopId} />

        <Grid container spacing={3}>
          <Grid
            item
            md={3}
            xs={12}
            sx={{ display: { md: "block", xs: "none" } }}
          >
            <ProductFilterCard
              filterValues={filterValues}
              setFilterValues={setFilterValues}
            />
          </Grid>

          <Grid item md={9} xs={12}>
            {/* {isTablet && (
              <Sidenav
                position="left"
                handle={
                  <IconButton sx={{ float: "right" }}>
                    <FilterList fontSize="small" />
                  </IconButton>
                }
              >
                <ProductFilterCard
                  filterValues={filterValues}
                  setFilterValues={setFilterValues}
                />
              </Sidenav>
            )} */}
            <ResturantProductsList
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              shopId={shopId}
            />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout1>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export const getStaticPaths = async ({ params }) => {
  //const response = await axios.get('/api/common/slugs');

  const slugs = [
    "foodmandu",
    "kfc",
    "lowisy",
    "bibesh-dhital",
    "momo-hub",
    "zenx-cafe",
    "restaurantpetra",
    "restaurant-petra",
    "petra-restaurant",
    "petra",
  ];
  return {
    paths: slugs
      .map((slug) => {
        return [
          {
            params: {
              id: slug,
            },
            locale: "en",
          },
          {
            params: {
              id: slug,
            },
            locale: "de",
          },
        ];
      })
      .flat(),
    fallback: true, //indicates the type of fallback
  };
};

export default Shop;
