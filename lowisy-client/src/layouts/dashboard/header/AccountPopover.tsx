import { useSnackbar } from 'notistack';
import { useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Theme, alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, useMediaQuery } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { useQuery } from '@tanstack/react-query';
import { getShopDetailsById } from 'src/api/products';
import useLocales from 'src/hooks/useLocales';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

const SHOP_OPTIONS = [
  {
    label: 'Orders',
    linkTo: '/dashboard/orders/list',
  },
  {
    label: 'Products',
    linkTo: '/dashboard/products/list',
  },
  {
    label: 'Categories',
    linkTo: '/dashboard/categories/list',
  },
  {
    label: 'Customers',
    linkTo: '/dashboard/customers/list',
  },
  {
    label: 'Help',
    linkTo: '#',
  },
  // {
  //   label: 'Setting',
  //   linkTo: PATH_DASHBOARD.user.profile,
  // },
  // {
  //   label: 'License',
  //   linkTo: PATH_DASHBOARD.user.account,
  // },
];

const MENU_OPTIONS = [
  {
    label: 'Account',
    linkTo: '/dashboard/settings/baseline',
  },
  {
    label: 'Restaurant',
    linkTo: '/dashboard/settings/logistics',
  },
  {
    label: 'Setting',
    linkTo: '/dashboard/settings/branding',
  },
  {
    label: 'License',
    linkTo: '/dashboard/settings/license',
  },
  // {
  //   label: 'Setting',
  //   linkTo: PATH_DASHBOARD.user.profile,
  // },
  // {
  //   label: 'License',
  //   linkTo: PATH_DASHBOARD.user.account,
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const { logout, shop } = useAuth();

  const matches = useMediaQuery('(max-width:640px)');

  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  const isMountedRef = useIsMountedRef();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const { shopId } = shop;
  // //console.log('shop id', shopId);

  const lowisy_s3_url = 'https://lowisy-dev.s3.eu-central-1.amazonaws.com/';
  const { data: shopDetails, isLoading: detailsLoading } = useQuery<any>(
    ['get_shop_details'],
    () => getShopDetailsById(shopId as string),
    {}
  );

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const user = {};

  const handleLogout = async () => {
    try {
      await logout();
      router.replace(PATH_AUTH.login);

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      error;
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Iconify icon="eva:menu-2-fill" color="white" />
        {/* <MyAvatar src={lowisy_s3_url + shopDetails?.data?.logo} /> */}
        {/* <MyAvatar src={lowisy_s3_url + logo} /> */}
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {'My Restaurant'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {''}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {matches && (
          <>
            {' '}
            <Stack sx={{ p: 1 }}>
              {SHOP_OPTIONS.map((option) => (
                <NextLink key={option.label} href={option.linkTo} passHref>
                  <MenuItem key={option.label} onClick={handleClose}>
                    {option.label}
                  </MenuItem>
                </NextLink>
              ))}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )}

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          {translate('logout')}
        </MenuItem>
      </MenuPopover>
    </>
  );
}
