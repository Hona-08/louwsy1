import { useState } from 'react';
import { paramCase, sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  TableRow,
  Checkbox,
  TableCell,
  Typography,
  MenuItem,
  Link,
  Button,
  IconButton,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// @types
import { DbProduct, Product } from '../../../../@types/product';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function OrderTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: Props) {
  const theme = useTheme();
  const { pathname, push } = useRouter();
  const { createdAt, id, totalCost, customerId, shopId, orderNo, orderStatusId, status, customer } =
    row;
  //console.log({ row });
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const lowisy_s3_url = 'https://lowisy-dev.s3.eu-central-1.amazonaws.com/';

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const statusColor: any = {
    Delivered: theme.palette.success.main,
    Queued: theme.palette.warning.main,
    Cancelled: theme.palette.error.main,
    Placed: theme.palette.text.secondary,
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell>
        <Link
          component="button"
          variant="body1"
          onClick={() => {
            push(PATH_DASHBOARD.menu.orders.view(paramCase(id)));
          }}
        >
          {orderNo}
        </Link>
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Link
          component="button"
          variant="subtitle2"
          onClick={() => {
            push(PATH_DASHBOARD.menu.products.view(paramCase(id)));
          }}
        > */}

        {/* <Link
          component="button"
          variant="caption"
          onClick={() => {
            push(PATH_DASHBOARD.menu.orders.view(paramCase(id)));
          }}
        > */}
        <Typography variant="subtitle2" noWrap>
          {customer?.name}
        </Typography>
        {/* </Link> */}
      </TableCell>

      <TableCell>{fDate(createdAt)}</TableCell>

      {/* <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (unit === 'out_of_stock' && 'error') ||
            (unit === 'low_stock' && 'warning') ||
            'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {unit ? sentenceCase(unit) : ''}
        </Label>
      </TableCell> */}

      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status?.name === 'Cancelled' && 'error') ||
            (status?.name === 'Delivered' && 'success') ||
            (status?.name === 'Placed' && 'warning') ||
            'secondary'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status?.name}
        </Label>
      </TableCell>
      <TableCell align="right">{fCurrency(totalCost)}</TableCell>
      <TableCell align="center">
        <NextLink href={PATH_DASHBOARD.menu.orders.view(paramCase(id))} passHref>
          <IconButton component="a">
            <RemoveRedEyeIcon fontSize="small" />
          </IconButton>
        </NextLink>
      </TableCell>
      {/* <TableCell align="center">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell> */}
    </TableRow>
  );
}
