import { Clear, ExpandMore, ShoppingBagOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Box,
  Divider,
  Menu,
  Drawer,
  IconButton,
  MenuItem,
  Typography,
  useMediaQuery,
  Dialog,
  ToggleButtonGroup,
  ToggleButton,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FlexBox } from "components/flex-box";
import NavLink from "components/nav-link/NavLink";
import Scrollbar from "components/Scrollbar";
import { H6 } from "components/Typography";
import navbarNavigations from "data/navbarNavigations";
import { FC, Fragment, useState } from "react";
import DirectionsBikeRoundedIcon from "@mui/icons-material/DirectionsBikeRounded";
import TakeoutDiningRoundedIcon from "@mui/icons-material/TakeoutDiningRounded";
import { lowisy_s3_url } from "utils/constants";
import Image from "components/BazaarImage";
import Link from "next/link";

import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "contexts/AppContext";
import { useTranslation } from "react-i18next";
import ProfileDialog from "components/ProfileDialog";
import MiniCart from "components/mini-cart/MiniCart";

const MobileMenu: FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const theme = useTheme();
  const { state } = useAppContext();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [sidenavOpenMinicart, setSidenavOpenMinicart] = useState(false);

  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [flagSidenavOpen, setFlagSidenavOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);
  const toggleSideMinicart = () => setSidenavOpenMinicart(!sidenavOpenMinicart);

  const [dialogOpenProfile, setDialogOpenProfile] = useState(false);
  const toggleDialogProfile = () => setDialogOpenProfile(!dialogOpenProfile);

  const toggleFlagDialog = () => setDialogOpen(!flagDialogOpen);
  const toggleFlagSidenav = () => setSidenavOpen(!flagSidenavOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorFlag, setAnchorFlag] = useState<null | HTMLElement>(null);
  const flagOpen = Boolean(anchorFlag);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFlagClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorFlag(event.currentTarget);
  };
  const handleFlagClose = () => {
    setAnchorFlag(null);
  };

  const { query, pathname } = useRouter();
  const { lat, lng, address, id: restaurantId } = query;
  const isRestaurants = pathname.split("/")[1].includes("restaurants");

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };
  const changeTo = router.locale === "en" ? "de" : "en";

  const [countryCheck, setCountryCheck] = useState([
    {
      countryCode: "at",
      check: false,
    },
    {
      countryCode: "de",
      check: false,
    },
  ]);
  const [countryCode, setCountryCode] = useState("at");
  const [renderCheck, setRenderCheck] = useState(true);
  const handleFlagIconClick = (code: string) => { };
  const [alignment, setAlignment] = useState<string | null>("DELIVERY");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };
  // const handleDeliveryAndPickup = (e: any) => {
  //   setFilterValues({ ...filterValues, ["shippingType"]: e.target.value });
  // };
  const updateNavigations = navbarNavigations.reduce((prev: any, curr: any) => {
    const newArr = [...prev];

    if (!curr.child) {
      newArr.push({ ...curr, extLink: true });
    } else if (curr.megaMenu || curr.megaMenuWithSub) {
      const flated = curr.child.flat();
      newArr.push({ title: curr.title, child: flated });
    } else {
      newArr.push(curr);
    }

    return newArr;
  }, []);

  const renderLevels = (data: any) => {
    return data.map((item: any, index: any) => {
      if (item.child) {
        return (
          <Accordion
            square
            key={index}
            elevation={0}
            disableGutters
            sx={{
              "&:not(:last-child)": { borderBottom: 0 },
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                padding: 0,
                boxShadow: "none",
                minHeight: 48,
                "& .Mui-expanded": { color: "primary.main", margin: 0 },
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  margin: 0,
                  "& .MuiSvgIcon-root": { color: "primary.main" },
                },
              }}
            >
              <H6>{item.title}</H6>
            </AccordionSummary>

            <Box mx={2}>{renderLevels(item.child)}</Box>
          </Accordion>
        );
      }

      if (item.extLink) {
        return (
          <H6 key={index} py={1}>
            <NavLink href={item.url}>{item.title}</NavLink>
          </H6>
        );
      }

      return (
        <Box key={index} py={1}>
          <NavLink href={item.url}>{item.title}</NavLink>
        </Box>
      );
    });
  };

  return (
    <Fragment>
      <Link href="/">
        <a>
          <Image height={44} src={lowisy_s3_url + "Lowisy.svg"} alt="logo" />
        </a>
      </Link>
      <FlexBox sx={{ justifyContent: "center", alignItems: "center" }}>
        <Box onClick={toggleFlagDialog} sx={{}}>
          {isRestaurants && restaurantId && (
            <Badge badgeContent={state?.cart?.length} color="primary">
              <Box
                p={1.25}
                bgcolor="grey.200"
                component={IconButton}
                onClick={toggleSideMinicart}
              >
                <ShoppingBagOutlined />
              </Box>
            </Badge>
          )}
        </Box>
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
            <Box sx={{ display: "flex", padding: "15px" }}>
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
                {/* <MenuItem sx={{ mt: 1 }}>
                    <Typography sx={{ ml: 1 }}>French</Typography>
                  </MenuItem> */}
              </Box>
            </Box>
          </Menu>
        </Box>
        <Box
          component={IconButton}
          bgcolor="grey.200"
          onClick={toggleDialogProfile}
        >
          <MenuIcon />
          <Dialog
            open={dialogOpenProfile}
            scroll="paper"
            //fullWidth={isMobile}
            sx={{
              // mt: { xs: "0rem", lg: "-4rem", sm: "-8rem", md: "-8rem" },
              // height: "100vh",
              // border: 8,
              mt: { lg: "-10rem", sm: "-4rem", md: "-4rem", xs: "0rem" },

              width: { xs: "100vw" },
              height: { xs: "100vh" },
            }}
            onClose={toggleDialogProfile}
          // sx={{ padding: 10 }}
          >
            <ProfileDialog setDialogOpen={setDialogOpenProfile} />
          </Dialog>
        </Box>

        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          sx={{ zIndex: 15001 }}
        >
          <Box sx={{ width: "100vw", height: "100%", position: "relative" }}>
            <Scrollbar autoHide={false} style={{ height: "100vh" }}>
              <Box
                maxWidth={500}
                margin="auto"
                position="relative"
                height="100%"
                px={5}
                py={8}
              >
                <IconButton
                  onClick={() => setOpenDrawer(false)}
                  sx={{ position: "absolute", right: 30, top: 15 }}
                >
                  <Clear fontSize="small" />
                </IconButton>

                {renderLevels(updateNavigations)}
              </Box>
            </Scrollbar>
          </Box>
        </Drawer>

        <Drawer
          open={sidenavOpenMinicart}
          anchor="right"
          onClose={toggleSideMinicart}
        >
          <MiniCart />
        </Drawer>
      </FlexBox>
    </Fragment>
  );
};

export default MobileMenu;
