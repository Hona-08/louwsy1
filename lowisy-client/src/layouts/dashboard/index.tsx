import { useState, ReactNode } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// config
import { HEADER, NAVBAR } from '../../config';
import { DashboardHeader, NavbarVertical } from 'src/components/lazy-loading';
import MainFooter from '../main/MainFooter';
import DashHead from './header/main';
import Footer from './footer';
//


// ----------------------------------------------------------------------

type MainStyleProps = {
  collapseClick: boolean;
};

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})<MainStyleProps>(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { collapseClick, isCollapse } = useCollapseDrawer();

  const { themeLayout } = useSettings();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const verticalLayout = themeLayout === 'vertical';

  // if (verticalLayout) {
  //   return (
  //     <>
  //       <DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout} />


  //         <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />


  //       <Box
  //         component="main"
  //         sx={{
  //           px: { lg: 2 },
  //           pt: {
  //             xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
  //             lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
  //           },
  //           pb: {
  //             xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
  //             lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
  //           },
  //         }}
  //       >
  //         {children}
  //       </Box>
  //     </>
  //   );
  // }

  return (
    <>
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />

      {/* <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} /> */}

      <MainStyle collapseClick={collapseClick}>{children}</MainStyle>

    </Box>
    <Footer/>
    </>
  );
}
