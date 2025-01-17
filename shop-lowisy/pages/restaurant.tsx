import { Stack } from "@mui/material";
import FooterNew from "components/footer/Footer-New";
import ShopLayout2 from "components/layouts/ShopLayout2";
import MobileNavigationBar2 from "components/mobile-navigation/MobileNavigationBar2";
import NewFooter from "components/page-footer/NewFooter";
import PageFooter from "components/page-footer/PageFooter";
import SideNavbar from "components/page-sidenav/SideNavbar";
import SEO from "components/SEO";
import Setting from "components/Setting";
import SidenavContainer from "components/sidenav-container/SidenavContainer";
import { NextPage } from "next";
import AllProducts from "pages-sections/service-section/AllProducts";
import CounterPage from "pages-sections/service-section/CounterPage";
import GrocerySection1 from "pages-sections/service-section/GrocerySection1";
import ProductCarousel from "pages-sections/service-section/ProductCarousel";
import ServiceSection2 from "pages-sections/service-section/ServiceSection2";
import ServiceSection3 from "pages-sections/service-section/ServiceSection3";
import ServiceSection4 from "pages-sections/service-section/ServiceSection4";
import StoryTelling2 from "pages-sections/service-section/StoryTelling2";
import StoryTelling3 from "pages-sections/service-section/StoryTelling3";
import RestaurantSection1 from "pages-sections/restaurant/RestaurantSection1";
import api from "utils/api/grocery1-shop";

// =====================================================
type Grocery1Props = {
  grocery1NavList: any[];
  popularProducts: any[];
  grocery1Services: any[];
  trendingProducts: any[];
  grocery1ProductsList: any[];
};
// =====================================================

const Restaurant: NextPage<Grocery1Props> = (props) => {
  return (
    <ShopLayout2 showNavbar={false} showTopbar={false}>
      <SEO title="Restaurant" />
      <RestaurantSection1 />
      <ServiceSection2 />
      <ServiceSection4 />
      <ServiceSection3 />
      <StoryTelling2 />
      <CounterPage />
      <StoryTelling3 />

      <NewFooter />
    </ShopLayout2>
  );
};

export async function getStaticProps() {
  const popularProducts = await api.getPopularProducts();
  const grocery1Services = await api.getGrocery1Services();
  const trendingProducts = await api.getTrendingProducts();
  const grocery1NavList = await api.getGrocery1Navigation();
  const grocery1ProductsList = await api.getGrocery1Products();

  return {
    props: {
      grocery1NavList,
      popularProducts,
      grocery1Services,
      trendingProducts,
      grocery1ProductsList,
    },
  };
}

export default Restaurant;
