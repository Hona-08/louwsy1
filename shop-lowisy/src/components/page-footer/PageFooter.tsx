import { Box, Container, Grid, styled, Typography } from "@mui/material";
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
import { FC } from "react";
import { lowisy_s3_url } from "utils/constants";
import Image from "components/BazaarImage";

// styled components
const StyledFooter = styled("footer")<{ bgcolor?: string }>(
  ({ theme, bgcolor }) => ({
    color: "white",
    padding: "40px",
    background: bgcolor ? bgcolor : theme.palette.secondary.main,
    [theme.breakpoints.down("md")]: { marginBottom: "4rem" },
  })
);

const StyledLink = styled("a")(({ theme }) => ({
  borderRadius: 4,
  display: "block",
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[300],
  "&:hover": { color: theme.palette.grey[100] },
}));

// =================================================================
type PageFooterProp = {
  id?: string;
  bgcolor?: string;
  sx?: { [key: string]: any };
};
// =================================================================

const PageFooter: FC<PageFooterProp> = ({ sx, id, bgcolor }) => {
  return (
    <StyledFooter id={id} sx={sx} bgcolor={bgcolor}>
      <Container>
        <Box sx={{ width: { md: "220px", xs: "215px" }, mx: "auto" }}>
          <Link href="/">
            <a>
              {/* <BazaarImage mb={2.5} src="/assets/images/logo.svg" alt="logo" /> */}

              <LogoWithoutText
                sx={{
                  mx: { xs: "auto", md: "auto" },
                  mb: "20px",

                  width: "250px",
                  height: "80px",
                }}
              />
              {/* 
              <Image
                height={74}
                src={lowisy_s3_url + "bear.svg"}
                alt="logo"
                sx={{ border: 2 }}
              /> */}
            </a>
          </Link>
        </Box>

        <Box
          sx={{
            mx: { md: "auto", xs: "auto" },
            width: { md: "100px", xs: "75px" },
          }}
        >
          <Typography
            sx={{
              fontSize: { md: "20px", xs: "16px" },
              marginY: { md: "10px", xs: "5px" },
            }}
          >
            Follow us
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "space-around",
              sm: "center",
              md: "space-around",
            },
            padding: 2,
            width: { md: "290px" },
            mx: { md: "auto" },
          }}
        >
          {iconList.map((item, ind) => (
            <a href="#" key={ind}>
              <BazaarIconButton
                m={1.2}
                bgcolor="rgba(0,0,0,0.2)"
                fontSize="16px"
                padding="10px"
                sx={{ border: 1, borderColor: "white" }}
              >
                <item.icon fontSize="inherit" />
              </BazaarIconButton>
            </a>
          ))}
        </Box>

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
        <FooterNew />
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

const iconList = [
  { icon: Facebook, url: "https://www.facebook.com/UILibOfficial" },
  { icon: Twitter, url: "/" },
  // {
  //   icon: Youtube,
  //   url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
  // },
  { icon: Google, url: "/" },
  { icon: Instagram, url: "/" },
];

export default PageFooter;
