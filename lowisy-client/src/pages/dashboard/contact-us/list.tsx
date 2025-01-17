import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Link,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// @types
import { Product } from '../../../@types/product';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../../components/table';
// sections
import {
  ProductTableRow,
  ProductTableToolbar,
} from '../../../sections/@dashboard/e-commerce/product-list';
import { useQuery } from '@tanstack/react-query';
import { deleteSingleProduct, getShopProducts, getSingleProduct } from 'src/api/products';
import { sortBy } from 'lodash';
import CategoryTableRow from 'src/sections/@dashboard/category-list/CategoryTableRow';

import ContactUsTableToolBar from 'src/sections/@dashboard/contact-us/ContactUsTableToolbar';
import ContactUsTableRow from 'src/sections/@dashboard/contact-us/ContactUsTableRow';
import { deleteContactUs, getAllContactUs } from 'src/api/contact-us';
import { ContactUs } from 'src/@types/contact-us';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'name', align: 'left' },
  { id: 'email', label: 'email', align: 'left' },
  { id: 'subject', label: 'subject', align: 'center', width: 180 },
  { id: 'message', label: 'message', align: 'right' },
  { id: '' },
];

// ----------------------------------------------------------------------

ContactUsList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ContactUsList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'name',
  });

  const { themeStretch } = useSettings();

  const { push } = useRouter();
  //console.log({ order, orderBy });
  const dispatch = useDispatch();
  const [totalContactUs, setTotalContactUs] = useState(0);
  // const { products, isLoading } = useSelector((state) => state.product);

  // const [tableData, setTableData] = useState<Product[]>([]);

  const [filterName, setFilterName] = useState('');

  const {
    data: { results },
    isLoading,
    refetch,
  } = useQuery<any>(
    ['get_contactUs', page, rowsPerPage, filterName, orderBy, order],
    () =>
      getAllContactUs({
        page,
        limit: rowsPerPage,
        searchQuery: filterName,
        sortBy: orderBy,
        order,
      }),
    {
      initialData: { results: [], totalContactUs: 0 },
      onSuccess(data) {
        if (page === 0) {
          setTotalContactUs(data.total);
        }
      },
    }
  );

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = async (id: string) => {
    // const deleteRow = tableData.filter((row) => row.id !== id);
    // setSelected([]);
    // setTableData(deleteRow);
    await deleteContactUs(id);
    refetch();
  };

  const handleDeleteRows = (selected: string[]) => {
    // await deleteSingleProduct(selected);
    // refetch();
  };

  const handleEditRow = (id: string) => {
    push(PATH_DASHBOARD.menu.contactUs.edit(paramCase(id)));
  };

  const dataFiltered = applySortFilter({
    results,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!totalContactUs && !!filterName) || (!isLoading && !totalContactUs);
  const { translate } = useLocales();
  return (
    <Page title="Shop: Contact Us List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('contact_us_list')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('contact_us'),
              href: PATH_DASHBOARD.menu.contactUs.root,
            },
            { name: translate('contact_us_list') },
          ]}
        />

        <Card>
          <ContactUsTableToolBar filterName={filterName} onFilterName={handleFilterName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={totalContactUs}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      results.map((row: any) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={totalContactUs}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      results.map((row: any) => row.id)
                    )
                  }
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : results).map((row: any, index: any) =>
                    row ? (
                      <ContactUsTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ) : (
                      !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    )
                  )}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, totalContactUs)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalContactUs}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label={translate('dense')}
              sx={{ px: 3, py: 3, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  results,
  comparator,
  filterName,
}: {
  results: ContactUs[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = results.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  results = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    results = results.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return results;
}
