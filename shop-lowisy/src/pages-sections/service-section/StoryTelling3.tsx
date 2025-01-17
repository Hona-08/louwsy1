import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  styled,
  Theme,
  Typography,
} from "@mui/material";
import { FlexBox } from "components/flex-box";
import appIcons from "components/icons";
import { H3, H4, Span } from "components/Typography";
import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useMediaQuery from "@mui/material/useMediaQuery";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SavingsIcon from "@mui/icons-material/Savings";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import Image from "components/BazaarImage";
import { useTranslation } from "react-i18next";
import { bgcolor, useTheme } from "@mui/system";
import { S3_HEADERS_URL } from "pages-sections/restaurant/RestaurantSection1";

const storytelling3 = `assets/images/headers/storytelling3.jpg`;

const RootStyle = styled("div")(({ theme }) => ({
  //padding: theme.spacing(8, 0),
}));

// styled components
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  flexWrap: "wrap",
  padding: "1.5rem",
  // background: "#fff",
  borderRadius: "8px",
  boxShadow: theme.shadows[2],
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    padding: "1rem 0.5rem",
    flexDirection: "column",
  },
}));
const ContentStyle = styled("div")(({ theme }) => ({
  borderRadius: "20px",
  backgroundColor: "white",
  width: "90%",
  height: "90%",
  textAlign: "center",
}));

