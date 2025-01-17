import East from "@mui/icons-material/East";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { format } from "date-fns";
import Link from "next/link";
import { FC } from "react";

// =================================================
type OrderRowProps = {
  item: {
    id: string
    orderNo: any;
    href: string;
    totalCost: number;
    status: { name: string };
    createdAt: string | Date;
  };
};
// =================================================

const OrderRow: FC<OrderRowProps> = ({ item }) => {
  const getColor = (status: string) => {
    switch (status) {
      case "Placed":
        return "primary";

      case "Queued":
        return "secondary";

      case "Delivered":
        return "success";

      case "Cancelled":
        return "error";

      default:
        return "";
    }
  };

  return (
    <Link href={`/orders/${item.id}`}>
      <a>
        <TableRow sx={{ my: "1rem", padding: "6px 18px" }}>
          <H5 m={0.75} textAlign="left">
            {item.orderNo}
          </H5>
          <Box m={0.75}>
            <Chip
              size="small"
              label={item.status?.name}
              sx={{
                p: "0.25rem 0.5rem",
                fontSize: 12,
                color: !!getColor(item.status.name)
                  ? `${getColor(item.status.name)}.900`
                  : "inherit",
                backgroundColor: !!getColor(item.status.name)
                  ? `${getColor(item.status.name)}.100`
                  : "none",
              }}
            />
          </Box>
          <Typography className="pre" m={0.75} textAlign="left">
            {format(new Date(item.createdAt), "MMM dd, yyyy")}
          </Typography>

          <Typography m={0.75} textAlign="left">
            €{item.totalCost.toFixed(2)}
          </Typography>

          {/* <Typography
            color="grey.600"
            textAlign="center"
            sx={{
              flex: "0 0 0 !important",
              display: { xs: "none", md: "block" },
            }}
          >
            <IconButton>
              <East
                fontSize="small"
                color="inherit"
                sx={{
                  transform: ({ direction }) =>
                    `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
                }}
              />
            </IconButton>
          </Typography> */}
        </TableRow>
      </a>
    </Link>
  );
};

export default OrderRow;
