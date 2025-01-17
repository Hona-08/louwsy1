import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { alpha, createStyles, makeStyles, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Link,
  Drawer,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItemButtonProps,
  Icon,
  IconButton,
  ListItem,
} from '@mui/material';
// config
import { NAVBAR } from '../../config';
// components
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { IconButtonAnimate } from '../../components/animate';
import { NavSectionVertical } from '../../components/nav-section';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

//
import { MenuProps, MenuItemProps } from './type';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
  ...theme.typography.body2,
  textTransform: 'capitalize',
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

export default function MenuMobile({ isOffset, isHome, navConfig }: MenuProps) {
  const { pathname } = useRouter();

  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    // <>
    //   <IconButtonAnimate
    //     onClick={handleDrawerOpen}
    //     sx={{
    //       ml: 1,
    //       ...(isHome && { color: 'text.primary' }),
    //       ...(isOffset && { color: 'text.primary' }),
    //     }}
    //   >
    //     <Iconify icon={'eva:menu-2-fill'} />
    //   </IconButtonAnimate>

    //   <Drawer
    //     anchor="right"
    //     open={drawerOpen}
    //     onClose={handleDrawerClose}
    //     ModalProps={{ keepMounted: true }}
    //     PaperProps={{ sx: { pb: 5, width: 260 } }}
    //   >
    //     <Box
    //       display="flex"
    //       justifyContent="flex-end"
    //       alignItems="flex-end"
    //       // sx={{ padding: { xs: '', sm: '' } }}
    //       padding={2}
    //     >
    //       <IconButton onClick={handleDrawerClose}>
    //         <Iconify icon="line-md:menu-to-close-alt-transition" />
    //       </IconButton>
    //     </Box>
    //     <Divider />
    //     <Scrollbar>
    //       <Logo sx={{ mx: 2.5, my: 3 }} />

    //       <List disablePadding>
    //         {/* {navConfig.map((link) => (
    //           <MenuMobileItem key={link.title} item={link} isOpen={open} onOpen={handleOpen} />
    //         ))} */}

    //         {navConfig.map((link) => (
    //           <MenuMobileItem key={link.title} item={link} isOpen={open} onOpen={handleOpen} />
    //         ))}
    //       </List>
    //     </Scrollbar>
    //   </Drawer>
    // </>
    <>
      <IconButtonAnimate
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'text.primary' }),
          ...(isOffset && { color: 'text.primary' }),
        }}
      >
        <Iconify icon={'eva:menu-2-fill'} />
      </IconButtonAnimate>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: '100%', height: '100%' } }}
      >
        <Scrollbar>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            // sx={{ padding: { xs: '2', sm: '2' } }}
            padding={2}
          >
            <Logo sx={{}} />
            <Iconify
              icon="ci:close-big"
              sx={{ marginLeft: 'auto', width: '50px', height: '20px' }}
              onClick={handleDrawerClose}
            />
          </Box>
          <Divider />
          <List
            disablePadding
            sx={{
              mt: '5px',
              padding: '10px',
            }}
          >
            {/* {navConfig.map((link) => (
            <MenuMobileItem key={link.title} item={link} isOpen={open} onOpen={handleOpen} />
          ))} */}

            {navConfig.map((link) => (
              <MenuMobileItem key={link.title} item={link} isOpen={open} onOpen={handleOpen} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

type MenuMobileItemProps = {
  item: MenuItemProps;
  isOpen: boolean;
  onOpen: VoidFunction;
};

function MenuMobileItem({ item, isOpen, onOpen }: MenuMobileItemProps) {
  const { pathname } = useRouter();
  const { title, path, icon, children } = item;

  const isActive = pathname === path;

  if (children) {
    return (
      <>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Iconify
            icon={isOpen ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSectionVertical
              navConfig={children}
              sx={{
                '& .MuiList-root:last-of-type .MuiListItemButton-root': {
                  height: 200,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  bgcolor: 'background.neutral',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: 'url(/assets/illustrations/illustration_dashboard.png)',
                  '& > *:not(.MuiTouchRipple-root)': { display: 'none' },
                },
              }}
            />
          </Box>
        </Collapse>
      </>
    );
  }

  if (title === 'Documentation') {
    return (
      <Link href={path} target="_blank" rel="noopener" underline="none">
        <ListItemStyle>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
        </ListItemStyle>
      </Link>
    );
  }

  return (
    <NextLink href={path} passHref>
      <ListItemStyle
        sx={{
          ...(isActive && {
            color: 'primary.main',
            fontWeight: 'fontWeightMedium',
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
          }),
          padding: '25px',
        }}
      >
        <ListItemIcon sx={{}}>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    </NextLink>
  );
}
