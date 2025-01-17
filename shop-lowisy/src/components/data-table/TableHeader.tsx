import {
  Checkbox,
  styled,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import UpDown from "components/icons/UpDown";
import { ChangeEvent, FC } from "react";

// styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  padding: "16px 20px",
  color: theme.palette.grey[900],
}));

// ----------------------------------------------------------------------
type TableHeaderProps = {
  heading: any[];
  orderBy: string;
  rowCount: number;
  numSelected: number;
  order: "asc" | "desc";
  hideSelectBtn?: boolean;
  onRequestSort: (id: string) => void;
  onSelectAllClick?: (checked: boolean, defaulSelect: string) => void;
};
// ----------------------------------------------------------------------

const TableHeader: FC<TableHeaderProps> = (props) => {
  const {
    order,
    heading,
    orderBy,
    rowCount,
    numSelected,
    onRequestSort,
    onSelectAllClick = () => {},
    hideSelectBtn = false,
  } = props;

  return (
    <TableHead sx={{ backgroundColor: "grey.200" }}>
      <TableRow>
        {!hideSelectBtn && (
          <StyledTableCell align="left">
            <Checkbox
              color="info"
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onSelectAllClick(event.target.checked, "product")
              }
            />
          </StyledTableCell>
        )}

        {heading.map((headCell,index) => (
          <StyledTableCell
            key={index}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={() => onRequestSort(headCell.id)}
              direction={orderBy === headCell.id ? order : "asc"}
              sx={{ "& .MuiTableSortLabel-icon": { opacity: 1 } }}
              IconComponent={() => (
                <UpDown sx={{ fontSize: 14, ml: 1, color: "grey.600" }} />
              )}
            >
              {headCell.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
