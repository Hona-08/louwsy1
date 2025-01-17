import { useState } from 'react';
import { paramCase, sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem, Link, Button } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// @types
import { Category, DbProduct, Product } from '../../../@types/product';
// components
import Label from '../../../components/Label';
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useRouter } from 'next/router';
import Markdown from 'src/components/Markdown';
import { useQuery } from '@tanstack/react-query';
import { getAllContactUs } from 'src/api/contact-us';
import { ContactUs } from 'src/@types/contact-us';

// ----------------------------------------------------------------------

type Props = {
  row: ContactUs;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ContactUsTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: Props) {
  const theme = useTheme();
  const { pathname, push } = useRouter();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { name, email, subject, message, id } = row;
  //console.log('row', row);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <Link
        component="button"
        variant="body2"
        onClick={() => {
          //console.log('clicked row id', id);
          push(PATH_DASHBOARD.menu.contactUs.view(id!));
        }}
      >
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>
      </Link>

      <TableCell>{email}</TableCell>

      <TableCell align="center">
        <Markdown children={subject} />
      </TableCell>

      <TableCell align="right">
        <Markdown children={message} />
      </TableCell>
      <TableCell align="right">
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
      </TableCell>
      {/* </Link> */}
    </TableRow>
  );
}
