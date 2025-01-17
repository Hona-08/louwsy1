import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import MobileNavigationBar from "components/mobile-navigation/MobileNavigationBar";
import Sticky from "components/sticky/Sticky";
import Topbar from "components/topbar/Topbar";
import Head from "next/head";
import React, { FC, Fragment, useCallback, useState } from "react";
import Navbar from "components/navbar/Navbar";
import PageFooter from "components/page-footer/PageFooter";
import { CategoryListItem } from "components/navbar/MegaMenu2/styles";
import CategoryItemList from "components/categories/CategoryListItem";
import NewFooter from "components/page-footer/NewFooter";
import {
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { FlexBox } from "components/flex-box";
import { Box } from "@mui/system";
import DirectionsBikeRoundedIcon from "@mui/icons-material/DirectionsBikeRounded";
import TakeoutDiningRoundedIcon from "@mui/icons-material/TakeoutDiningRounded";
import { useTranslation } from "react-i18next";
import DeliveryPickup from "components/header/DeliveryPickup";
/**
 *  Used in:
 *  1. market-1, matket-2, gadget-shop,
 *     fashion-shop, fashion-shop-2, fashion-shop-3, furniture-shop, grocery3, gift-shop
 *  2. product details page
 *  3. order-confirmation page
 *  4. product-search page
 *  5. shops and shops-details page
 *  6. checkoutNavLayout and CustomerDashboadLayout component
 */

// ===================================================
type ShopLayout1Props = {
  showTopbar?: boolean;
  showNavbar?: boolean;
  topbarBgColor?: string;
  filterValues?: any;
  setFilterValues?: any;
  selected?: any;
  setSelected?: any;
};
// ===================================================

const ShopLayout1: FC<ShopLayout1Props> = ({
  children,
  showTopbar = true,
  topbarBgColor,
  showNavbar = true,
  filterValues,
  setFilterValues,
  selected,
  setSelected
}) => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [alignment, setAlignment] = useState<string | null>("DELIVERY");
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const { query, pathname } = useRouter();
  const { lat, lng, address, id: restaurantId } = query;
  const isRestaurants = pathname.split("/")[1].includes("restaurants");

  const handleDeliveryAndPickup = (e: any) => {
    setFilterValues({ ...filterValues, ["shippingType"]: e.target.value });
  };
  return (
    <Fragment>
      {/* TOPBAR */}
      {/* {showTopbar && <Topbar bgColor={topbarBgColor} />} */}

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header
          isFixed={isFixed}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        />
      </Sticky>

      {isRestaurants && !restaurantId && (
        <>
          <Sticky fixedOn={0} onSticky={toggleIsFixed}>
            <CategoryItemList
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              selected={selected}
              setSelected={setSelected}
            />
          </Sticky>
        </>
      )}

      <div className="section-after-sticky">
        {/* NAVIGATION BAR */}
        {/* {showNavbar && <Navbar elevation={0} border={1} />} */}

        {/* BODY CONTENT */}
        {children}
      </div>

      {/* <MobileNavigationBar /> */}

      <NewFooter />
    </Fragment>
  );
};

export default ShopLayout1;
