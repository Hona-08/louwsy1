import { m } from 'framer-motion';
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import {
  Button,
  Box,
  Link,
  Container,
  Typography,
  Stack,
  StackProps,
  InputAdornment,
} from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_ONBOARDING } from '../../routes/paths';
// components
import useResponsive from '../../hooks/useResponsive';
import Iconify from '../../components/Iconify';
import TextIconLabel from '../../components/TextIconLabel';
import { MotionContainer, varFade } from '../../components/animate';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputStyle from 'src/components/InputStyle';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#f5f5f5',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props: StackProps) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('lg')]: {
      margin: 'unset',
      textAlign: 'left',
    },
  })
);

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',

  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },

  [theme.breakpoints.up('lg')]: {
    // right: '8%',
    // width: 'auto',
    // height: '58vh',
    right: '8%',
    width: '700px',
    height: '55vh',
  },

  [theme.breakpoints.up('xl')]: {
    right: '8%',
    width: 'auto',
    height: '58vh',
  },

  // [theme.breakpoints.down('lg')]: {
  //   display: 'none',
  // },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const isDesktop = useResponsive('up', 'lg');
  return (
    <MotionContainer>
      <RootStyle>
        <HeroImgStyle alt="hero" src="assets/hero-product.png" variants={varFade().inUp} />

        <Container>
          <ContentStyle>
            {/* <Button variant="outlined" endIcon={<ArrowForwardIcon />}>Lowisy Editions, Summer 22 is here | Discover 100+ new features </Button> */}

            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ color: 'text.primary' }}>
                A worry free entry into
                <Typography component="span" variant="h2" sx={{ color: 'primary.main' }}>
                  &nbsp;Ecommerce
                </Typography>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: 'text.secondary' }}>
                Lowisy. Your user-friendly and legally compliant web shop. <br />
                Get started now and test 14 days free of charge.
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              {isDesktop ? (
                // <InputStyle
                //   placeholder="Enter your email"
                //   InputProps={{
                //     endAdornment: (
                //       <InputAdornment position="end">
                //         <Button variant="contained" size="large">
                //           Start Free Trial
                //         </Button>
                //       </InputAdornment>
                //     ),
                //   }}
                //   sx={{ my: 3, '& .MuiOutlinedInput-root': { pr: 0.5 }, width: '80%' }}
                // />
                // <Box textAlign="center">
                <Button
                  size="large"
                  variant="contained"
                  target="_blank"
                  rel="noopener"
                  href={PATH_ONBOARDING.root}
                >
                  Start free trial
                </Button>
              ) : (
                // </Box>
                <Button
                  size="large"
                  variant="contained"
                  target="_blank"
                  rel="noopener"
                  href={PATH_ONBOARDING.root}
                  sx={{ p: 1.5 }}
                >
                  Start free trial
                </Button>
              )}
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: 'text.secondary' }} variant="caption">
                Try Lowisy free for 14 days, no credit card required.
                <br /> By entering your email, you agree to receive marketing emails from Lowisy.
              </Typography>
            </m.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </MotionContainer>
  );
}
