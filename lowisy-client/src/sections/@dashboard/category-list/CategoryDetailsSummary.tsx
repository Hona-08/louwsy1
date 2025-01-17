import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Divider,
  IconButton,
  Typography,
  TableCell,
  TableRow,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../utils/formatNumber';
// @types
import { Product, CartItem, DbProduct, Category } from '../../../@types/product';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SocialsButton from '../../../components/SocialsButton';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFSelect } from '../../../components/hook-form';
import Markdown from 'src/components/Markdown';
import { translateRect } from '@fullcalendar/common';
import useLocales from 'src/hooks/useLocales';

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
  category: Category;
};

export default function CategoryDetailsSummary({ category, ...other }: Props) {
  const theme = useTheme();

  const { push } = useRouter();

  const { id, name, description } = category;

  // const alreadyProduct = cart?.map((item) => item.id).includes(id);

  // const isMaxQuantity =
  //   cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= 5;

  const defaultValues = {
    id,
    name,
    description,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });
  const { translate } = useLocales();

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  return (
    <RootStyle {...other}>
      <TableRow>
        <TableCell>
          <Typography color="textPrimary" variant="subtitle2">
            {translate('name')}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="body2">
            {name}
          </Typography>
          {/* <Label color={isVerified ? 'success' : 'error'}>
                {isVerified ? 'Email verified' : 'Email not verified'}
              </Label> */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Typography color="textPrimary" variant="subtitle2">
            {translate('description')}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="body2">
            <Markdown children={description} />
          </Typography>
          {/* <Label color={isVerified ? 'success' : 'error'}>
                {isVerified ? 'Email verified' : 'Email not verified'}
              </Label> */}
        </TableCell>
      </TableRow>
      {/* <Typography variant="h5" paragraph>
                {name}
            </Typography>
            <Typography variant="h5" paragraph>
                {description}
            </Typography> */}
    </RootStyle>
  );
}
