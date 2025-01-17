import { KeyboardArrowDown, PersonOutline } from "@mui/icons-material";
import {
  Badge,
  Box,
  Chip,
  Dialog,
  Divider,
  Drawer,
  Menu,
  MenuItem,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import BazaarButton from "components/BazaarButton";
import Image from "components/BazaarImage";
import CategoryMenu from "components/categories/CategoryMenu";
import { FlexBox } from "components/flex-box";
import Category from "components/icons/Category";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import MiniCart from "components/mini-cart/MiniCart";
import MobileMenu from "components/navbar/MobileMenu";
import GrocerySearchBox from "components/search-box/GrocerySearchBox";
import { useAppContext } from "contexts/AppContext";
import dynamic from "next/dynamic";
import Link from "next/link";
import Login from "pages-sections/sessions/Login";
import { FC, useEffect, useState } from "react";
import { layoutConstant, lowisy_s3_url } from "utils/constants";
import SearchBox from "../search-box/SearchBox";
import { AddressAutocompleteValue } from "mui-address-autocomplete";
import DirectionsBikeRoundedIcon from "@mui/icons-material/DirectionsBikeRounded";
import TakeoutDiningRoundedIcon from "@mui/icons-material/TakeoutDiningRounded";
import { CircleFlag } from "react-circle-flags";
import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import LoadingScreen from "components/loading-screen";
import { useUnmountEffect } from "framer-motion";
import ProfileDialog from "components/ProfileDialog";
import { Button } from "react-scroll";
import LanguagePopover from "components/LanguagePopover";

const AddressAutocomplete = dynamic(() => import("mui-address-autocomplete"), {
  ssr: false,
});

// styled component
export const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
}));

// ==============================================================
type HeaderProps = {
  isFixed?: boolean;
  className?: string;
  searchBoxType?: "type1" | "type2";
  filterValues?: any;
  setFilterValues?: any;
};
// ==============================================================

