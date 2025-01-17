// next
import { useRouter } from 'next/router';
// @mui
import NextLink from 'next/link';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Link, Tooltip } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
//
import MenuDesktop, { LinkStyle } from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import { PATH_ONBOARDING } from 'src/routes/paths';
import Iconify from '../../components/Iconify';
import LanguagePopover from '../dashboard/header/LanguagePopover';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};
const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

const mobileNavConfig = [...navConfig];

!mobileNavConfig.includes(
  {
    title: 'Login',
    path: '/auth/login',
    icon: <Iconify icon={'clarity:login-solid'} {...ICON_SIZE} />,
  } && {
    title: 'Support',
    path: '',
    icon: <Iconify icon={'ic:sharp-support-agent'} {...ICON_SIZE} />,
  }
)
  ? mobileNavConfig.push(
      {
        title: 'Support',
        path: '',
        icon: <Iconify icon={'ic:sharp-support-agent'} {...ICON_SIZE} />,
      },
      {
        title: 'Login',
        path: '/auth/login',
        icon: <Iconify icon={'clarity:login-solid'} {...ICON_SIZE} />,
      }
    )
  : null;

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useRouter();

  const isDesktop = useResponsive('up', 'lg');

  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'rgb(245,245,245,0.9)' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Logo sx={{ mr: 5, mb: 2 }} />

          {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
          <Tooltip title="Language">
            <Box sx={{ flexGrow: 1 }}>
              <LanguagePopover />
            </Box>
          </Tooltip>

          <LinkStyle
            onClick={() => {}}
            sx={{
              display: { xs: 'none', md: 'flex' },
              cursor: 'pointer',
              alignItems: 'center',
              color: 'text.primary',
            }}
          >
            Help
          </LinkStyle>

          <NextLink href={'./auth/login'} passHref>
            <LinkStyle
              onClick={() => {}}
              sx={{
                display: { xs: 'none', md: 'flex' },
                cursor: 'pointer',
                alignItems: 'center',
                color: 'text.primary',
              }}
            >
              Login
            </LinkStyle>
          </NextLink>
          {isDesktop ? (
            <Button variant="contained" target="_blank" rel="noopener" href={PATH_ONBOARDING.root}>
              Start free trial
            </Button>
          ) : null}

          {!isDesktop && (
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={mobileNavConfig} />
          )}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
