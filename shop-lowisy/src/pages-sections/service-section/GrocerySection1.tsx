import {
  Box,
  Button,
  Dialog,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Theme,
} from "@mui/material";
import BazaarButton from "components/BazaarButton";
import { SearchOutlinedIcon } from "components/search-box/SearchBox";
import { H1, H2, H3 } from "components/Typography";
import RecommendRestaurant from "pages-sections/restaurant/RecommendRestaurant";
import Signup from "pages-sections/sessions/Signup";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Login from "../../../pages/login";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Countdown from "pages-sections/countdown";
import axios from "axios";
import { S3_HEADERS_URL } from "pages-sections/restaurant/RestaurantSection1";

const slider1 = `assets/images/headers/slider1.jpg`;
const slider2 = `assets/images/headers/slider2.jpg`;
const slider3 = `assets/images/headers/slider3.jpg`;
const slider4 = `assets/images/headers/slider4.jpg`;
const slider5 = `assets/images/headers/slider5.jpg`;
const slider6 = `assets/images/headers/slider6.jpg`;
const slider7 = `assets/images/headers/slider7.jpg`;
const Container1 = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 600,
  padding: 20,
  paddingTop: 160,
  backgroundColor: theme.palette.grey[100],

  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url('${slider1}')`,
  transition: "all .3s",
  filter: "blur(6px)",

  "& h1": {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.3,
  },
  "& .searchBox": {
    margin: "auto",
    maxWidth: "600px",
    borderRadius: 300,
    overflow: "hidden",
    boxShadow: theme.shadows[2],
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#E67A00",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    backgroundSize: "cover",
    //backgroundSize: "350px, 400px",
  },
  [theme.breakpoints.down("md")]: {
    height: 550,
    paddingTop: 130,
    "& h1": { fontSize: 38, textAlign: "center" },
  },
  [theme.breakpoints.down("sm")]: {
    height: 480,
    paddingTop: 100,
    "& h1": { fontSize: 30 },
    "& .searchBox": { margin: 0 },
  },
}));
const Container2 = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 600,
  padding: 20,
  paddingTop: 160,
  backgroundColor: theme.palette.grey[100],
  // backgroundSize: "30%, 30%",
  // backgroundPosition: "left bottom, right bottom",
  // backgroundRepeat: "no-repeat, no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url('${slider2}')`,
  transition: "all .3s",
  filter: "blur(6px)",
  // backgroundImage:
  //   theme.direction === "ltr"
  //     ? `url('${leftImg}'), url('${rightImg}')`
  //     : `url('${rightImg}'), url('${leftImg}')`,

  "& h1": {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.3,
  },
  "& .searchBox": {
    margin: "auto",
    maxWidth: "600px",
    borderRadius: 300,
    overflow: "hidden",
    boxShadow: theme.shadows[2],
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#E67A00",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    // backgroundSize: "350px, 400px",
    backgroundSize: "cover",
  },
  [theme.breakpoints.down("md")]: {
    height: 550,
    paddingTop: 130,
    "& h1": { fontSize: 38, textAlign: "center" },
  },
  [theme.breakpoints.down("sm")]: {
    height: 480,
    paddingTop: 100,
    "& h1": { fontSize: 30 },
    "& .searchBox": { margin: 0 },
  },
}));
const Container3 = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 600,
  padding: 20,
  paddingTop: 160,
  backgroundColor: theme.palette.grey[100],
  // backgroundSize: "30%, 30%",
  // backgroundPosition: "left bottom, right bottom",
  // backgroundRepeat: "no-repeat, no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url('${slider3}')`,
  transition: "all .3s",
  filter: "blur(6px)",
  // backgroundImage:
  //   theme.direction === "ltr"
  //     ? `url('${leftImg}'), url('${rightImg}')`
  //     : `url('${rightImg}'), url('${leftImg}')`,

  "& h1": {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.3,
  },
  "& .searchBox": {
    margin: "auto",
    maxWidth: "600px",
    borderRadius: 300,
    overflow: "hidden",
    boxShadow: theme.shadows[2],
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#E67A00",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    // backgroundSize: "350px, 400px",
    backgroundSize: "cover",
  },
  [theme.breakpoints.down("md")]: {
    height: 550,
    paddingTop: 130,
    "& h1": { fontSize: 38, textAlign: "center" },
  },
  [theme.breakpoints.down("sm")]: {
    height: 480,
    paddingTop: 100,
    "& h1": { fontSize: 30 },
    "& .searchBox": { margin: 0 },
  },
}));
const Container4 = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 600,
  padding: 20,
  paddingTop: 160,
  backgroundColor: theme.palette.grey[100],
  // backgroundSize: "30%, 30%",
  // backgroundPosition: "left bottom, right bottom",
  // backgroundRepeat: "no-repeat, no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url('${slider4}')`,
  transition: "all .3s",
  filter: "blur(6px)",
  // backgroundImage:
  //   theme.direction === "ltr"
  //     ? `url('${leftImg}'), url('${rightImg}')`
  //     : `url('${rightImg}'), url('${leftImg}')`,

  "& h1": {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.3,
  },
  "& .searchBox": {
    margin: "auto",
    maxWidth: "600px",
    borderRadius: 300,
    overflow: "hidden",
    boxShadow: theme.shadows[2],
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#E67A00",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    // backgroundSize: "350px, 400px",
    backgroundSize: "cover",
  },
  [theme.breakpoints.down("md")]: {
    height: 550,
    paddingTop: 130,
    "& h1": { fontSize: 38, textAlign: "center" },
  },
  [theme.breakpoints.down("sm")]: {
    height: 480,
    paddingTop: 100,
    "& h1": { fontSize: 30 },
    "& .searchBox": { margin: 0 },
  },
}));
const Container5 = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 600,
  padding: 20,
  paddingTop: 160,
  backgroundColor: theme.palette.grey[100],
  // backgroundSize: "30%, 30%",
  // backgroundPosition: "left bottom, right bottom",
  // backgroundRepeat: "no-repeat, no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url('${slider5}')`,
  transition: "all .3s",
  filter: "blur(6px)",
  // backgroundImage:
  //   theme.direction === "ltr"
  //     ? `url('${leftImg}'), url('${rightImg}')`
  //     : `url('${rightImg}'), url('${leftImg}')`,

  "& h1": {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.3,
  },
  "& .searchBox": {
    margin: "auto",
    maxWidth: "600px",
    borderRadius: 300,
    overflow: "hidden",
    boxShadow: theme.shadows[2],
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#E67A00",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    // backgroundSize: "350px, 400px",
    backgroundSize: "cover",
  },
  [theme.breakpoints.down("md")]: {
    height: 550,
    paddingTop: 130,
    "& h1": { fontSize: 38, textAlign: "center" },
  },
  [theme.breakpoints.down("sm")]: {
    height: 480,
    paddingTop: 100,
    "& h1": { fontSize: 30 },
    "& .searchBox": { margin: 0 },
  },
}));
const Container6 = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 600,
  padding: 20,
  paddingTop: 160,
  backgroundColor: theme.palette.grey[100],
  // backgroundSize: "30%, 30%",
  // backgroundPosition: "left bottom, right bottom",
  // backgroundRepeat: "no-repeat, no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url('${slider6}')`,
  transition: "all .3s",
  filter: "blur(6px)",
  // backgroundImage:
  //   theme.direction === "ltr"
  //     ? `url('${leftImg}'), url('${rightImg}')`
  //     : `url('${rightImg}'), url('${leftImg}')`,

  "& h1": {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.3,
  },
  "& .searchBox": {
    margin: "auto",
    maxWidth: "600px",
    borderRadius: 300,
    overflow: "hidden",
    boxShadow: theme.shadows[2],
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#E67A00",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    // backgroundSize: "350px, 400px",
    backgroundSize: "cover",
  },
  [theme.breakpoints.down("md")]: {
    height: 550,
    paddingTop: 130,
    "& h1": { fontSize: 38, textAlign: "center" },
  },
  [theme.breakpoints.down("sm")]: {
    height: 480,
    paddingTop: 100,
    "& h1": { fontSize: 30 },
    "& .searchBox": { margin: 0 },
  },
}));
const Container7 = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 600,
  padding: 20,
  paddingTop: 160,
  backgroundColor: theme.palette.grey[100],
  // backgroundSize: "30%, 30%",
  // backgroundPosition: "left bottom, right bottom",
  // backgroundRepeat: "no-repeat, no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url('${slider7}')`,
  transition: "all .3s",
  filter: "blur(6px)",
  // backgroundImage:
  //   theme.direction === "ltr"
  //     ? `url('${leftImg}'), url('${rightImg}')`
  //     : `url('${rightImg}'), url('${leftImg}')`,

  "& h1": {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.3,
  },
  "& .searchBox": {
    margin: "auto",
    maxWidth: "600px",
    borderRadius: 300,
    overflow: "hidden",
    boxShadow: theme.shadows[2],
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#E67A00",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    // backgroundSize: "350px, 400px",
    backgroundSize: "cover",
  },
  [theme.breakpoints.down("md")]: {
    height: 550,
    paddingTop: 130,
    "& h1": { fontSize: 38, textAlign: "center" },
  },
  [theme.breakpoints.down("sm")]: {
    height: 480,
    paddingTop: 100,
    "& h1": { fontSize: 30 },
    "& .searchBox": { margin: 0 },
  },
}));

