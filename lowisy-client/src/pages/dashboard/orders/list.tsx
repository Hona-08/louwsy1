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
  Tabs,
  Divider,
  Tab,
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
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteSingleProduct, getShopProducts, getSingleProduct } from 'src/api/products';
import { sortBy } from 'lodash';
import { useSnackbar } from 'notistack';
import { deleteOrder, getOrder, getOrders } from 'src/api/order';
import { OrderTableRow, OrderTableToolbar } from 'src/sections/@dashboard/e-commerce/order-list';
import useTabs from 'src/hooks/useTabs';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'orderNo', label: 'order_no', align: 'left' },
  { id: 'customer.name', label: 'customer_name', align: 'left' },
  { id: 'createdAt', label: 'created_at', align: 'left' },
  { id: 'status.name', label: 'status', align: 'center', width: 180 },
  { id: 'totalCost', label: 'total_cost', align: 'right' },
  // { id: 'arrow', label: "View", align:'right' },
  { id: '' },
];

const STATUS_OPTIONS = ['All', 'Placed', 'Delivered', 'Queued', 'Cancelled'];

// ----------------------------------------------------------------------

OrderList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function OrderList() {
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
    defaultOrderBy: 'createdAt',
  });
  const { translate } = useLocales();
  const { themeStretch } = useSettings();
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('All');
  const { push } = useRouter();
  //console.log({ filterStatus });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [totalOrders, setTotalOrders] = useState(0);

  const [filterName, setFilterName] = useState('');

  const {
    data: { results },
    isLoading,
    refetch,
  } = useQuery<any>(
    ['get_orders', page, rowsPerPage, filterName, orderBy, order, filterStatus],
    () =>
      getOrders({
        page,
        limit: rowsPerPage,
        searchQuery: filterName,
        sortBy: orderBy,
        order,
        filterStatus,
      }),
    {
      initialData: { results: [], totalOrders: 0 },
      onSuccess(data) {
        if (page === 0) {
          setTotalOrders(data.total);
        }
      },
    }
  );

  const deleteProductMutation = useMutation((id: any) => deleteOrder(id), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      refetch();
    },
    onError(err: any) {
      enqueueSnackbar(
        err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
      );
    },
  });

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = async (id: string) => {
    // const deleteRow = tableData.filter((row) => row.id !== id);
    // setSelected([]);
    // setTableData(deleteRow);
    //deleteProductMutation.mutate(id)
    //refetch();
  };

  const handleDeleteRows = (selected: string[]) => {
    // await deleteSingleProduct(selected);
    // refetch();
  };

  const handleEditRow = (id: string) => {
    //push(PATH_DASHBOARD.menu.products.edit(paramCase(id)));
  };

  // const dataFiltered = applySortFilter({
  //   products,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!totalOrders && !!filterName) || (!isLoading && !totalOrders);

  return (
    <Page title="Ecommerce: Order List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('order_list')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('orders'),
              href: PATH_DASHBOARD.menu.orders.root,
            },
            { name: translate('order_list') },
          ]}
        // action={
        //   // <NextLink href={PATH_DASHBOARD.menu.products.new} passHref>
        //   <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
        //     New Order
        //   </Button>
        //   // </NextLink>
        // }
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                disableRipple
                key={tab}
                label={translate(`${tab}`)}
                value={tab}
              />
            ))}
          </Tabs>

          <Divider />
          <OrderTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={totalOrders}
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
                  rowCount={totalOrders}
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
                  {(isLoading ? [...Array(rowsPerPage)] : results)
                    //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index: any) =>
                      row ? (
                        <OrderTableRow
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
                    emptyRows={emptyRows(page, rowsPerPage, totalOrders)}
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
              count={totalOrders}
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
  products,
  comparator,
  filterName,
}: {
  products: Product[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = products.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  products = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    products = products.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return products;
}
