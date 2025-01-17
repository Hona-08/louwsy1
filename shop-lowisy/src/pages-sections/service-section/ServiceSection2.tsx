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
import { H1, H2, H3, H4, Span } from "components/Typography";
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
import { useTranslation } from "react-i18next";
import EuroIcon from "@mui/icons-material/Euro";

// styled components
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  flexWrap: "wrap",
  padding: "1.5rem",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: theme.shadows[2],
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    padding: "1rem 0.5rem",
    flexDirection: "column",
  },
}));

// =============================================================
type Props = {
  id?: string;
  services: any[];
};
// ===================================================

const ServiceSection2: FC = () => {
  const { t } = useTranslation("common");
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  SwiperCore.use([Autoplay]);
  return (
    <Container
      sx={{ pt: '25px', pb: 8, width: "100%", background: "#FEFEEE" }}
      maxWidth={false}
    >
      <Box sx={{ textAlign: "center" }}>
        <H4
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
          {t('Why-lowisy')}
        </H4>

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
          {t("food-in-your-region")}
        </Typography>

        {/* <Typography
          sx={{
            maxWidth: 600,
            mx: "auto",
            textAlign: "center",
            fontSize: "20px",
            color: "#9BA7B3",
            mb: "50px",
          }}
          variant="subtitle1"
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
          <Grid container spacing={3}>
            <SwiperSlide>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Card
                  sx={{
                    padding: "20px",
                    width: { xs: "295px" },
                    height: { xs: "300px" },
                    display: "flex-col",
                    alignItems: "center",
                    mx: "auto",
                  }}
                >
                  <Box sx={{ mx: "auto", textAlign: "center", mt: "10px" }}>
                    <FavoriteBorderIcon
                      sx={{ fontSize: "70px" }}
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
                        ml: "15px",
                      }}
                    >
                      {t("card1-title")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      mt: "10px",

                      mx: "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        textAlign: "center",
                        ml: "25px",
                      }}
                    >
                      {t("card1-subtitle")}
                    </Typography>
                  </Box>
                  {/* <Box
                    sx={{
                      textAlign: "center",
                      mx: "auto",
                      mt: "30px",
                    }}
                  >
                    <Button
                      style={{
                        borderRadius: 5,
                        backgroundColor: "#E67A00",
                        color: "white",
                        fontSize: "12px",
                        marginBottom: "10px",
                        padding: "10px 25px",
                        marginLeft: "25px",
                      }}
                      variant="contained"
                    >
                      Read More
                    </Button>
                  </Box> */}
                </Card>
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Card
                  sx={{
                    padding: "30px",
                    width: { xs: "295px" },
                    height: { xs: "300px" },
                    display: "flex-col",
                    alignItems: "center",
                    mx: "auto",
                  }}
                >
                  <Box sx={{ mx: "auto", textAlign: "center", mt: "10px" }}>
                    <SavingsIcon
                      sx={{ fontSize: "70px" }}
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
                        ml: "15px",
                      }}
                    >
                      {t("card2-title")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      mt: "10px",

                      mx: "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        textAlign: "center",
                        ml: "25px",
                      }}
                    >
                      {t("card2-subtitle")}
                    </Typography>
                  </Box>
                  {/* <Box
                    sx={{
                      textAlign: "center",
                      mx: "auto",
                      mt: "30px",
                    }}
                  >
                    <Button
                      style={{
                        borderRadius: 5,
                        backgroundColor: "#E67A00",
                        color: "white",
                        fontSize: "12px",
                        marginBottom: "10px",
                        padding: "10px 25px",
                        marginLeft: "25px",
                      }}
                      variant="contained"
                      sx={{ mx: "auto" }}
                    >
                      Read More
                    </Button>
                  </Box> */}
                </Card>
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Card
                  sx={{
                    padding: "30px",
                    width: { xs: "295px" },
                    height: { xs: "300px" },
                    display: "flex-col",
                    alignItems: "center",
                    mx: "auto",
                  }}
                >
                  <Box sx={{ mx: "auto", textAlign: "center", mt: "10px" }}>
                    <AccessAlarmsIcon
                      sx={{ fontSize: "70px" }}
                      style={{ color: "#111D4D" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: "5px",
                      mb: "5px",
                      textAlign: "center",
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
                      {t("card3-title")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      mt: "10px",

                      mx: "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        textAlign: "center",
                      }}
                    >
                      {t("card3-subtitle")}
                    </Typography>
                  </Box>
                  {/* <Box
                    sx={{
                      textAlign: "center",
                      mx: "auto",
                      mt: "30px",
                    }}
                  >
                    <Button
                      style={{
                        borderRadius: 5,
                        backgroundColor: "#E67A00",
                        color: "white",
                        fontSize: "12px",
                        marginBottom: "10px",
                        padding: "10px 25px",
                        marginLeft: "25px",
                      }}
                      variant="contained"
                      sx={{ mx: "auto" }}
                    >
                      Read More
                    </Button>
                  </Box> */}
                </Card>
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Card
                  sx={{
                    padding: "30px",
                    width: { xs: "295px" },
                    height: { xs: "300px" },
                    display: "flex-col",
                    alignItems: "center",
                    mx: "auto",
                  }}
                >
                  <Box sx={{ mx: "auto", textAlign: "center", mt: "10px" }}>
                    <EuroIcon
                      sx={{ fontSize: "70px" }}
                      style={{ color: "#111D4D" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: "5px",
                      mb: "5px",
                      textAlign: "center",
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
                      {t("card4-title")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      mt: "10px",

                      mx: "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        textAlign: "center",
                      }}
                    >
                      {t("card4-subtitle")}
                    </Typography>
                  </Box>
                  {/* <Box
                    sx={{
                      textAlign: "center",
                      mx: "auto",
                      mt: "30px",
                    }}
                  >
                    <Button
                      style={{
                        borderRadius: 5,
                        backgroundColor: "#E67A00",
                        color: "white",
                        fontSize: "12px",
                        marginBottom: "10px",
                        padding: "10px 25px",
                        marginLeft: "25px",
                      }}
                      variant="contained"
                      sx={{ mx: "auto" }}
                    >
                      Read More
                    </Button>
                  </Box> */}
                </Card>
              </Grid>
            </SwiperSlide>
          </Grid>
        ) : (
          <Grid
            container
            rowSpacing={{ sm: 2, md: 5 }}
            columnSpacing={{ lg: 2, md: 0, sm: 0 }}
            sx={{
              // maxWidth: { md: "69%", lg: "100%" },
              mx: { md: "auto", sm: "auto" },
              maxWidth: { lg: "1280px", md: "1280px", sm: "600px" },
            }}
          >
            <Grid item md={3} sm={6} lg={3} xl={3}>
              <Card
                sx={{
                  padding: { lg: "20px", md: "5px" },
                  width: { md: "210px", sm: "250px", lg: "280px" },
                  height: { md: "210px", sm: "210px", lg: "280px" },
                  display: "flex-col",
                  alignItems: "center",
                  mx: "auto",
                }}
              >
                <Box sx={{ mx: "auto", textAlign: "center", mt: "20px" }}>
                  <FavoriteBorderIcon
                    sx={{ fontSize: { lg: "70px", md: "55px", sm: "40px" } }}
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
                      fontSize: { lg: "1.2rem", md: "1rem", sm: "1rem" },
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {t("card1-title")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: "10px",

                    mx: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { lg: "1.1rem", md: "0.9rem", sm: "0.9rem" },
                      textAlign: "center",
                    }}
                  >
                    {t("card1-subtitle")}
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={3} sm={6} lg={3} xl={3}>
              <Card
                sx={{
                  padding: { lg: "20px", md: "5px" },
                  width: { md: "210px", sm: "250px", lg: "280px" },
                  height: { md: "210px", sm: "210px", lg: "280px" },
                  display: "flex-col",
                  alignItems: "center",
                  mx: "auto",
                }}
              >
                <Box sx={{ mx: "auto", textAlign: "center", mt: "20px" }}>
                  <SavingsIcon
                    sx={{ fontSize: { lg: "70px", md: "55px", sm: "40px" } }}
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
                      fontSize: { lg: "1.2rem", md: "1rem", sm: "1rem" },
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {t("card2-title")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: "10px",

                    mx: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { lg: "1.1rem", md: "0.9rem", sm: "0.9rem" },
                      textAlign: "center",
                    }}
                  >
                    {t("card2-subtitle")}
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={3} sm={6} lg={3} xl={3}>
              <Card
                sx={{
                  padding: { lg: "20px", md: "5px" },
                  width: { md: "210px", sm: "250px", lg: "280px" },
                  height: { md: "210px", sm: "210px", lg: "280px" },
                  display: "flex-col",
                  alignItems: "center",
                  mx: "auto",
                }}
              >
                <Box sx={{ mx: "auto", textAlign: "center", mt: "20px" }}>
                  <AccessAlarmsIcon
                    sx={{ fontSize: { lg: "70px", md: "55px", sm: "40px" } }}
                    style={{ color: "#111D4D" }}
                  />
                </Box>
                <Box
                  sx={{
                    mt: "5px",
                    mb: "5px",
                    textAlign: "center",
                    mx: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { lg: "1.2rem", md: "1rem", sm: "1rem" },
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {t("card3-title")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: "10px",

                    mx: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { lg: "1.1rem", md: "0.9rem", sm: "0.9rem" },
                      textAlign: "center",
                    }}
                  >
                    {t("card3-subtitle")}
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={3} sm={6} lg={3} xl={3}>
              <Card
                sx={{
                  padding: { lg: "20px", md: "5px" },
                  width: { md: "210px", sm: "250px", lg: "280px" },
                  height: { md: "210px", sm: "210px", lg: "280px" },
                  display: "flex-col",
                  alignItems: "center",
                  mx: "auto",
                }}
              >
                <Box sx={{ mx: "auto", textAlign: "center", mt: "20px" }}>
                  <EuroIcon
                    sx={{ fontSize: { lg: "70px", md: "55px", sm: "40px" } }}
                    style={{ color: "#111D4D" }}
                  />
                </Box>
                <Box
                  sx={{
                    mt: "5px",
                    mb: "5px",
                    textAlign: "center",
                    mx: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { lg: "1.2rem", md: "1rem", sm: "1rem" },
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {t("card4-title")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: "10px",

                    mx: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { lg: "1.1rem", md: "0.9rem", sm: "0.9rem" },
                      textAlign: "center",
                    }}
                  >
                    {t("card4-subtitle")}
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

export default ServiceSection2;
