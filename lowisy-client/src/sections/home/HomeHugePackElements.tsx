import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography, InputAdornment } from '@mui/material';
// components
import useResponsive from '../../hooks/useResponsive';
import { MotionViewport, varFade } from '../../components/animate';
import InputStyle from 'src/components/InputStyle';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import { PATH_ONBOARDING } from 'src/routes/paths';
import { Image } from 'src/components/lazy-loading';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));

const ScreenStyle = styled(m.div)(({ theme }) => ({
  paddingRight: 2,
  paddingBottom: 1,
  maxWidth: 160,
  borderRadius: 8,
  // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
  backgroundColor: 'white',
  [theme.breakpoints.up('sm')]: {
    maxWidth: 320,
    paddingRight: 4,
    borderRadius: 12,
  },
  '& img': {
    borderRadius: 8,
    [theme.breakpoints.up('sm')]: {
      borderRadius: 12,
    },
  },
}));

const COMMON = {
  scaleX: 0.86,
  skewY: 8,
  skewX: 0,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  opacity: 0,
};

const variantScreenLeft = {
  initial: COMMON,
  animate: { ...COMMON, translateX: '-50%', translateY: 40, opacity: 1 },
};

const variantScreenCenter = {
  initial: COMMON,
  animate: { ...COMMON, opacity: 1 },
};

const variantScreenRight = {
  initial: COMMON,
  animate: { ...COMMON, translateX: '50%', translateY: -40, opacity: 1 },
};

// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const isDesktop = useResponsive('up', 'lg');

  const isRTL = theme.direction === 'rtl';

  const screenLeftAnimate = variantScreenLeft;

  const screenCenterAnimate = variantScreenCenter;

  const screenRightAnimate = variantScreenRight;

  return (
    <>
      <MotionViewport disableAnimatedMobile={false}>
        <RootStyle>
          <Container sx={{ backgroundColor: 'white' }}>
            <Grid container spacing={5} rowSpacing={{ xs: 3 }} justifyContent="center">
              <Grid item xs={12} md={6} dir="rtl" sx={{ p: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'center',
                  }}
                >
                  <Image disabledEffect src={`./assets/mobile-hand.png`} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <ContentStyle>
                  {/* <m.div variants={varFade().inUp}>
                  <Typography
                    component="div"
                    variant="overline"
                    sx={{ mb: 2, color: 'text.disabled' }}
                  >
                    Interface Starter Kit
                  </Typography>
                </m.div> */}

                  <m.div variants={varFade().inUp}>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                      Why using Lowisy?
                    </Typography>
                  </m.div>

                  <m.div variants={varFade().inUp}>
                    <Typography
                      sx={{
                        mb: { xs: -5, md: 5 },
                        color: isLight ? 'text.secondary' : 'common.white',
                      }}
                    >
                      Ecommerce has never been easier, perfect for newcomers!
                    </Typography>
                  </m.div>

                  {/* <m.div variants={varFade().inUp}>
                  <Button
                    size="large"
                    color="inherit"
                    variant="outlined"
                    target="_blank"
                    rel="noopener"
                    href="https://www.lowisy.com/components/"
                  >
                    View All Components
                  </Button>
                </m.div> */}
                </ContentStyle>
              </Grid>
            </Grid>
          </Container>
        </RootStyle>
      </MotionViewport>

      <MotionViewport disableAnimatedMobile={false}>
        <RootStyle>
          <Container
            sx={{
              backgroundColor: 'white',
              p: 0,
              '@media (min-width: 600px)': {
                p: 0,
              },

              mb: {
                xs: -5,
              },
            }}
          >
            <Grid container spacing={5} justifyContent="center">
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#111d4d',
                  pl: '40px',
                }}
              >
                <ContentStyle>
                  {/* <m.div variants={varFade().inUp}>
                  <Typography
                    component="div"
                    variant="overline"
                    sx={{ mb: 2, color: 'text.disabled' }}
                  >
                    Interface Starter Kit
                  </Typography>
                </m.div> */}

                  <m.div variants={varFade().inUp}>
                    <Typography
                      variant="h4"
                      sx={{ mb: 3, mt: { xs: 5, md: -5 }, color: 'common.white' }}
                    >
                      Why using Lowisy?
                    </Typography>
                  </m.div>

                  <m.div variants={varFade().inUp}>
                    <Typography
                      sx={{
                        mb: 5,
                        color: 'common.white',
                      }}
                    >
                      GDPR Compliance saves your business.
                    </Typography>
                  </m.div>

                  {/* <m.div variants={varFade().inUp}>
                  <Button
                    size="large"
                    color="inherit"
                    variant="outlined"
                    target="_blank"
                    rel="noopener"
                    href="https://www.lowisy.com/components/"
                  >
                    View All Components
                  </Button>
                </m.div> */}
                </ContentStyle>
              </Grid>
              <Grid item xs={12} md={6} dir="rtl" sx={{ p: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'center',
                  }}
                >
                  <Image disabledEffect src={`./assets/gdpr.png`} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </RootStyle>
      </MotionViewport>

      <MotionViewport disableAnimatedMobile={false}>
        <RootStyle>
          <Container sx={{ backgroundColor: 'white' }}>
            <Grid container spacing={5} justifyContent="center" sx={{ mt: { xs: -10 } }}>
              <Grid item xs={12} md={6} dir="rtl" sx={{ p: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'center',
                  }}
                >
                  <Image disabledEffect src={`./assets/lowisy-app.png`} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <ContentStyle>
                  {/* <m.div variants={varFade().inUp}>
                  <Typography
                    component="div"
                    variant="overline"
                    sx={{ mb: 2, color: 'text.disabled' }}
                  >
                    Interface Starter Kit
                  </Typography>
                </m.div> */}

                  <m.div variants={varFade().inUp}>
                    <Typography variant="h4" sx={{ mb: 3, mt: { xs: 3 } }}>
                      Why using Lowisy?
                    </Typography>
                  </m.div>

                  <m.div variants={varFade().inUp}>
                    <Typography
                      sx={{
                        mb: { xs: -9, md: 5 },
                        color: isLight ? 'text.secondary' : 'common.white',
                      }}
                    >
                      Share your business, stories and products in your preferred social networks.
                    </Typography>
                  </m.div>

                  {/* <m.div variants={varFade().inUp}>
                  <Button
                    size="large"
                    color="inherit"
                    variant="outlined"
                    target="_blank"
                    rel="noopener"
                    href="https://www.lowisy.com/components/"
                  >
                    View All Components
                  </Button>
                </m.div> */}
                </ContentStyle>
              </Grid>
            </Grid>
          </Container>
        </RootStyle>
      </MotionViewport>
      <MotionViewport disableAnimatedMobile={false}>
        <RootStyle>
          <Container
            sx={{
              backgroundColor: 'white',
              p: 0,
              '@media (min-width: 600px)': {
                p: 0,
              },

              mb: {
                xs: -5,
              },
            }}
          >
            <Grid container spacing={0} justifyContent="center">
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#111d4d',
                  pl: '40px',
                }}
              >
                <ContentStyle>
                  {/* <m.div variants={varFade().inUp}>
                  <Typography
                    component="div"
                    variant="overline"
                    sx={{ mb: 2, color: 'text.disabled' }}
                  >
                    Interface Starter Kit
                  </Typography>
                </m.div> */}

                  <m.div variants={varFade().inUp}>
                    <Typography
                      variant="h4"
                      sx={{ mt: { xs: 10, md: 5 }, mb: 3, mr: { xs: 4 }, color: 'common.white' }}
                    >
                      Why using Lowisy?
                    </Typography>
                  </m.div>

                  <m.div variants={varFade().inUp}>
                    <Typography
                      sx={{
                        mb: 5,
                        color: 'common.white',
                        mr: { xs: 4 },
                      }}
                    >
                      GDPR Compliance saves your business.
                    </Typography>
                    <Button
                      sx={{ mr: { sm: 5, xs: 5 } }}
                      size="large"
                      variant="contained"
                      target="_blank"
                      rel="noopener"
                      href={PATH_ONBOARDING.root}
                    >
                      Start free trial
                    </Button>
                    )
                  </m.div>

                  {/* <m.div variants={varFade().inUp}>
                  <Button
                    size="large"
                    color="inherit"
                    variant="outlined"
                    target="_blank"
                    rel="noopener"
                    href="https://www.lowisy.com/components/"
                  >
                    View All Components
                  </Button>
                </m.div> */}
                </ContentStyle>
              </Grid>
              <Grid item xs={12} md={6} dir="rtl" sx={{ p: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'center',
                  }}
                >
                  <Image disabledEffect src={`./assets/iphone-hand.png`} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </RootStyle>
      </MotionViewport>
      <MotionViewport disableAnimatedMobile={false}>
        <RootStyle>
          <Container
            sx={{
              backgroundColor: 'white',
              p: 0,
              '@media (min-width: 600px)': {
                p: 0,
              },
              mt: { xs: 0 },
            }}
          >
            <Grid container spacing={0} justifyContent="center">
              <Grid item xs={12} md={6} dir="rtl" sx={{ p: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'center',
                  }}
                >
                  <Image disabledEffect src={`./assets/girl-makeup.png`} />
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#111d4d',
                  pl: '40px',
                }}
              >
                <ContentStyle>
                  {/* <m.div variants={varFade().inUp}>
                  <Typography
                    component="div"
                    variant="overline"
                    sx={{ mb: 2, color: 'text.disabled' }}
                  >
                    Interface Starter Kit
                  </Typography>
                </m.div> */}

                  <m.div variants={varFade().inUp}>
                    <Typography
                      variant="h4"
                      sx={{
                        mb: 3,
                        mt: { xs: 9 },
                        mr: { xs: 3.5 },
                        color: 'common.white',
                        textAlign: 'center',
                      }}
                    >
                      Success Story- Vanesha?
                    </Typography>
                  </m.div>

                  <m.div variants={varFade().inUp}>
                    <Typography
                      sx={{
                        mb: 5,
                        color: 'common.white',
                        textAlign: 'center',
                        mr: { xs: 3 },
                        p: { xs: 1 },
                      }}
                    >
                      "Lowisy offers everything I need!".
                      <h6>Vaneesa, Coiffeur</h6>
                      <h6>Vaneesa's Shop</h6>
                    </Typography>
                  </m.div>

                  {/* <m.div variants={varFade().inUp}>
                  <Button
                    size="large"
                    color="inherit"
                    variant="outlined"
                    target="_blank"
                    rel="noopener"
                    href="https://www.lowisy.com/components/"
                  >
                    View All Components
                  </Button>
                </m.div> */}
                </ContentStyle>
              </Grid>
            </Grid>
          </Container>
        </RootStyle>
      </MotionViewport>
      <Box>
        <Typography sx={{ mb: 1, textAlign: 'center' }} variant="h4">
          Why Lowisy?
        </Typography>
        <Typography
          sx={{ mb: { md: 1, xs: 2 }, textAlign: 'center', color: 'text.disabled' }}
          variant="subtitle2"
        >
          The easy to use e-commerce solution for your buisiness
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>
          <Button
            size="large"
            variant="contained"
            target="_blank"
            rel="noopener"
            href={PATH_ONBOARDING.root}
          >
            Start free trial
          </Button>
        </Typography>
        <MotionViewport disableAnimatedMobile={false}>
          <RootStyle>
            <Container
              sx={{
                backgroundColor: 'white',
                p: 0,
                '@media (min-width: 600px)': {
                  p: 0,
                },
              }}
            >
              <Grid container spacing={0} justifyContent="center">
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#111d4d',
                    pl: '40px',
                  }}
                >
                  <ContentStyle>
                    <m.div variants={varFade().inUp}>
                      <Typography
                        variant="h4"
                        sx={{
                          mb: 3,
                          color: 'common.white',
                          textAlign: 'center',
                          mt: { xs: 9 },
                          mr: { xs: 4 },
                        }}
                      >
                        Step By Step Together
                      </Typography>
                    </m.div>

                    <m.div variants={varFade().inUp}>
                      <Typography
                        sx={{
                          mb: 5,
                          color: 'common.white',
                          textAlign: 'center',
                          mr: { xs: 4 },
                        }}
                      >
                        We are glad to help.Find FAQ,support articles,tutorials and contact
                        information in our Help Center
                      </Typography>
                    </m.div>
                  </ContentStyle>
                </Grid>
                <Grid item xs={12} md={6} dir="rtl" sx={{ p: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      justifyContent: 'center',
                    }}
                  >
                    <Image disabledEffect src={`./assets/secretary.png`} />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </RootStyle>
        </MotionViewport>
        <MotionViewport disableAnimatedMobile={false}>
          <RootStyle>
            <Container
              sx={{
                backgroundColor: 'white',
                p: 0,
                '@media (min-width: 600px)': {
                  p: 0,
                },
                mt: { xs: -10 },
              }}
            >
              <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} md={6} dir="rtl" sx={{ p: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      justifyContent: 'center',
                    }}
                  >
                    <Image disabledEffect src={`./assets/apples.png`} />
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#111d4d',
                    pl: '40px',
                  }}
                >
                  <ContentStyle>
                    <m.div variants={varFade().inUp}>
                      <Typography
                        variant="h4"
                        sx={{
                          mb: 3,
                          color: 'common.white',
                          textAlign: 'center',
                          mt: { xs: 9 },
                          mr: { xs: 4.5 },
                        }}
                      >
                        We digitize the weekly markets of the farmers in your region
                      </Typography>
                    </m.div>

                    <m.div variants={varFade().inUp}>
                      <Typography
                        sx={{
                          mb: 5,
                          color: 'common.white',
                          textAlign: 'center',
                          mr: { xs: 5 },
                        }}
                      >
                        Find farmer's products near you. Click and Collect-Direct Delivery -
                        Shipping-Many more filters.Soon in your region.
                      </Typography>
                    </m.div>
                  </ContentStyle>
                </Grid>
              </Grid>
            </Container>
          </RootStyle>
        </MotionViewport>
      </Box>
    </>
  );
}
