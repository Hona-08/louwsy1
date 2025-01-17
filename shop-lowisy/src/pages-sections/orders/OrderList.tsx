import {
  Alert,
  Box,
  Pagination,
  TableCell,
  TablePagination,
} from "@mui/material";
import { FlexBox } from "components/flex-box";
import LoadingScreen from "components/loading-screen";
import TableRow from "components/TableRow";

import { useTranslation } from "react-i18next";
import { H2, H4, H5 } from "components/Typography";
import { FC, Fragment, useState, MouseEvent, ChangeEvent } from "react";
import { useQuery } from "react-query";
import { getOrders } from "utils/api/order";
import { TableSkeleton } from "utils/TableSkeleton";
import OrderRow from "./OrderRow";

// ============================================================
type OrderListProps = {};
// ============================================================

const OrderList: FC<OrderListProps> = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const { t } = useTranslation("common");

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const {
    data: { results: orders },
    isFetching,
    refetch,
  } = useQuery<any>(
    ["get_orders", page, limit],
    () => getOrders({ page, limit }),
    {
      initialData: { orders: [], totalOrders: 0 },
      onSuccess(data) {
        if (page === 0) {
          setTotalOrders(data.total);
        }
      },
    }
  );

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  if (isFetching) {
    return <LoadingScreen />;
  }


  return (
    <Fragment>
      <TableRow
        elevation={0}
        sx={{
          padding: "0px 18px",
          background: "none",
          display: { xs: "none", md: "flex" },
        }}
      >
        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          {t("Order")} #
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Status
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          {t("Date-Purchased")}
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          {t("Total")}
        </H5>
        <H5 flex="0 0 0 !important" color="grey.600" px={2.75} my={0} />
      </TableRow>

      {isFetching ? (
        <TableSkeleton noOfColumn={4} />
      ) : (
        orders?.map((item, ind) =>
          item ? (
            <OrderRow item={item} key={ind} />
          ) : (
            <TableSkeleton noOfColumn={4} key={ind} />
          )
        )
      )}
      {!isFetching && totalOrders == 0 && (
        <TableRow>
          <TableCell colSpan={6}>
            <Alert severity="info" sx={{ mx: 1.8, my: 1, p: 1, width: "90%" }}>
              <H5>{t("No-any-orders")}</H5>
            </Alert>
          </TableCell>
        </TableRow>
      )}

      <Box sx={{ position: "relative" }}>
        <TablePagination
          sx={{ mr: 6 }}
          component="div"
          count={totalOrders}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>
    </Fragment>
  );
};

export default OrderList;
