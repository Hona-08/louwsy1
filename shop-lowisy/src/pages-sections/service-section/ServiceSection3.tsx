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
import { H2, H3, H4, Span } from "components/Typography";
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
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import { useTranslation } from "react-i18next";

// =============================================================

const ServiceSection3: FC = () => {
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { t } = useTranslation("common");
  SwiperCore.use([Autoplay]);
  return (
    <Container
      sx={{ pt: '25px', pb: 10, backgroundColor: "#DDE2E9" }}
      maxWidth={false}
    >
      <Box sx={{ textAlign: "center" }}>
        <H3
          sx={{
            color: "#111d4d",
            fontSize: {
              lg: "3.2rem",
              md: "2.6rem",
              sm: "2.3rem",
              xs: "2rem",
            },
          }}
        >
          {t("step-card-title")}
        </H3>

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
            mb: "3rem",
          }}
        >
          {t("step-card-subtitle")}
        </Typography>

        {/* <Typography
          sx={{
            maxWidth: 600,
            mx: "auto",
            textAlign: "center",
            fontSize: "20px",
            color: "#909090 ",
            my: "20px",
          }}
          variant="body2"
        >
          
        </Typography> */}
      </Box>

      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        className="mySwiper"
      >
        {downSm ? (
          <Grid container rowSpacing={{ sm: 2, md: 2 }} columnSpacing={2}>
            <SwiperSlide>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Card
                  sx={{
                    padding: "45px",
                    width: { xs: "295px" },
                    height: { xs: "250px" },
                    display: "flex-col",
                    alignItems: "center",
                    mx: "auto",
                  }}
                >
                  <Box sx={{ mx: "auto", textAlign: "center" }}>
                    <RestaurantIcon
                      sx={{ fontSize: "70px" }}
                      style={{ color: "#111D4D" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: "3px",
                      mb: "5px",

                      mx: "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        ml: "15px",
                      }}
                    >
                      {t("step-card1-title")}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        ml: "15px",
                      }}
                    >
                      {t("step-card1-subtitle")}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Card
                  sx={{
                    padding: "45px",
                    width: { xs: "295px" },
                    height: { xs: "250px" },
                    display: "flex-col",
                    alignItems: "center",
                    mx: "auto",
                  }}
                >
                  <Box sx={{ mx: "auto", textAlign: "center" }}>
                    <DinnerDiningIcon
                      sx={{ fontSize: "70px" }}
                      style={{ color: "#111D4D" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: "3px",
                      mb: "5px",

                      mx: "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        textAlign: "center",

                        ml: "15px",
                      }}
                    >
                      {t("step-card2-title")}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "500",
                        textAlign: "center",

                        ml: "15px",
                      }}
                    >
                      {t("step-card2-subtitle")}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Card
                  sx={{
                    padding: "45px",
                    width: { xs: "295px" },
                    height: { xs: "250px" },
                    display: "flex-col",
                    alignItems: "center",
                    mx: "auto",
                  }}
                >
                  <Box sx={{ mx: "auto", textAlign: "center" }}>
                    <RoomServiceIcon
                      sx={{ fontSize: "70px" }}
                      style={{ color: "#111D4D" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: "3px",
                      mb: "5px",

                      mx: "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {t("step-card3-title")}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      {t("step-card3-subtitle")}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </SwiperSlide>
          </Grid>
        ) : (
          <Grid
            container
            rowSpacing={{ sm: 3, md: 3 }}
            columnSpacing={{ md: 3 }}
            sx={{
              mt: "8px",
              maxWidth: "1280px",
              mx: { md: "auto" },
            }}
          >
            <Grid item md={4} sm={4} lg={4}>
              <Card
                sx={{
                  padding: "20px",
                  width: { md: "280px", sm: "220px", lg: "340px" },
                  height: {
                    md: "200px",
                    sm: "200px",
                    lg: "220px",
                  },
                  display: "flex-col",
                  alignItems: "center",
                  mx: "auto",
                }}
              >
                <Box sx={{ mx: "auto", textAlign: "center" }}>
                  <RestaurantIcon
                    sx={{ fontSize: { lg: "70px", md: "40px", sm: "40px" } }}
                    style={{ color: "#111D4D" }}
                  />
                </Box>
                <Box
                  sx={{
                    mt: "5px",
                    mb: "5px",

                    mx: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {t("step-card1-title")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {t("step-card1-subtitle")}
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={4} sm={4} lg={4}>
              <Card
                sx={{
                  padding: "20px",
                  width: { md: "280px", sm: "220px", lg: "340px" },
                  height: {
                    md: "200px",
                    sm: "200px",
                    lg: "220px",
                  },
                  display: "flex-col",
                  alignItems: "center",
                  mx: "auto",
                }}
              >
                <Box sx={{ mx: "auto", textAlign: "center" }}>
                  <DinnerDiningIcon
                    sx={{ fontSize: { lg: "70px", md: "40px", sm: "40px" } }}
                    style={{ color: "#111D4D" }}
                  />
                </Box>
                <Box
                  sx={{
                    mt: "5px",
                    mb: "5px",

                    mx: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {t("step-card2-title")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {t("step-card2-subtitle")}
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={4} sm={4} lg={4}>
              <Card
                sx={{
                  padding: "20px",
                  width: { md: "280px", sm: "220px", lg: "340px" },
                  height: {
                    md: "200px",
                    sm: "200px",
                    lg: "220px",
                  },
                  display: "flex-col",
                  alignItems: "center",
                  mx: "auto",
                }}
              >
                <Box sx={{ mx: "auto", textAlign: "center" }}>
                  <RoomServiceIcon
                    sx={{ fontSize: { lg: "70px", md: "40px", sm: "40px" } }}
                    style={{ color: "#111D4D" }}
                  />
                </Box>
                <Box
                  sx={{
                    mt: "5px",
                    mb: "5px",

                    mx: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      mt: "-2px",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {t("step-card3-title")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {t("step-card3-subtitle")}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}
      </Swiper>
    </Container>
  );
};

export default ServiceSection3;
