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
import {
  archiveBulkProducts,
  deleteBulkProducts,
  deleteSingleProduct,
  getShopProducts,
  getSingleProduct,
} from 'src/api/products';
import { sortBy } from 'lodash';
import { useSnackbar } from 'notistack';
import useLocales from 'src/hooks/useLocales';
import useTabs from 'src/hooks/useTabs';
import { DeleteDialog } from 'src/sections/@dashboard/category-list/dialog-delete-all';
import { ArchiveDialog } from 'src/sections/@dashboard/category-list/archive-dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'product', align: 'left' },
  { id: 'createdAt', label: 'created_at', align: 'left' },
  { id: 'price', label: 'price', align: 'right' },
  { id: '' },
];

const STATUS_OPTIONS = ['All', 'Archived'];

// ----------------------------------------------------------------------

EcommerceProductList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductList() {
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
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('All');

  const { themeStretch } = useSettings();

  const { push } = useRouter();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenArchive, setDialogOpenArchive] = useState(false);

  const [totalProducts, setTotalProducts] = useState(0);
  // const { products, isLoading } = useSelector((state) => state.product);

  // const [tableData, setTableData] = useState<Product[]>([]);

  const [filterName, setFilterName] = useState('');

  const {
    data: { results },
    isLoading,
    refetch,
  } = useQuery<any>(
    ['get_products', page, rowsPerPage, filterName, orderBy, order, filterStatus],
    () =>
      getShopProducts({
        page,
        limit: rowsPerPage,
        searchQuery: filterName,
        sortBy: orderBy,
        order,
        filterStatus,
      }),
    {
      initialData: { results: [], totalProducts: 0 },
      onSuccess(data) {
        if (page === 0) {
          setTotalProducts(data.total);
        }
      },
    }
  );

  const deleteProductMutation = useMutation((id: any) => deleteSingleProduct(id), {
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

  const deleteBulkCategoriesMutation = useMutation((ids: any) => deleteBulkProducts(ids), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      setSelected([]);
      refetch();
    },
    onError(err: any) {
      enqueueSnackbar(
        err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
      );
    },
  });

  const archiveBulkCategoriesMutation = useMutation((ids: any) => archiveBulkProducts(ids), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      setSelected([]);
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
    deleteProductMutation.mutate(id);
    //refetch();
  };

  const handleDeleteRows = (selected: string[]) => {
    setDialogOpen(true);
    // await deleteSingleProduct(selected);
    // refetch();
  };

  const handleAchiveRows = (selected: string[]) => {
    setDialogOpenArchive(true);
    // await deleteSingleProduct(selected);
    // refetch();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelected([]);
  };

  const handleCloseArchiveDialog = () => {
    setDialogOpenArchive(false);
    setSelected([]);
  };

  const handleDeleteProducts = () => {
    console.log({ selected });
    // Implement your delete logic here
    deleteBulkCategoriesMutation.mutate(selected);

    // Call an API, dispatch an action, etc.
    handleCloseDialog();
  };

  const handleArchiveProducts = () => {
    console.log({ selected });
    // Implement your delete logic here
    archiveBulkCategoriesMutation.mutate(selected);

    // Call an API, dispatch an action, etc.
    handleCloseArchiveDialog();
  };

  const handleEditRow = (id: string) => {
    push(PATH_DASHBOARD.menu.products.edit(paramCase(id)));
  };

  // const dataFiltered = applySortFilter({
  //   products,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!totalProducts && !!filterName) || (!isLoading && !totalProducts);

  return (
    <Page title="Ecommerce: Product List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('product_list')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('products'),
              href: PATH_DASHBOARD.menu.products.root,
            },
            { name: translate('product_list') },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.menu.products.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                {translate('new_product')}
              </Button>
            </NextLink>
          }
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
              <Tab disableRipple key={tab} label={translate(`${tab}`)} value={tab} />
            ))}
          </Tabs>
          <ProductTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
            refetch={refetch}
            results={results}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={totalProducts}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      results.map((row: any) => row.id)
                    )
                  }
                  actions={
                    <>
                      <Tooltip title={translate('delete')}>
                        <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                      {filterStatus == 'All' ? (
                        <Tooltip title={translate('Archive')}>
                          <IconButton color="primary" onClick={() => handleAchiveRows(selected)}>
                            <Iconify icon={'material-symbols:archive'} />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title={translate('Unarchive')}>
                          <IconButton color="primary" onClick={() => handleAchiveRows(selected)}>
                            <Iconify icon={'material-symbols:unarchive'} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  }
                />
              )}
              <DeleteDialog
                open={dialogOpen}
                handleClose={handleCloseDialog}
                handleDelete={handleDeleteProducts}
              />
              <ArchiveDialog
                open={dialogOpenArchive}
                handleClose={handleCloseArchiveDialog}
                handleArchive={handleArchiveProducts}
                title={filterStatus == 'All' ? 'Archive' : 'Unarchive'}
                data={'Products'}
              />

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={totalProducts}
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
                        <ProductTableRow
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
                    emptyRows={emptyRows(page, rowsPerPage, totalProducts)}
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
              count={totalProducts}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 3, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