const StoryTelling3: FC = () => {
  const theme = useTheme();
  const below720 = useMediaQuery(theme.breakpoints.down(720));
  const above500 = useMediaQuery(theme.breakpoints.up(500));
  const above720 = useMediaQuery(theme.breakpoints.up(720));
  const upZero = useMediaQuery(theme.breakpoints.up(0));
  const { t } = useTranslation("common");
  return (
    <RootStyle>
      <Container
        sx={{
          p: 0,
          "@media (min-width: 600px)": {
            p: 0,
          },
          mt: { xs: 0 },
        }}
      >
        <Grid container spacing={0} justifyContent="center">
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 0,
              maxHeight: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                justifyContent: "center",
              }}
            >
              <Image
                src={storytelling3}
                alt="image"
                sx={{
                  width: "100%",
                  height: above720
                    ? {
                        sm: "600px",
                        md: "700px",
                        lg: "950px",
                      }
                    : below720 && above500
                    ? { xs: "400px" }
                    : { xs: "300px" },
                }}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <ContentStyle sx={{ mx: "auto" }}>
              <Typography
                variant="h3"
                sx={{
                  // mt: { lg: "10rem", md: "5rem", sm: "5rem", xs: "5rem" },

                  color: "common.white",
                  textAlign: "center",
                }}
              >
                <H3
                  sx={{
                    color: "#111d4d",
                    fontSize: {
                      lg: "3.2rem",
                      md: "2.6rem",
                      sm: "2.3rem",
                      xs: "2rem",
                    },
                    mt: { lg: "1rem", sm: "1rem", md: "1rem", xs: "2rem" },
                  }}
                >
                  {" "}
                  {t("storytelling3-title")}
                </H3>
              </Typography>

              <Typography
                sx={{
                  color: "#111d4d",
                  textAlign: "center",
                  fontSize: {
                    lg: "2.7rem",
                    md: "2rem",
                    sm: "1.8rem",
                    xs: "1.5rem",
                  },
                  p: { xs: 1 },
                  mb: "7px",
                }}
              >
                {t("storytelling3-subtitle")}
              </Typography>
              <Box
                sx={{
                  ml: { lg: "1rem", sm: "0.5rem", md: "0.7rem" },
                  mt: { lg: "1rem" },
                }}
              >
                <Box
                  sx={{
                    ml: { lg: "1rem", sm: "4rem", md: "0.7rem" },
                    mt: { lg: "1rem" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    sx={{
                      fontSize: "3rem",
                      color: "green",
                      mr: { lg: "10px", md: "10px", sm: "10px", xs: "0" },
                      ml: { lg: "20px", md: "20px", sm: "20px", xs: "0" },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#111d4d",
                      display: "inline-block",
                      ml: "10px",
                      textAlign: "left",
                      fontSize: "1.4em",

                      p: { xs: 1 },
                    }}
                  >
                    {t("storytelling3-text1")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ml: { lg: "1rem", sm: "4rem", md: "0.7rem" },
                    mt: { lg: "1rem" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    sx={{
                      fontSize: "3rem",
                      color: "green",
                      mr: { lg: "10px", md: "10px", sm: "10px", xs: "0" },
                      ml: { lg: "20px", md: "20px", sm: "20px", xs: "0" },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#111d4d",
                      display: "inline-block",
                      ml: "10px",
                      textAlign: "left",
                      fontSize: "1.4em",

                      p: { xs: 1 },
                    }}
                  >
                    {t("storytelling3-text2")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ml: { lg: "1rem", sm: "4rem", md: "0.7rem" },
                    mt: { lg: "1rem" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    sx={{
                      fontSize: "3rem",
                      color: "green",
                      mr: { lg: "10px", md: "10px", sm: "10px", xs: "0" },
                      ml: { lg: "20px", md: "20px", sm: "20px", xs: "0" },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#111d4d",
                      display: "inline-block",
                      ml: "10px",
                      textAlign: "left",
                      fontSize: "1.4em",

                      p: { xs: 1 },
                    }}
                  >
                    {t("storytelling3-text3")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ml: { lg: "1rem", sm: "4rem", md: "0.7rem" },
                    mt: { lg: "1rem" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    sx={{
                      fontSize: "3rem",
                      color: "green",
                      mr: { lg: "10px", md: "10px", sm: "10px", xs: "0" },
                      ml: { lg: "20px", md: "20px", sm: "20px", xs: "0" },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#111d4d",
                      display: "inline-block",
                      ml: "10px",
                      textAlign: "left",
                      fontSize: "1.4em",

                      p: { xs: 1 },
                    }}
                  >
                    {t("storytelling3-text4")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ml: { lg: "1rem", sm: "4rem", md: "0.7rem" },
                    mt: { lg: "1rem" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    sx={{
                      fontSize: "3rem",
                      color: "green",
                      mr: { lg: "10px", md: "10px", sm: "10px", xs: "0" },
                      ml: { lg: "20px", md: "20px", sm: "20px", xs: "0" },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#111d4d",
                      display: "inline-block",
                      ml: "10px",
                      textAlign: "left",
                      fontSize: "1.4em",

                      p: { xs: 1 },
                    }}
                  >
                    {t("storytelling3-text5")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ml: { lg: "1rem", sm: "4rem", md: "0.7rem" },
                    mt: { lg: "1rem" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    sx={{
                      fontSize: "3rem",
                      color: "green",
                      mr: { lg: "10px", md: "10px", sm: "10px", xs: "0" },
                      ml: { lg: "20px", md: "20px", sm: "20px", xs: "0" },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#111d4d",
                      display: "inline-block",
                      ml: "10px",
                      textAlign: "left",
                      fontSize: "1.4em",

                      p: { xs: 1 },
                    }}
                  >
                    {t("storytelling3-text6")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ml: { lg: "1rem", sm: "4rem", md: "0.7rem" },
                    mt: { lg: "1rem" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    mb: { xs: "5rem", sm: "8rem", lg: "0", md: "0" },
                  }}
                >
                  <TaskAltIcon
                    sx={{
                      fontSize: "3rem",
                      color: "green",
                      mr: { lg: "10px", md: "10px", sm: "10px", xs: "0" },
                      ml: { lg: "20px", md: "20px", sm: "20px", xs: "0" },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#111d4d",
                      display: "inline-block",
                      ml: "10px",
                      textAlign: "left",
                      fontSize: "1.4em",

                      p: { xs: 1 },
                    }}
                  >
                    {t("storytelling3-text7")}
                  </Typography>
                </Box>
              </Box>
            </ContentStyle>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
};

export default StoryTelling3;