const Header: FC<HeaderProps> = ({
  isFixed,
  className,
  filterValues,
  setFilterValues,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const { state } = useAppContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const downMd = useMediaQuery(theme.breakpoints.down(1150));

  const [alignment, setAlignment] = useState<string | null>("DELIVERY");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const { query, pathname } = useRouter();
  const { lat, lng, address, id: restaurantId } = query;
  const isRestaurants = pathname.split("/")[1].includes("restaurants");

  const [value, setValue] = useState<AddressAutocompleteValue | any>({
    place_id: "",
    description: "",
    components: {},
    lat: lat,
    lng: lng,
    structured_formatting: {
      main_text: "",
      secondary_text: "",
      main_text_matched_substrings: [""],
    },
  });

  useEffect(() => {
    setValue({
      place_id: "",
      description: address ?? "",
      components: {},
      lat: lat,
      lng: lng,
      structured_formatting: {
        main_text: "",
        secondary_text: "",
        main_text_matched_substrings: [""],
      },
    });
  }, [address]);

  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [dialogOpenProfile, setDialogOpenProfile] = useState(false);
  const toggleDialogProfile = () => setDialogOpenProfile(!dialogOpenProfile);

  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

  const toggleFlagDialog = () => setDialogOpen(!flagDialogOpen);
  const [anchorFlag, setAnchorFlag] = useState<null | HTMLElement>(null);
  const flagOpen = Boolean(anchorFlag);

  const handleFlagClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorFlag(event.currentTarget);
  };
  const handleFlagClose = () => {
    setAnchorFlag(null);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", newLocale);
    }
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const onToggleAddress = (lat: string, lng: string, address: string) => {
    const { pathname } = router;
    if (lat && lng && address) {
      router.push({ pathname, query: { lat, lng, address, radiusInKm: 10 } });
    } else {
      router.push({ pathname });
    }
  };

  const { t } = useTranslation("common");

  const changeTo = router.locale === "en" ? "de" : "en";

  const handleDeliveryAndPickup = (e: any) => {
    setFilterValues({ ...filterValues, ["shippingType"]: e.target.value });
  };

  return (
    <HeaderWrapper className={clsx(className)}>
      <Container
        sx={{
          gap: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexBox
          mr={2}
          minWidth="50px"
          alignItems="center"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Link href="/">
            <a>
              <Image
                height={44}
                src={lowisy_s3_url + "Lowisy.svg"}
                alt="logo"
              />
            </a>
          </Link>

          {isFixed && (
            <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <BazaarButton color="inherit">
                  {/* <Category fontSize="small" color="inherit" /> */}
                  {/* <KeyboardArrowDown fontSize="small" color="inherit" /> */}
                </BazaarButton>
              </FlexBox>
            </CategoryMenu>
          )}
        </FlexBox>

        {!downMd && isRestaurants && !restaurantId && (
          <FlexBox justifyContent="left" flex="1 0 1" sx={{ mt: 3, ml: 7 }}>
            <Box
              className="searchBox"
              sx={{ display: "left", width: 300, mr: 2 }}
            >
              <AddressAutocomplete
                placeholder="Search by address"
                apiKey="AIzaSyCvqBlmgrQH7Nbid5gCMdqrm-Q45fHOM9A"
                fields={["geometry"]}
                label="Address"
                onChange={(_, value: any) => {
                  if (!value) {
                    onToggleAddress(
                      value?.geometry.location.lat(),
                      value?.geometry.location.lng(),
                      value?.description
                    );
                    return;
                  }
                  setValue({
                    ...value,
                    lat: value?.geometry.location.lat(),
                    lng: value?.geometry.location.lng(),
                  });
                  onToggleAddress(
                    value?.geometry.location.lat(),
                    value?.geometry.location.lng(),
                    value?.description
                  );
                }}
                value={value}
                sx={{
                  height: 50,
                  paddingRight: 0,
                  color: "grey.700",
                  background: "#fff",
                  "& fieldset": {
                    border: `1px solid`,
                    borderColor: "grey.500",
                    borderRadius: "50px",
                  },
                }}
              />
            </Box>
            <Box sx={{ mx: 20 }}>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                color="standard"
                sx={{
                  height: 34,
                  paddingRight: 0,
                  color: "grey.700",
                  background: "#fff",

                  "& fieldset": { border: "none" },
                  ml: -15,
                }}
              >
                <ToggleButton
                  value="DELIVERY"
                  aria-label="left aligned"
                  onClick={handleDeliveryAndPickup}
                  sx={{ borderRadius: "20px" }}
                >
                  <span aria-disabled>
                    <DirectionsBikeRoundedIcon sx={{ mr: 1.5 }} />
                  </span>
                  {t("Delivery")}
                </ToggleButton>
                <ToggleButton
                  value="PICKUP"
                  aria-label="centered"
                  onClick={handleDeliveryAndPickup}
                  sx={{ borderRadius: "20px" }}
                >
                  <span aria-disabled>
                    <TakeoutDiningRoundedIcon sx={{ mr: 1.5 }} />
                  </span>
                  {t("Pickup")}
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </FlexBox>
        )}

        <FlexBox
          alignItems="center"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {!address && isRestaurants && restaurantId && (
            <Badge badgeContent={state?.cart?.length} color="primary">
              <Box
                ml={4.5}
                p={1.25}
                bgcolor="grey.200"
                component={IconButton}
                onClick={toggleSidenav}
              >
                <ShoppingBagOutlined />
              </Box>
            </Badge>
          )}

          <Box p={1.25} onClick={toggleFlagDialog}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <IconButton
                onClick={handleFlagClick}
                size="small"
                sx={{
                  ml: 2,
                  border: 1,
                  fontSize: "1rem",
                  paddingY: "0.2rem",
                  paddingX: "0.3rem",
                }}
                aria-controls={flagOpen ? "flag-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={flagOpen ? "true" : undefined}
              >
                {router.locale === "en" ? "EN" : "DE"}
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorFlag}
              id="flag-menu"
              open={flagOpen}
              onClose={handleFlagClose}
              onClick={handleFlagClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  padding: "10px",
                  m: "10px",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ ml: "0.825rem", fontWeight: "bold" }}
                  >
                    {t("language")}
                  </Typography>
                  <MenuItem
                    sx={{ mt: 1 }}
                    onClick={() => onToggleLanguageClick("en")}
                  >
                    <Typography sx={{ ml: 1 }}>{t("english")}</Typography>
                    {router.locale === "en" && <CheckIcon sx={{ ml: 2 }} />}
                  </MenuItem>
                  <MenuItem
                    sx={{ mt: 1 }}
                    onClick={() => onToggleLanguageClick("de")}
                  >
                    <Typography sx={{ ml: 1 }}>{t("german")}</Typography>
                    {router.locale === "de" && <CheckIcon sx={{ ml: 2 }} />}
                  </MenuItem>
                </Box>
              </Box>
            </Menu>
          </Box>
          {/* <LanguagePopover /> */}
          <Box
            component={IconButton}
            p={1.25}
            bgcolor="grey.200"
            onClick={toggleDialogProfile}
          >
            <MenuIcon />
            <Dialog
              open={dialogOpenProfile}
              scroll="paper"
              fullWidth={isMobile}
              sx={{ mt: { xs: "0rem", lg: "-4rem" } }}
              onClose={toggleDialogProfile}
              // sx={{ padding: 10 }}
            >
              <ProfileDialog setDialogOpen={setDialogOpenProfile} />
            </Dialog>
          </Box>
        </FlexBox>

        <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav}>
          <MiniCart toggleSidenav={toggleSidenav} />
        </Drawer>

        {isMobile && <MobileMenu />}
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
