// @mui
import { styled } from '@mui/material/styles';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { Swiper, SwiperSlide } from 'swiper/react';
import useMediaQuery from '@mui/material/useMediaQuery';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import Masonry from '@mui/lab/Masonry';
import {
  //HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeLookingFor,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  //HomeHugePackElements,
  //HomeHero,
} from '../sections/home';
import { Box, Container, Grid, ImageList, ImageListItem, Typography, Theme } from '@mui/material';
import { borders } from '@mui/system';
import { useTheme } from '@emotion/react';
import breakpoints from 'src/theme/breakpoints';
import { HomeHero, HomeHugePackElements, MainFooter } from 'src/components/lazy-loading';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
];

export default function HomePage() {
  const matches = useMediaQuery('(min-width:700px)');
  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <Page title="Lowisy | Local Economy First">
      <HomeHero />

      {/* <ContentStyle>
        <Box sx={{ backgroundColor: '#111D4D', padding: 5 }}>
          <Container sx={{ mt: 5 }}>
            <Typography
              sx={{
                color: 'common.white',
                mb: { xs: 2, sm: 2, md: 2, lg: 2 },
                mt: { xs: 2, sm: 2, md: 2, lg: 2 },
                ml: { xs: 1, sm: 2, md: 0 },
                mx: { sm: 'auto' },

                width: { md: '550px', sm: '300px' },

                fontSize: { xs: '18px', md: '32px', sm: '25px' },
                textAlign: { sm: 'center', md: 'left' },
              }}
              variant="h3"
            >
              Our service for your business
            </Typography>
            <Typography
              sx={{
                color: 'common.white',
                mb: { xs: 1, sm: 2, md: 2, lg: 2 },
                ml: { xs: 1, sm: 2, md: 0 },
                fontSize: { xs: '12px', md: '17px', sm: '17px' },
                textAlign: { sm: 'center', md: 'left' },
              }}
              variant="subtitle1"
            >
              Your Webshop online in just 10 steps
            </Typography>
            <Typography
              sx={{
                color: 'common.white',
                mb: { xs: 2, sm: 8, md: 2, lg: 2 },
                ml: { xs: 1, sm: 2, md: 0 },
                textAlign: { sm: 'center', md: 'left' },
                fontSize: { xs: '12px', md: '15px', sm: '17px' },
              }}
            >
              Find shops and products near you
            </Typography>
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <ImageList
                sx={{
                  width: '100%',
                  height: '100%',

                  mt: 5,
                }}
                cols={matches ? 5 : 2}
                gap={10}
              >
                {itemData.map((item) => (
                  <>
                    {downLg ? (
                      <SwiperSlide>
                        <ImageListItem key={item.img} sx={{ width: '250px', margin: 'auto' }}>
                          <img
                            src={`${item.img}?w=250&h=400&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=250&h=400&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                          />
                          <Typography sx={{ color: 'common.white', mt: 2 }} variant="h6">
                            FASHION SHOP
                          </Typography>
                          <Typography
                            sx={{
                              color: 'common.white',
                              mt: 1,
                              mb: 4,
                              fontSize: { xs: '13px', fontFamily: 'sans-serif' },
                            }}
                            variant="subtitle1"
                          >
                            Lorem impusm
                          </Typography>
                        </ImageListItem>
                      </SwiperSlide>
                    ) : (
                      <ImageListItem key={item.img}>
                        <img
                          src={`${item.img}?w=250&h=400&fit=crop&auto=format`}
                          srcSet={`${item.img}?w=250&h=400&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
                          loading="lazy"
                        />
                        <Typography sx={{ color: 'common.white', mt: 2 }} variant="h6">
                          FASHION SHOP
                        </Typography>
                        <Typography
                          sx={{ color: 'common.white', mt: 1, mb: 1 }}
                          variant="subtitle1"
                        >
                          Lorem impusm
                        </Typography>
                      </ImageListItem>
                    )}
                  </>
                ))}
              </ImageList>
            </Swiper>

            <Typography
              variant="h2"
              sx={{
                color: 'common.white',

                my: { md: 25, sm: 5 },
                mt: { sm: 10, xs: 10 },
                mb: { md: 18, sm: 8, xs: 5 },
                textAlign: { lg: 'center', sm: 'center', md: 'center', xs: 'center' },
                ml: { xs: 1 },
                fontSize: { md: '10px', lg: '55px', xs: '20px', sm: '25px' },
              }}
            >
              Take the best part forward
            </Typography>
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <Grid
                container
                spacing={6}
                sx={{
                  fontSize: '70px',
                  color: 'white',
                  mb: { md: 5 },

                  height: { md: '500px' },
                  width: '100%',
                }}
              >
                {downLg ? (
                  <>
                    <SwiperSlide>
                      <Grid
                        item
                        xs={6}
                        md={2.4}
                        width={350}
                        sx={{ mx: 'auto', height: '320px', width: { sm: '350px' } }}
                        textAlign="center"
                      >
                        <CleanHandsIcon sx={{ color: 'white', fontSize: '100px' }} />
                        <Typography
                          sx={{
                            color: 'common.white',
                            mb: 2,
                            mt: 3,
                            fontSize: { xs: '16px', sm: '22px' },
                          }}
                          variant="h6"
                        >
                          Onboarding Service
                        </Typography>
                        <Typography
                          sx={{
                            color: 'common.white',

                            mb: { xs: 1 },
                            fontSize: { xs: '15px' },
                            margin: 3,
                          }}
                          variant="subtitle1"
                        >
                          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                          eirmod tempor invidunt ut
                        </Typography>
                      </Grid>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Grid
                        item
                        xs={6}
                        md={2.4}
                        width={250}
                        sx={{ mx: 'auto', height: '300px', width: { sm: '350px' } }}
                        textAlign="center"
                      >
                        <SettingsSuggestIcon sx={{ color: 'white', fontSize: '100px' }} />
                        <Typography
                          sx={{
                            color: 'common.white',
                            mb: 2,
                            mt: 3,
                            fontSize: { xs: '16px', sm: '22px' },
                          }}
                          variant="h6"
                        >
                          Social Media Service
                        </Typography>
                        <Typography
                          sx={{
                            color: 'common.white',
                            mb: 1,
                            fontSize: { xs: '15px' },
                            margin: 3,
                          }}
                          variant="subtitle1"
                        >
                          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                          eirmod tempor invidunt ut
                        </Typography>
                      </Grid>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Grid
                        item
                        xs={6}
                        md={2.4}
                        width={250}
                        sx={{ mx: 'auto', height: '300px', width: { sm: '350px' } }}
                        textAlign="center"
                      >
                        <DashboardCustomizeIcon sx={{ color: 'white', fontSize: '100px' }} />
                        <Typography
                          sx={{
                            color: 'common.white',
                            mb: 2,
                            mt: 3,
                            fontSize: { xs: '16px', sm: '22px' },
                          }}
                          variant="h6"
                        >
                          Custome Interfaces
                        </Typography>
                        <Typography
                          sx={{
                            color: 'common.white',
                            mb: 1,
                            fontSize: { xs: '15px' },
                            margin: 3,
                          }}
                          variant="subtitle1"
                        >
                          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                          eirmod tempor invidunt ut
                        </Typography>
                      </Grid>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Grid
                        item
                        xs={6}
                        md={2.4}
                        width={250}
                        sx={{ mx: 'auto', height: '300px', width: { sm: '350px' } }}
                        textAlign="center"
                      >
                        <BackupTableIcon sx={{ color: 'white', fontSize: '100px' }} />
                        <Typography
                          sx={{
                            color: 'common.white',
                            mb: 2,
                            mt: 3,
                            fontSize: { xs: '16px', sm: '22px' },
                          }}
                          variant="h6"
                        >
                          Custome Templates
                        </Typography>
                        <Typography
                          sx={{
                            color: 'common.white',
                            mb: 1,
                            fontSize: { xs: '15px' },
                            margin: 3,
                          }}
                          variant="subtitle1"
                        >
                          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                          eirmod tempor invidunt ut
                        </Typography>
                      </Grid>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Grid
                        item
                        xs={6}
                        md={2.4}
                        width={250}
                        sx={{ mx: 'auto', height: '300px', width: { sm: '350px' } }}
                        textAlign="center"
                      >
                        <HandshakeIcon sx={{ color: 'white', fontSize: '100px' }} />
                        <Typography
                          sx={{
                            color: 'common.white',
                            mb: 2,
                            mt: 3,
                            fontSize: { xs: '16px', sm: '22px' },
                          }}
                          variant="h6"
                        >
                          Partnership
                        </Typography>
                        <Typography
                          sx={{
                            color: 'common.white',
                            mb: 1,
                            fontSize: { xs: '15px' },
                            margin: 3,
                          }}
                          variant="subtitle1"
                        >
                          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                          eirmod tempor invidunt ut
                        </Typography>
                      </Grid>
                    </SwiperSlide>
                  </>
                ) : (
                  <>
                    <Grid item xs={6} md={2.4}>
                      <CleanHandsIcon fontSize="inherit" color="inherit" />
                      <Typography sx={{ color: 'common.white', mb: 2 }} variant="h6">
                        Onboarding Service
                      </Typography>
                      <Typography sx={{ color: 'common.white', mb: 1 }} variant="subtitle1">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut
                      </Typography>
                    </Grid>

                    <Grid item xs={6} md={2.4}>
                      <SettingsSuggestIcon fontSize="inherit" color="inherit" />
                      <Typography sx={{ color: 'common.white', mb: 2 }} variant="h6">
                        Social Media Service
                      </Typography>
                      <Typography sx={{ color: 'common.white', mb: 1 }} variant="subtitle1">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                      <DashboardCustomizeIcon fontSize="inherit" color="inherit" />
                      <Typography sx={{ color: 'common.white', mb: 2 }} variant="h6">
                        Custome Interfaces
                      </Typography>
                      <Typography sx={{ color: 'common.white', mb: 1 }} variant="subtitle1">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                      <BackupTableIcon fontSize="inherit" color="inherit" />
                      <Typography sx={{ color: 'common.white', mb: 2 }} variant="h6">
                        Custome Templates
                      </Typography>
                      <Typography sx={{ color: 'common.white', mb: 1 }} variant="subtitle1">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                      <HandshakeIcon fontSize="inherit" color="inherit" />
                      <Typography sx={{ color: 'common.white', mb: 2 }} variant="h6">
                        Partnership
                      </Typography>
                      <Typography sx={{ color: 'common.white', mb: 1 }} variant="subtitle1">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Swiper>
          </Container>
        </Box>
        <Box sx={{ p: 10, pb: 0 }}>
          <Typography sx={{ mb: 1, textAlign: 'center' }} variant="h3">
            Why Lowisy?
          </Typography>
          <Typography
            sx={{ mb: 1, textAlign: 'center', color: 'text.disabled' }}
            variant="subtitle1"
          >
            The easy to use e-commerce solution for your buisiness
          </Typography>
        </Box>

        <HomeHugePackElements />
        <MainFooter />
      </ContentStyle> */}
    </Page>
  );
}
