import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Link, Stack, Button, Rating, Divider, IconButton, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_SHOP } from '../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../utils/formatNumber';
// @types
import { Product, CartItem, DbProduct } from '../../../@types/product';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SocialsButton from '../../../components/SocialsButton';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFSelect } from '../../../components/hook-form';
import { IProducts } from 'src/pages/shop/ShopProductList';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

type FormValuesProps = CartItem;

type Props = {
  product: IProducts;
  //cart: CartItem[];
  onAddCart: (cartItem: CartItem) => void;
  onGotoStep: (step: number) => void;
};

export default function ProductDetailsSummary({
  //cart,
  product,
  onAddCart,
  onGotoStep,
  ...other
}: Props) {
  const theme = useTheme();

  const { push } = useRouter();

  const {
    id,
    name,
    short_description,
    long_description,
    price,
    productImages,
    packaging_content,
    unit,
    tax,
  } = product;

  // const alreadyProduct = cart?.map((item) => item.id).includes(id);

  // const isMaxQuantity =
  //   cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= 5;

  const defaultValues = {
    id,
    name,
    price,
    unit,
    //quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const lowisy_s3_url = 'https://lowisy-dev.s3.eu-central-1.amazonaws.com/';

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (!true) {
        onAddCart({
          ...data,
          cover: `${lowisy_s3_url}${productImages[0].images}`,
          subtotal: data.price * data.unit,
        });
      }
      onGotoStep(0);
      push(PATH_SHOP.checkout);
    } catch (error) {
       (error);
    }
  };

  const handleAddCart = async () => {
    try {
      onAddCart({
        ...values,
        cover: `${lowisy_s3_url}${productImages[0].images}`,
        subtotal: values.price * values.unit,
      });
    } catch (error) {
       (error);
    }
  };

  return (
    <RootStyle {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          // color={unit === 'in_stock' ? 'success' : 'error'}
          color={unit > 1 ? 'success' : 'error'}
          sx={{ textTransform: 'uppercase' }}
        >
          {/* {sentenceCase(unit || '')} */}
          {sentenceCase(unit.toString() || '')}
        </Label>

        <Typography
          variant="overline"
          sx={{
            mt: 2,
            mb: 1,
            display: 'block',
            color: status === 'sale' ? 'error.main' : 'info.main',
          }}
        >
          {status}
        </Typography>

        <Typography variant="h5" paragraph>
          {name}
        </Typography>
        {/* 
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Rating value={totalRating} precision={0.1} readOnly />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(totalReview)}
            reviews)
          </Typography>
        </Stack> */}

        <Typography variant="h4" sx={{ mb: 3 }}>
          <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
            {price && fCurrency(price)}
          </Box>
          &nbsp;{fCurrency(price)}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Color
          </Typography>

          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorSinglePicker
                colors={colors}
                value={field.value}
                onChange={field.onChange}
                sx={{
                  ...(colors.length > 4 && {
                    maxWidth: 144,
                    justifyContent: 'flex-end',
                  }),
                }}
              />
            )}
          />
        </Stack> */}

        {/* <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Size
          </Typography>

          <RHFSelect
            name="size"
            size="small"
            fullWidth={false}
            FormHelperTextProps={{
              sx: { textAlign: 'right', margin: 0, mt: 1 },
            }}
            helperText={
              <Link underline="always" color="text.secondary">
                Size Chart
              </Link>
            }
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </RHFSelect>
        </Stack> */}

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Quantity
          </Typography>

          <div>
            <Incrementer
              name="quantity"
              unit={values.unit}
              available={unit}
              onIncrementQuantity={() => setValue('unit', values.unit + 1)}
              onDecrementQuantity={() => setValue('unit', values.unit - 1)}
            />
            <Typography
              variant="caption"
              component="div"
              sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}
            >
              Available: {unit}
            </Typography>
          </div>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Button
            fullWidth
            disabled={false}
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
            onClick={handleAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add to Cart
          </Button>

          <Button fullWidth size="large" type="submit" variant="contained">
            Buy Now
          </Button>
        </Stack>

        <Stack alignItems="center" sx={{ mt: 3 }}>
          <SocialsButton initialColor />
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

type IncrementerProps = {
  name: string;
  unit: number;
  available: number;
  onIncrementQuantity: VoidFunction;
  onDecrementQuantity: VoidFunction;
};

function Incrementer({
  available,
  unit,
  onIncrementQuantity,
  onDecrementQuantity,
}: IncrementerProps) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={unit <= 1} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {unit}
      </Typography>

      <IconButton
        size="small"
        color="inherit"
        disabled={unit >= available}
        onClick={onIncrementQuantity}
      >
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
