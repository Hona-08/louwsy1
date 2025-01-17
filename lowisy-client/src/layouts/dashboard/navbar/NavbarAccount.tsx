// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import MyAvatar from '../../../components/MyAvatar';
import { useQuery } from '@tanstack/react-query';
import { getShopDetailsById } from 'src/api/products';
import Image from 'src/components/Image';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined;
};

export default function NavbarAccount({ isCollapse }: Props) {
  const { user, shop } = useAuth();
  const { shopId } = shop;
  // //console.log('shop id', shopId);

  const lowisy_s3_url = 'https://lowisy-dev.s3.eu-central-1.amazonaws.com/';
  const { data: shopDetails, isLoading: detailsLoading } = useQuery<any>(
    ['get_shop_details'],
    () => getShopDetailsById(shopId as string),
    {}
  );

  // //console.log('user', user);

  return (
    <NextLink href={PATH_DASHBOARD.root} passHref>
      <Link underline="none" color="inherit">
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: 'transparent',
            }),
          }}
        >
          {/* <Image
            alt="logo"
            src={lowisy_s3_url + 1666182357139}
            width="10px"
            height="10px"
            sx={{ borderRadius: '50%' }}
          /> */}
          <MyAvatar src={lowisy_s3_url + shopDetails?.data?.logo} />

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {shopDetails?.data?.name}
            </Typography>
          </Box>
        </RootStyle>
      </Link>
    </NextLink>
  );
}
