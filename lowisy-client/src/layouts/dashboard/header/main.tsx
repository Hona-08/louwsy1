import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Link,
  Stack,
  useMediaQuery,
  Theme,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import { link } from 'fs';
import useAuth from 'src/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getBaseLine } from 'src/api/settings';
import useResponsive from 'src/hooks/useResponsive';
import { matches } from 'lodash';

const headerStyle = {
  backgroundColor: '#111d4d',
  width: '100%',
};

const navlanghelp = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  flex: 1,
};

const linkStyle = {
  //color: 'white',
  // textDecoration: 'none',
};

const buttonStyle = {
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgb(255 255 255/40%)',
  },
};

function DashHead() {
  const matches = useMediaQuery('(max-width:640px)');
  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  const navStyle: any = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: downLg ? 2 : 10,
    flex: 1,
  };

  const { data: shop } = useQuery<any>(['baseline'], getBaseLine);

  return (
    <div>
      <AppBar position="relative" style={headerStyle}>
        <Toolbar>
          {!matches && (
            <>
              <Typography variant="h6">
                <a>
                  <Link
                    href="/dashboard"
                    sx={{
                      color: '#fff',
                      textDecoration: 'none !important',
                      '&:hover': {
                        backgroundColor: 'rgb(255 255 255/40%)',
                      },
                    }}
                  >
                    {shop?.name}
                  </Link>
                </a>
              </Typography>
              <div style={navStyle}>
                <Link href="/dashboard/orders/list/" style={linkStyle}>
                  <Button
                    sx={{
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgb(255 255 255/40%) !important',
                      },
                    }}
                  >
                    Orders
                  </Button>
                </Link>
                <Link href="/dashboard/products/list" style={linkStyle}>
                  <Button
                    sx={{
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgb(255 255 255/40%) !important',
                      },
                    }}
                  >
                    Products
                  </Button>
                </Link>
                <Link href="/dashboard/categories/list" style={linkStyle}>
                  <Button
                    sx={{
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgb(255 255 255/40%) !important',
                      },
                    }}
                  >
                    Categories
                  </Button>
                </Link>
                <Link href="/dashboard/customers/list" style={linkStyle}>
                  <Button
                    sx={{
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgb(255 255 255/40%) !important',
                      },
                    }}
                  >
                    Customers
                  </Button>
                </Link>
              </div>
              <div style={navlanghelp}>
                <LanguagePopover />

                <Typography>
                  <Link
                    href="/dashboard/help"
                    sx={{
                      textDecoration: 'none !important',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgb(255 255 255/40%)',
                      },
                    }}
                  >
                    Help
                  </Link>
                </Typography>
              </div>

              <Stack
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={{ xs: 0.5, sm: 1.5 }}
              >
                {/* <Typography variant="h6">
              <Link href="/dashboard" sx={{ textDecoration: 'none', color: 'white' }}>
                {shop?.name}
              </Link>
            </Typography> */}
                {/* <NotificationsPopover /> */}
                {/* <ContactsPopover /> */}
                <AccountPopover />
              </Stack>
            </>
          )}

          {matches && (
            <>
              <Stack
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={{ xs: 4.8, sm: 1.5 }}
                gap={2}
                sx={{ width: '100%' }} // Ensure the Stack takes the full width
              >
                <div style={{ flex: 1 }}>
                  <Typography variant="h6">
                    <Link href="/dashboard" sx={{ textDecoration: 'none', color: 'white' }}>
                      {shop?.name}
                    </Link>
                  </Typography>
                </div>
                <LanguagePopover />

                <div>
                  <AccountPopover />
                </div>
              </Stack>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default DashHead;
