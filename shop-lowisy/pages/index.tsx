import ShopLayout2 from "components/layouts/ShopLayout2";
import SEO from "components/SEO";
import { NextPage } from "next";
import ServiceSection2 from "pages-sections/service-section/ServiceSection2";
import RestaurantSection1 from "pages-sections/restaurant/RestaurantSection1";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// =====================================================
type Grocery1Props = {
  grocery1NavList: any[];
  popularProducts: any[];
  grocery1Services: any[];
  trendingProducts: any[];
  grocery1ProductsList: any[];
};
// =====================================================

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import NewFooter from "components/page-footer/NewFooter";
import ServiceSection3 from "pages-sections/service-section/ServiceSection3";
import ServiceSection4 from "pages-sections/service-section/ServiceSection4";
import StoryTelling2 from "pages-sections/service-section/StoryTelling2";
import StoryTelling3 from "pages-sections/service-section/StoryTelling3";
import CounterPage from "pages-sections/service-section/CounterPage";
import axios from "axios";
import {  useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {
  // Add custom props here
};

const Restaurant: NextPage<Grocery1Props> = (props) => {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState(router.locale);
  useEffect(() => {
    getUserIp();
  }, [countryCode]);

  const getUserIp = async () => {
    const ip = await axios.get("https://ipapi.co/json");
    let code = countryCode ? countryCode : ip.data.country_code;
    const germanCountryCodeIncludes = [
      "at", "AT",
      "ch", "CH",
      "de", "DE"
    ];
    if (germanCountryCodeIncludes.includes(code)) {
      setCountryCode(code);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("lang", "de");
      }
    } else {
      setCountryCode("en");
      // if (typeof window !== "undefined") {
      //   window.localStorage.setItem("lang", "en");
      // }
    }
    onToggleLanguageClick(countryCode);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("lang", newLocale);
    // }
    const { pathname, asPath, query } = router;
    
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <>
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
    </>
  );
};

export const getStaticProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common",'footer'])),
  },
});

export default Restaurant;
