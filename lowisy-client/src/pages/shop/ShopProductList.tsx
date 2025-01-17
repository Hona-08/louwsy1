// @mui
import { Box } from '@mui/material';
// @type

// components
import { SkeletonProductItem } from '../../components/skeleton';
//
import ShopProductCard from './ShopProductCard';

// ----------------------------------------------------------------------

export interface IProducts {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  productImages: {
    images: string;
  }[];
  price: number;
  tax: number;
  unit: number;
  packaging_content: string;
  shop_id: string;
}
type Props = {
  products: IProducts[];
  loading: boolean;
};

export default function ShopProductList({ products, loading }: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {(loading ? [...Array(12)] : products).map((product, index) =>
        product ? (
          <ShopProductCard key={product.id} product={product} />
        ) : (
          <SkeletonProductItem key={index} />
        )
      )}
    </Box>
  );
}
