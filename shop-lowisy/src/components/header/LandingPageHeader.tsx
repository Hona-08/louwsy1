import {
  KeyboardArrowDown,
  Logout,
  PersonAdd,
  PersonOutline,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Dialog,
  Divider,
  Drawer,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
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
import Link from "next/link";
import Login from "pages-sections/sessions/Login";
import { FC, useContext, useState } from "react";
import { layoutConstant, lowisy_s3_url } from "utils/constants";
import SearchBox from "../search-box/SearchBox";
import MenuIcon from "@mui/icons-material/Menu";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { CircleFlag } from "react-circle-flags";
import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import ProfileDialog from "components/ProfileDialog";
import { LanguageContext } from "contexts/LanguageContext";

// styled component
export const HeaderWrapper = styled(Box)(({ theme }) => ({
  border: 10,
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
};
// ==============================================================

const LandingPageHeader: FC<HeaderProps> = ({
  isFixed,
  className,
  searchBoxType = "type1",
}) => {
  const router = useRouter();
  const theme = useTheme();
  const { state } = useAppContext();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);

  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [flagSidenavOpen, setFlagSidenavOpen] = useState(false);
  const { t } = useTranslation("common");
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const downMd = useMediaQuery(theme.breakpoints.down("md"));
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

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

  console.log({ sidenavOpen });

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", newLocale);
    }
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const [countryCode, setCountryCode] = useState("at");
  const [renderCheck, setRenderCheck] = useState(true);
  const [dialogOpenProfile, setDialogOpenProfile] = useState(false);
  const toggleDialogProfile = () => setDialogOpenProfile(!dialogOpenProfile);
  // const handleFlagIconClick = (code: string) => {
  //   console.log("Before country code", countryCode);
  //   setCountryCode(code);
  //   setRenderCheck(true);
  //   console.log("After country code", countryCode);
  // };

  // const changeTo = router.locale === "en" ? "de" : "en";

  return (
    <HeaderWrapper className={clsx(className)} sx={{}}>
      <Container
        maxWidth={false}
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
          minWidth="170px"
          alignItems="center"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Link href="/">
            <a>
              <Image
                height={70}
                src={lowisy_s3_url + "Lowisy.svg"}
                alt="logo"
              />
            </a>
          </Link>
          {/* {isFixed && (
            <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <BazaarButton color="inherit">
                   <Category fontSize="small" color="inherit" /> 
                  <KeyboardArrowDown fontSize="small" color="inherit" />
                </BazaarButton>
              </FlexBox>
            </CategoryMenu>
          )} */}
        </FlexBox>

        {/* <FlexBox justifyContent="center" flex="1 1 0">
          {searchBoxType === "type1" && <SearchBox />}
          {searchBoxType === "type2" && <GrocerySearchBox />}
        </FlexBox> */}

        <FlexBox
          alignItems="center"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Box p={1.25} ml={1.25} onClick={toggleFlagDialog}>
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
                {/* <Box>
                  <Typography
                    variant="h6"
                    sx={{ ml: "0.825rem", fontWeight: "bold" }}
                  >
                    Country
                  </Typography>
                  <MenuItem
                    sx={{ mt: 1 }}
                    onClick={() => handleFlagIconClick("at")}
                  >
                    <CircleFlag countryCode="at" height="25" />
                    <Typography sx={{ ml: 1 }}>Austria</Typography>
                    {renderCheck && countryCode === "at" && (
                      <CheckIcon sx={{ ml: 2 }} />
                    )}
                  </MenuItem>
                  <MenuItem
                    sx={{ mt: 1 }}
                    onClick={() => handleFlagIconClick("de")}
                  >
                    <CircleFlag countryCode="de" height="25" />
                    <Typography sx={{ ml: 1 }}>Germany</Typography>
                    {renderCheck && countryCode === "de" && (
                      <CheckIcon sx={{ ml: 2 }} />
                    )}
                  </MenuItem>
                </Box>
                <Divider orientation="vertical" /> */}
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
              //fullWidth={isMobile}
              sx={{ mt: { xs: "0rem", lg: "-4rem" } }}
              onClose={toggleDialogProfile}
              // sx={{ padding: 10 }}
            >
              <ProfileDialog setDialogOpen={setDialogOpenProfile} />
            </Dialog>
          </Box>
        </FlexBox>

        <Drawer open={false} anchor="right" onClose={toggleSidenav}>
          <MiniCart toggleSidenav={toggleSidenav} />
        </Drawer>

        {/* {downMd && <MobileMenu />} */}
      </Container>
    </HeaderWrapper>
  );
};

export default LandingPageHeader;