const GrocerySection1: FC = () => {
  useEffect(() => {
    const stylesheet = document.styleSheets[0];
    stylesheet.insertRule(
      ".swiper-pagination-bullet-active { background: #111d4d !important;}",
      0
    );
  }, []);
  const theme = useTheme();
  const { t } = useTranslation("common");
  const [dialogOpen, setDialogOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const below720 = useMediaQuery(theme.breakpoints.down(720));
  const above535 = useMediaQuery(theme.breakpoints.up(535));
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  SwiperCore.use([Autoplay]);

  return (
    <>
      <Swiper
        style={{ maxHeight: "600px" }}
        pagination={{
          dynamicBullets: true,
        }}
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 7000 }}
        className="mySwiper"
      >
        <SwiperSlide>
          <Container1></Container1>
          <Box
            sx={{
              position: "absolute",
              transform: "translate(-50 %, -50 %)",
              width: { lg: "40rem", md: "30rem", sm: "25rem", xs: "65%" },
              height:
                below720 && above535
                  ? "10rem"
                  : { lg: "10rem", md: "11rem", sm: "10rem", xs: "13rem" },
              maxWidth: "40rem",

              left: { lg: 0, sm: "2rem", xs: "1rem" },
              right: 0,
              top: isMobile ? "2%" : "25%",
              bottom: 0,
              mx: "auto",
              zIndex: 2,

              padding: { lg: "1.5rem", md: "1rem", sm: "1.5rem", xs: "0.7rem" },

              textAlign: "center",

              borderColor: "red",
              borderRadius: "1rem",
              bgcolor: "rgb(17,29,77,0.7)",
            }}
          >
            <H1
              maxWidth={600}
              mx="auto"
              sx={{
                color: "white",
                // fontSize: { lg: "30px", md: "25px", sm: "20px", xs: "16px" },
                fontSize: "1.5rem",
                fontWeight: { lg: "bold", md: "bold", sm: "bold", xs: "bold" },
                mt: "0.7rem",
              }}
            >
              {t("landing-slider1-title")}
            </H1>
            <Typography
              sx={{
                maxWidth: 600,
                mx: "auto",
                textAlign: "center",
                // fontSize: { lg: "20px", md: "18px", sm: "16px", xs: "14px" },
                fontSize: "1rem",
                fontWeight: {
                  lg: "bold",
                  md: "bold",
                  sm: "bold",
                  xs: "medium",
                },
                color: "white",
                mb: "20px",
              }}
            >
              {t("landing-slider1-subtitle")}
            </Typography>
            <Box textAlign="center" onClick={toggleDialog}>
              <BazaarButton
                color="primary"
                variant="contained"
                sx={{
                  height: 48,
                  width: {
                    lg: "13.9375rem",
                    md: "13.9375rem",
                    sm: "13.9375rem",
                    xs: "13rem",
                  },
                  fontSize: {
                    xs: "1rem",
                    lg: "1rem",
                    md: "1rem",
                    sm: "1rem",
                  },
                  paddingY: "0.2rem ",
                  paddingX: "0.5rem",
                }}
              >
                {t("landing-slider1-button")}
              </BazaarButton>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Container2></Container2>
          <Box
            sx={{
              position: "absolute",
              // top: isMobile ? "2%" : "25%",
              // // left: { lg: "25%", md: "" },

              // left: { lg: "38%", md: "38%", sm: "25%" },
              transform: "translate(-50 %, -50 %)",
              width: { lg: "40rem", md: "30rem", sm: "25rem", xs: "65%" },
              height:
                below720 && above535
                  ? "10rem"
                  : { lg: "10rem", md: "11rem", sm: "11rem", xs: "15rem" },

              maxWidth: "40rem",

              left: { lg: 0, sm: "2rem", xs: "1rem" },
              right: 0,
              top: isMobile ? "2%" : "25%",
              bottom: 0,
              mx: "auto",
              zIndex: 2,

              padding: { lg: "1.5rem", md: "1rem", sm: "1rem", xs: "0.7rem" },

              textAlign: "center",

              borderColor: "red",
              borderRadius: "1rem",
              bgcolor: "rgb(17,29,77,0.7)",
            }}
          >
            <H1
              maxWidth={600}
              mx="auto"
              sx={{
                color: "white",
                fontSize: "1.5rem",
                fontWeight: { lg: "bold", md: "bold", sm: "bold", xs: "bold" },
                mt: "0.7rem",
              }}
            >
              {t("landing-slider2-title")}
            </H1>
            <Typography
              sx={{
                maxWidth: 600,
                mx: "auto",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: {
                  lg: "bold",
                  md: "bold",
                  sm: "bold",
                  xs: "medium",
                },
                color: "white",
                mb: "20px",
              }}
            >
              {t("landing-slider2-subtitle")}
            </Typography>
            <Box textAlign="center" onClick={toggleDialog}>
              <BazaarButton
                color="primary"
                variant="contained"
                sx={{
                  height: 48,
                  width: {
                    lg: "13.9375rem",
                    md: "13.9375rem",
                    sm: "13.9375rem",
                    xs: "13rem",
                  },
                  fontSize: {
                    xs: "1rem",
                    lg: "1rem",
                    md: "1rem",
                    sm: "1rem",
                  },
                  paddingY: "0.2rem ",
                  paddingX: "0.5rem",
                }}
              >
                {t("landing-slider2-button")}
              </BazaarButton>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Container3></Container3>
          <Box
            sx={{
              position: "absolute",
              // top: isMobile ? "2%" : "25%",
              // // left: { lg: "25%", md: "" },

              // left: { lg: "38%", md: "38%", sm: "25%" },
              transform: "translate(-50 %, -50 %)",
              width: { lg: "40rem", md: "30rem", sm: "25rem", xs: "65%" },
              height:
                below720 && above535
                  ? "10rem"
                  : { lg: "10rem", md: "11rem", sm: "11rem", xs: "10rem" },
              maxWidth: "40rem",

              left: { lg: 0, sm: "2rem", xs: "1rem" },
              right: 0,
              top: isMobile ? "2%" : "25%",
              bottom: 0,
              mx: "auto",
              zIndex: 2,

              padding: { lg: "1.5rem", md: "1rem", sm: "1rem", xs: "0.7rem" },

              textAlign: "center",

              borderColor: "red",
              borderRadius: "1rem",
              bgcolor: "rgb(17,29,77,0.7)",
            }}
          >
            <H1
              maxWidth={600}
              mx="auto"
              sx={{
                color: "white",
                fontSize: "1.5rem",
                fontWeight: { lg: "bold", md: "bold", sm: "bold", xs: "bold" },
                mt: "0.7rem",
              }}
            >
              {t("landing-slider3-title")}
            </H1>
            <Typography
              sx={{
                maxWidth: 600,
                mx: "auto",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: {
                  lg: "bold",
                  md: "bold",
                  sm: "bold",
                  xs: "medium",
                },
                color: "white",
                mb: "20px",
              }}
            >
              {t("landing-slider3-subtitle")}
            </Typography>
            <Box textAlign="center" onClick={toggleDialog}>
              <BazaarButton
                color="primary"
                variant="contained"
                sx={{
                  height: 48,
                  width: {
                    lg: "13.9375rem",
                    md: "13.9375rem",
                    sm: "13.9375rem",
                    xs: "13rem",
                  },
                  fontSize: {
                    xs: "1rem",
                    lg: "1rem",
                    md: "1rem",
                    sm: "1rem",
                  },
                  paddingY: "0.2rem ",
                  paddingX: "0.5rem",
                }}
              >
                {t("landing-slider3-button")}
              </BazaarButton>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Container4></Container4>
          <Box
            sx={{
              position: "absolute",
              // top: isMobile ? "2%" : "25%",
              // // left: { lg: "25%", md: "" },

              // left: { lg: "38%", md: "38%", sm: "25%" },
              transform: "translate(-50 %, -50 %)",
              width: { lg: "40rem", md: "30rem", sm: "25rem", xs: "65%" },
              height:
                below720 && above535
                  ? "10rem"
                  : { lg: "10rem", md: "11rem", sm: "10rem", xs: "13rem" },
              maxWidth: "40rem",

              left: { lg: 0, sm: "2rem", xs: "1rem" },
              right: 0,
              top: isMobile ? "2%" : "25%",
              bottom: 0,
              mx: "auto",
              zIndex: 2,

              padding: { lg: "1.5rem", md: "1rem", sm: "1rem", xs: "0.7rem" },

              textAlign: "center",

              borderColor: "red",
              borderRadius: "1rem",
              bgcolor: "rgb(17,29,77,0.7)",
            }}
          >
            <H1
              maxWidth={600}
              mx="auto"
              sx={{
                color: "white",
                fontSize: "1.5rem",
                fontWeight: { lg: "bold", md: "bold", sm: "bold", xs: "bold" },
                mt: "0.7rem",
              }}
            >
              {t("landing-slider4-title")}
            </H1>
            <Typography
              sx={{
                maxWidth: 600,
                mx: "auto",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: {
                  lg: "bold",
                  md: "bold",
                  sm: "bold",
                  xs: "medium",
                },
                color: "white",
                mb: "20px",
              }}
            >
              {t("landing-slider4-subtitle")}
            </Typography>
            <Box textAlign="center" onClick={toggleDialog}>
              {/* <Button variant='contained' color="secondary" size='large'>
          Recommend
        </Button> */}
              <BazaarButton
                color="primary"
                variant="contained"
                sx={{
                  height: 48,
                  width: {
                    lg: "13.9375rem",
                    md: "13.9375rem",
                    sm: "13.9375rem",
                    xs: "13rem",
                  },
                  fontSize: {
                    xs: "1rem",
                    lg: "1rem",
                    md: "1rem",
                    sm: "1rem",
                  },
                  paddingY: "0.2rem ",
                  paddingX: "0.5rem",
                }}
              >
                {t("landing-slider4-button")}
              </BazaarButton>
            </Box>

            <Dialog
              open={dialogOpen}
              fullWidth={isMobile}
              scroll="body"
              onClose={toggleDialog}
            >
              <RecommendRestaurant setDialogOpen={setDialogOpen} />
            </Dialog>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Container5>
            {/* <Box className="searchBox">
        <TextField
          placeholder={t('favourite-restaurant')}
          fullWidth
          variant="outlined"
          onClick={toggleDialog}
          InputProps={{
            sx: {
              height: 50,
              paddingRight: 0,
              color: "grey.700",
              borderRadius: 300,
              background: "#fff",
              "& fieldset": { border: "none" },
            },
            endAdornment: (
              <BazaarButton
                disableElevation
                variant="contained"
                sx={{
                  px: "2rem",
                  height: "100%",
                  borderRadius: "0 8px 8px 0",
                  background: "#E67A00",
                  color: "white",
                }}
              >
                Submit
              </BazaarButton>
            ),
            startAdornment: <SearchOutlinedIcon fontSize="small" />,
          }}
        />
      </Box> */}
          </Container5>
          <Box
            sx={{
              position: "absolute",
              // top: isMobile ? "2%" : "25%",
              // // left: { lg: "25%", md: "" },

              // left: { lg: "38%", md: "38%", sm: "25%" },
              transform: "translate(-50 %, -50 %)",
              width: { lg: "40rem", md: "30rem", sm: "25rem", xs: "65%" },
              height:
                below720 && above535
                  ? "16rem"
                  : { lg: "17rem", md: "17rem", sm: "17rem", xs: "18.8rem" },
              maxWidth: "40rem",

              left: { lg: 0, sm: "2rem", xs: "1rem" },
              right: 0,
              top: isMobile ? "2%" : "20%",
              bottom: 0,
              mx: "auto",
              zIndex: 2,

              padding: { lg: "1.5rem", md: "1rem", sm: "1rem", xs: "0.7rem" },

              textAlign: "center",

              borderColor: "red",
              borderRadius: "1rem",
              bgcolor: "rgb(17,29,77,0.7)",
            }}
          >
            <H1
              maxWidth={600}
              mx="auto"
              sx={{
                color: "white",
                fontSize: "1.5rem",
                fontWeight: { lg: "bold", md: "bold", sm: "bold", xs: "bold" },
                mt: "0.7rem",
              }}
            >
              {t("landing-slider5-title")}
            </H1>
            <Typography
              sx={{
                maxWidth: 600,
                mx: "auto",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: {
                  lg: "bold",
                  md: "bold",
                  sm: "bold",
                  xs: "medium",
                },
                color: "white",
                // mb: "5px",
              }}
            >
              {t("landing-slider5-subtitle")}
            </Typography>
            <Typography
              sx={{
                maxWidth: 600,
                mx: "auto",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: {
                  lg: "bold",
                  md: "bold",
                  sm: "bold",
                  xs: "medium",
                },
                color: "white",
                mt: "2px",
                // mb: "5px",
              }}
            >
              {t("time-to-beta-phase")}
            </Typography>
            <Box textAlign="center">
              <Countdown expireDate={new Date(2023, 0, 16, 13, 45).getTime()} />
              <Box textAlign="center" onClick={toggleDialog}>
                <BazaarButton
                  color="primary"
                  variant="contained"
                  sx={{
                    height: 48,
                    width: {
                      lg: "13.9375rem",
                      md: "13.9375rem",
                      sm: "13.9375rem",
                      xs: "13rem",
                    },
                    mt: "1rem",
                    fontSize: {
                      xs: "1rem",
                      lg: "1rem",
                      md: "1rem",
                      sm: "1rem",
                    },
                    paddingY: "0.2rem ",
                    paddingX: "0.5rem",
                  }}
                >
                  {t("landing-slider1-button")}
                </BazaarButton>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Container6></Container6>
          <Box
            sx={{
              position: "absolute",
              // top: isMobile ? "2%" : "25%",
              // // left: { lg: "25%", md: "" },

              // left: { lg: "38%", md: "38%", sm: "25%" },
              transform: "translate(-50 %, -50 %)",
              width: { lg: "40rem", md: "30rem", sm: "25rem", xs: "65%" },
              height:
                below720 && above535
                  ? "10rem"
                  : { lg: "10rem", md: "11rem", sm: "10rem", xs: "13rem" },
              maxWidth: "40rem",

              left: { lg: 0, sm: "2rem", xs: "1rem" },
              right: 0,
              top: isMobile ? "2%" : "25%",
              bottom: 0,
              mx: "auto",
              zIndex: 2,

              padding: { lg: "1.5rem", md: "1rem", sm: "1rem", xs: "0.7rem" },

              textAlign: "center",

              borderColor: "red",
              borderRadius: "1rem",
              bgcolor: "rgb(17,29,77,0.7)",
            }}
          >
            <H1
              maxWidth={600}
              mx="auto"
              sx={{
                color: "white",
                fontSize: "1.5rem",
                fontWeight: { lg: "bold", md: "bold", sm: "bold", xs: "bold" },
                mt: "0.7rem",
              }}
            >
              {t("landing-slider6-title")}
            </H1>
            <Typography
              sx={{
                maxWidth: 600,
                mx: "auto",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: {
                  lg: "bold",
                  md: "bold",
                  sm: "bold",
                  xs: "medium",
                },
                color: "white",
                mb: "20px",
              }}
            >
              {t("landing-slider6-subtitle")}
            </Typography>
            <Box textAlign="center" onClick={toggleDialog}>
              <BazaarButton
                color="primary"
                variant="contained"
                sx={{
                  height: 48,
                  width: {
                    lg: "13.9375rem",
                    md: "13.9375rem",
                    sm: "13.9375rem",
                    xs: "13rem",
                  },
                  fontSize: {
                    xs: "1rem",
                    lg: "1rem",
                    md: "1rem",
                    sm: "1rem",
                  },
                  paddingY: "0.2rem ",
                  paddingX: "0.5rem",
                }}
              >
                {t("landing-slider6-button")}
              </BazaarButton>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Container7>
            {/* <Box className="searchBox">
        <TextField
          placeholder={t('favourite-restaurant')}
          fullWidth
          variant="outlined"
          onClick={toggleDialog}
          InputProps={{
            sx: {
              height: 50,
              paddingRight: 0,
              color: "grey.700",
              borderRadius: 300,
              background: "#fff",
              "& fieldset": { border: "none" },
            },
            endAdornment: (
              <BazaarButton
                disableElevation
                variant="contained"
                sx={{
                  px: "2rem",
                  height: "100%",
                  borderRadius: "0 8px 8px 0",
                  background: "#E67A00",
                  color: "white",
                }}
              >
                Submit
              </BazaarButton>
            ),
            startAdornment: <SearchOutlinedIcon fontSize="small" />,
          }}
        />
      </Box> */}
          </Container7>
          <Box
            sx={{
              position: "absolute",
              // top: isMobile ? "2%" : "25%",
              // // left: { lg: "25%", md: "" },

              // left: { lg: "38%", md: "38%", sm: "25%" },
              transform: "translate(-50 %, -50 %)",
              width: { lg: "40rem", md: "30rem", sm: "25rem", xs: "65%" },
              height:
                below720 && above535
                  ? "10rem"
                  : { lg: "10rem", md: "11rem", sm: "10rem", xs: "13rem" },
              maxWidth: "40rem",

              left: { lg: 0, sm: "2rem", xs: "1rem" },
              right: 0,
              top: isMobile ? "2%" : "25%",
              bottom: 0,
              mx: "auto",
              zIndex: 2,

              padding: { lg: "1.5rem", md: "1rem", sm: "1rem", xs: "0.7rem" },

              textAlign: "center",

              borderColor: "red",
              borderRadius: "1rem",
              bgcolor: "rgb(17,29,77,0.7)",
            }}
          >
            <H1
              maxWidth={600}
              mx="auto"
              sx={{
                color: "white",
                fontSize: "1.5rem",
                fontWeight: { lg: "bold", md: "bold", sm: "bold", xs: "bold" },
                mt: "0.7rem",
              }}
            >
              {t("landing-slider7-title")}
            </H1>
            <Typography
              sx={{
                maxWidth: 600,
                mx: "auto",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: {
                  lg: "bold",
                  md: "bold",
                  sm: "bold",
                  xs: "medium",
                },
                color: "white",
                mb: "20px",
              }}
            >
              {t("landing-slider7-subtitle")}
            </Typography>
            <Box textAlign="center" onClick={toggleDialog}>
              <BazaarButton
                color="primary"
                variant="contained"
                sx={{
                  height: 48,
                  width: {
                    lg: "13.9375rem",
                    md: "13.9375rem",
                    sm: "13.9375rem",
                    xs: "13rem",
                  },
                  fontSize: {
                    xs: "1rem",
                    lg: "1rem",
                    md: "1rem",
                    sm: "1rem",
                  },
                  paddingY: "0.2rem ",
                  paddingX: "0.5rem",
                }}
              >
                {t("landing-slider7-button")}
              </BazaarButton>
            </Box>

            <Dialog
              open={dialogOpen}
              fullWidth={isMobile}
              scroll="body"
              onClose={toggleDialog}
            >
              <RecommendRestaurant setDialogOpen={setDialogOpen} />
            </Dialog>
          </Box>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default GrocerySection1;
