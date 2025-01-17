import {
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AppStore from "components/AppStore";
import BazaarIconButton from "components/BazaarIconButton";
import BazaarImage from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import FooterNew from "components/footer/Footer-New";
import Facebook from "components/icons/Facebook";
import Google from "components/icons/Google";
import Instagram from "components/icons/Instagram";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import Logo from "components/Logo";
import LogoWithoutText from "components/LogoWithoutText";
import { Paragraph } from "components/Typography";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { lowisy_s3_url } from "utils/constants";
import Image from "components/BazaarImage";
import ContactUsModal from "pages-sections/restaurant/ContactUsModal";
import RecommendRestaurant from "pages-sections/restaurant/RecommendRestaurant";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import PrivacyPolicyDialog from "components/PrivacyPolicyDialog";
import ImprintDialog from "components/ImprintDialog";

// styled components
const StyledFooter = styled("footer")<{ bgcolor?: string }>(
  ({ theme, bgcolor }) => ({
    color: "white",
    zIndex: 999,
    marginBottom: 0,
    position: "static",
    left: 0,
    bottom: 0,
    right: 0,
    clear: "both",
    // background: bgcolor ? bgcolor : theme.palette.secondary.main,
    background: "#111d4d1a",
    // [theme.breakpoints.down("md")]: { marginBottom: "4rem" },
  })
);

const StyledLink = styled("a")(({ theme }) => ({
  borderRadius: 4,
  display: "block",
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.dark[500],
  "&:hover": { color: theme.palette.grey[600] },
}));

// =================================================================
type PageFooterProp = {
  id?: string;
  bgcolor?: string;
  sx?: { [key: string]: any };
};
// =================================================================

const NewFooter: FC<PageFooterProp> = ({ sx, id, bgcolor }) => {
  const theme = useTheme();
  const [dialogOpenReRestaurant, setDialogOpenRestaurant] = useState(false);
  const [dialogOpenContactus, setDialogOpenContactus] = useState(false);
  const [dialogOpenPolicy, setDialogOpenPolicy] = useState(false);
  const [dialogOpenImprint, setDialogOpenImprint] = useState(false);
  const toggleDialogRestaurant = () =>
    setDialogOpenRestaurant(!dialogOpenReRestaurant);
  const toggleDialogContactUs = () =>
    setDialogOpenContactus(!dialogOpenContactus);
  const toggleDialogPolicy = () => setDialogOpenPolicy(!dialogOpenPolicy);
  const toggleDialogImprint = () => setDialogOpenImprint(!dialogOpenImprint);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t } = useTranslation("common");

  const router = useRouter();
  const language = router.locale;
  useEffect(() => {}, [router.locale]);

  return (
    <StyledFooter id={id} sx={{ ...sx, p: 4 }} bgcolor={bgcolor}>
      <Container>
        <Box
          sx={{
            width: { md: "220px", xs: "215px", sm: "210px" },
            mx: { md: "auto", sm: "auto", xs: "auto" },
          }}
        >
          <Link href="/">
            <a>
              <Image
                height={74}
                src={lowisy_s3_url + "Lowisy_Restaurants_big.svg"}
                alt="logo"
                sx={{}}
              />
            </a>
          </Link>
        </Box>

        <Box
          sx={{
            mx: { md: "auto", xs: "auto", sm: "auto" },
            width: { md: "100px", xs: "75px", sm: "65px" },
          }}
        >
          <Typography
            style={{ color: "#7F7F7F" }}
            sx={{
              color: "red",
              fontWeight: "bold",
              fontSize: { md: "20px", xs: "16px" },
              marginY: { md: "10px", xs: "5px" },

              width: { xs: "90px", md: "120px" },
            }}
          >
            Follow us
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "center",
            },

            padding: 2,
            width: { md: "290px" },
            mx: { md: "auto" },
          }}
        >
          <a href="#">
            <BazaarIconButton
              m={1.2}
              bgcolor="#111D4D"
              fontSize="16px"
              padding="10px"
              sx={{
                border: 1,
                borderColor: "white",
                "&:hover": {
                  background: "#3b5998",
                },
              }}
            >
              <Link href="https://www.facebook.com/LowisyDACH/" passHref>
                <Facebook fontSize="inherit" />
              </Link>
            </BazaarIconButton>

            <BazaarIconButton
              m={1.2}
              bgcolor="#111D4D"
              fontSize="16px"
              padding="10px"
              sx={{
                border: 1,
                borderColor: "white",
                "&:hover": {
                  background:
                    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);",
                },
              }}
            >
              <Link href="https://www.instagram.com/lowisy_dach/" passHref>
                <Instagram fontSize="inherit" />
              </Link>
            </BazaarIconButton>
          </a>

          {/* <Image
            height={34}
            src={lowisy_s3_url + "instagram_icon.svg"}
            alt="logo"
            sx={{ borderRadius: "50%", backgroundColor: "#111D4D" }}
          />
          <Image
            height={34}
            src={lowisy_s3_url + "facebook_icon.svg"}
            alt="logo"
            sx={{ borderRadius: "50%" }}
          /> */}
        </Box>

        <Box
          sx={{
            display: "flex-col",

            // width: { md: "75%", xs: "100%", sm: "75%", lg: "100%" },
            width: "100%",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: { md: "flex", xs: "flex-col", sm: "flex" },
              mx: "auto",
              justifyContent: {
                md: "space-between",
                xs: "",
                sm: "space-between",
                lg: "space-between",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",

                justifyContent: {
                  md: "center",
                  xs: "space-evenly",
                  sm: "center",
                  lg: "center",
                },
              }}
            >
              <Typography
                style={{ color: "#111D4D" }}
                sx={{
                  fontSize: { md: "16px", sm: "16px", xs: "14px" },
                  flexWrap: { xs: "wrap" },

                  display: "inline-block",
                  ml: { lg: "-5.5rem", md: "-5rem", sm: "-4rem" },
                  mr: { lg: "4rem", md: "3rem", sm: "2rem" },
                }}
                onClick={toggleDialogRestaurant}
              >
                <StyledLink
                  sx={{
                    sm: { wordBreak: "break-all" },
                    flexWrap: { xs: "wrap" },
                  }}
                >
                  {t("recommend-your-favorite")}
                </StyledLink>
              </Typography>
              <Dialog
                open={dialogOpenReRestaurant}
                fullWidth={isMobile}
                scroll="body"
                onClose={toggleDialogRestaurant}
              >
                <RecommendRestaurant setDialogOpen={setDialogOpenRestaurant} />
              </Dialog>

              <Typography
                style={{ color: "#111D4D" }}
                sx={{
                  fontSize: { md: "16px", sm: "16px", xs: "14px" },
                  display: "inline-block",
                }}
                onClick={toggleDialogImprint}
              >
                <StyledLink>{t("imprint")}</StyledLink>
                <Dialog
                  open={dialogOpenImprint}
                  scroll="paper"
                  //fullWidth={isMobile}
                  sx={{ mt: { xs: "4rem" } }}
                  onClose={toggleDialogImprint}
                  // sx={{ padding: 10 }}
                >
                  {/* {language === "en" ? (
                    <ImprintEN setDialogOpen={setDialogOpenImprint} />
                  ) : (
                    <ImprintDE setDialogOpen={setDialogOpenImprint} />
                  )} */}
                  <ImprintDialog setDialogOpen={setDialogOpenImprint} />
                </Dialog>
              </Typography>
              <Typography
                style={{ color: "#111D4D" }}
                sx={{
                  fontSize: { md: "16px", sm: "16px", xs: "14px" },
                  flexWrap: { xs: "wrap" },

                  display: "inline-block",
                  ml: { lg: "4rem", md: "3rem", sm: "2rem" },
                }}
                onClick={toggleDialogPolicy}
              >
                <StyledLink onClick={toggleDialogPolicy}>
                  {/* <Link href={navigationPrivacyPolicy}> */}
                  {t("privacy-policy")}
                  {/* </Link> */}
                </StyledLink>
              </Typography>
              <Dialog
                scroll="paper"
                open={dialogOpenPolicy}
                //fullWidth={isMobile}
                onClose={toggleDialogPolicy}
                sx={{ mt: { xs: "4rem" } }}
                // sx={{
                //   mt: { xs: "100px" },

                //   width: { xs: "350px", lg: "700px" },
                //   mx: "auto",
                //   height: { xs: "500px", lg: "800px" },
                //   "&::-webkit-scrollbar": { display: "none" },
                // }}
              >
                {/* {language === "en" ? (
                  <PrivacyPolicyEN setDialogOpen={setDialogOpenPolicy} />
                ) : (
                  <PrivacyPolicyDE setDialogOpen={setDialogOpenPolicy} />

                )} */}
                <PrivacyPolicyDialog setDialogOpen={setDialogOpenPolicy} />
              </Dialog>

              {/* <CustomizedDialog /> */}
              <Typography
                style={{ color: "#111D4D" }}
                sx={{
                  fontSize: { md: "16px", sm: "16px", xs: "14px" },
                  flexWrap: { xs: "wrap" },
                  display: "inline-block",
                  ml: { lg: "4rem", md: "3rem", sm: "2rem" },
                }}
                onClick={toggleDialogContactUs}
              >
                <StyledLink>{t("send-us-a-message")}</StyledLink>
              </Typography>
              <Dialog
                open={dialogOpenContactus}
                fullWidth={isMobile}
                scroll="body"
                onClose={toggleDialogContactUs}
              >
                <ContactUsModal setDialogOpen={setDialogOpenContactus} />
              </Dialog>
              <Typography
                style={{ color: "#111D4D" }}
                sx={{
                  fontSize: { md: "16px", sm: "16px", xs: "14px" },
                  flexWrap: { xs: "wrap" },

                  display: "inline-block",
                  ml: { lg: "4rem", md: "3rem", sm: "2rem" },
                }}
              >
                <StyledLink
                  href="https://uat.lowisy.com/auth/login/"
                  target="_blank"
                  sx={{
                    sm: { wordBreak: "break-all" },
                    flexWrap: { xs: "wrap" },
                  }}
                >
                  {t("log-in-as-restaurant")}
                </StyledLink>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: { md: "165px", xs: "180px", lg: "165px" },
              mx: { md: "auto", xs: "auto", lg: "auto" },
              mt: { xs: "7px" },
            }}
          >
            <Typography
              style={{ color: "#111D4D" }}
              sx={{ fontSize: { md: "16px" }, textAlign: "center" }}
            >
              © 2022 - Lowisy.com
            </Typography>
          </Box>
        </Box>

        {/* </Link> */}

        {/* 
        <Grid container spacing={6} sx={{ border: 2 }}>
          <Grid item md={6} sm={6} xs={12}>
            <Paragraph mb={2.5} color="grey.300" maxWidth="370px">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat
              et lectus vel ut sollicitudin elit at amet.
            </Paragraph>

            <AppStore />
            <Box mt={-0.6}>
              {customerCareLinks.map((item, ind) => (
                <Link href="/" key={ind} passHref>
                  <StyledLink>{item}</StyledLink>
                </Link>
              ))}
            </Box>

            <FlexBox className="flex" mx={-0.625} mt={2}>
              {iconList.map((item, ind) => (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopenner"
                  key={ind}
                >
                  <BazaarIconButton
                    m={0.5}
                    bgcolor="rgba(0,0,0,0.2)"
                    fontSize="12px"
                    padding="10px"
                  >
                    <item.icon fontSize="inherit" />
                  </BazaarIconButton>
                </a>
              ))}
            </FlexBox>
          </Grid>

          <Grid item md={6} sm={6} xs={12}></Grid>
        </Grid> */}
      </Container>
    </StyledFooter>
  );
};

const customerCareLinks = [
  "Help Center",
  "Track Your Order",
  "Corporate & Bulk Purchasing",
  "Returns & Refunds",
];

// const iconList = [
//   { icon: Facebook, url: "https://www.facebook.com/UILibOfficial" },
//   { icon: Twitter, url: "/" },
//   {
//     icon: Youtube,
//     url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
//   },
//   { icon: Google, url: "/" },
//   { icon: Instagram, url: "/" },
// ];

//lowisy-dev.s3.eu-central-1.amazonaws.com/instagram_icon.svg
//lowisy-dev.s3.eu-central-1.amazonaws.com/facebook_icon.svg
const iconList = [
  { icon: Facebook, url: "#" },
  { icon: Instagram, url: "#" },
  // {
  //   icon: Youtube,
  //   url: "#",
  // },
];

export default NewFooter;
