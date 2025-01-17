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
  Divider,
  Tab,
  Tabs,
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
import CategoryTableRow from 'src/sections/@dashboard/category-list/CategoryTableRow';
import {
  archiveBulkCategories,
  deleteBulkCategories,
  deleteCategory,
  getCategories,
} from 'src/api/categories';
import { CategoryTableToolbar } from 'src/sections/@dashboard/category-list';
import useLocales from 'src/hooks/useLocales';
import { useSnackbar } from 'notistack';
import { DeleteDialog } from 'src/sections/@dashboard/category-list/dialog-delete-all';
import { ArchiveDialog } from 'src/sections/@dashboard/category-list/archive-dialog';
import useTabs from 'src/hooks/useTabs';
import FileImportExport from 'src/sections/@dashboard/ImportExport';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'category', align: 'left' },
  { id: 'createdAt', label: 'created_at', align: 'left' },
  { id: 'description', label: 'description', align: 'center', width: 180 },
  { id: '' },
];

const STATUS_OPTIONS = ['All', 'Archived'];

// ----------------------------------------------------------------------

CategoriesList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CategoriesList() {
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

  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('All');

  const { push } = useRouter();

  const dispatch = useDispatch();
  const [totalCategories, setTotalCategories] = useState(0);
  // const { products, isLoading } = useSelector((state) => state.product);

  // const [tableData, setTableData] = useState<Product[]>([]);

  const [filterName, setFilterName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenArchive, setDialogOpenArchive] = useState(false);

  const {
    data: { results },
    isLoading,
    refetch,
  } = useQuery<any>(
    ['get_categories', page, rowsPerPage, filterName, orderBy, order, filterStatus],
    () =>
      getCategories({
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
          setTotalCategories(data.total);
          setSelected([]);
        }
      },
    }
  );

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const deleteCategoryMutation = useMutation((id: any) => deleteCategory(id), {
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

  const deleteBulkCategoriesMutation = useMutation((ids: any) => deleteBulkCategories(ids), {
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

  const archiveBulkCategoriesMutation = useMutation((ids: any) => archiveBulkCategories(ids), {
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

  const handleDeleteRow = async (id: string) => {
    // const deleteRow = tableData.filter((row) => row.id !== id);
    // setSelected([]);
    // setTableData(deleteRow);
    deleteCategoryMutation.mutate(id);
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

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelected([]);
  };

  const handleCloseArchiveDialog = () => {
    setDialogOpenArchive(false);
    setSelected([]);
  };

  const handleDeleteCategories = () => {
    console.log({ selected });
    // Implement your delete logic here
    deleteBulkCategoriesMutation.mutate(selected);

    // Call an API, dispatch an action, etc.
    handleCloseDialog();
  };

  const handleArchiveCategories = () => {
    console.log({ selected });
    // Implement your delete logic here
    archiveBulkCategoriesMutation.mutate(selected);

    // Call an API, dispatch an action, etc.
    handleCloseArchiveDialog();
  };

  const handleEditRow = (id: string) => {
    push(PATH_DASHBOARD.menu.categories.edit(paramCase(id)));
  };

  // const dataFiltered = applySortFilter({
  //   products,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!totalCategories && !!filterName) || (!isLoading && !totalCategories);
  const { translate } = useLocales();
  return (
    <Page title="Shop: Category List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('category_list')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('categories'),
              href: PATH_DASHBOARD.menu.categories.list,
            },
            { name: translate('category_list') },
          ]}
          action={
            <>
              <NextLink href={PATH_DASHBOARD.menu.categories.new} passHref>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                  {translate('new_category')}
                </Button>
              </NextLink>
            </>
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

          <Divider />
          <CategoryTableToolbar
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
                  rowCount={totalCategories}
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
                handleDelete={handleDeleteCategories}
              />
              <ArchiveDialog
                open={dialogOpenArchive}
                handleClose={handleCloseArchiveDialog}
                handleArchive={handleArchiveCategories}
                title={filterStatus == 'All' ? 'Archive' : 'Unarchive'}
                data={'Categories'}
              />
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={totalCategories}
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
                        <CategoryTableRow
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
                    emptyRows={emptyRows(page, rowsPerPage, totalCategories)}
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
              count={totalCategories}
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
