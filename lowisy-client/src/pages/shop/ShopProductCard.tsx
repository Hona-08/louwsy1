import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_SHOP } from '../../routes/paths';
// utils
import { fCurrency } from '../../utils/formatNumber';
// @types

// components
import Label from '../../components/Label';
import Image from '../../components/Image';
import { ColorPreview } from '../../components/color-utils';
import { IProducts } from './ShopProductList';
// ----------------------------------------------------------------------

type Props = {
  product: IProducts;
};

export default function ShopProductCard({ product }: Props) {
  const lowisy_s3_url = 'https://lowisy-dev.s3.eu-central-1.amazonaws.com/';

  const { name, price, productImages, shop_id } = product;

  //console.log('product images 0', productImages[0].images);
  const cover = lowisy_s3_url + productImages[0].images;
  const linkTo = PATH_SHOP.product.view(shop_id, paramCase(name));

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <Image alt={name} src={cover} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <NextLink href={linkTo} passHref>
          <Link color="inherit">
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>
        </NextLink>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          {/* <Stack direction="row" spacing={0.5}>
            {priceSale && (
              <Typography
                component="span"
                sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
              >
                {fCurrency(priceSale)}
              </Typography>
            )}

            <Typography variant="subtitle1">{fCurrency(price)}</Typography>
          </Stack> */}
        </Stack>
      </Stack>
    </Card>
  );
}
