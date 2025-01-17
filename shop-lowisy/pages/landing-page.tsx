import ShopLayout2 from "components/layouts/ShopLayout2";
import MobileNavigationBar2 from "components/mobile-navigation/MobileNavigationBar2";
import NewFooter from "components/page-footer/NewFooter";
import SideNavbar from "components/page-sidenav/SideNavbar";
import SEO from "components/SEO";
import { NextPage } from "next";
import GrocerySection1 from "pages-sections/service-section/GrocerySection1";
import ServiceSection2 from "pages-sections/service-section/ServiceSection2";
import ServiceSection3 from "pages-sections/service-section/ServiceSection3";
import ServiceSection4 from "pages-sections/service-section/ServiceSection4";

// =====================================================
type Grocery1Props = {
  grocery1NavList: any[];
  popularProducts: any[];
  grocery1Services: any[];
  trendingProducts: any[];
  grocery1ProductsList: any[];
};
// =====================================================

import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {
  // Add custom props here
};

const Restaurant: NextPage<Grocery1Props> = (props) => {
  return (
    <>
      <ShopLayout2 showNavbar={false} showTopbar={false}>
        <SEO title="Restaurant" />
        <GrocerySection1 />
        <ServiceSection2 />
        <ServiceSection4 />
        <ServiceSection3 />
        <ServiceSection4 />

        <MobileNavigationBar2>
          <SideNavbar navList={props.grocery1NavList} />
        </MobileNavigationBar2>
        <NewFooter />
      </ShopLayout2>
    </>
  );
};

export const getStaticProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default Restaurant;
