import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Box,
  Chip,
  Dialog,
  LinearProgress,
  MenuItem,
  Paper,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LoadingScreen from "components/loading-screen";
import ShowMoreDialog from "components/ShowMoreDialog";
import useSettings from "hooks/useSettings";
import Link from "next/link";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getCategories } from "utils/api/categories";
import DirectionsBikeRoundedIcon from "@mui/icons-material/DirectionsBikeRounded";
import TakeoutDiningRoundedIcon from "@mui/icons-material/TakeoutDiningRounded";
import { FlexBox } from "components/flex-box";
//styled component
const Wrapper = styled(Box)(({ theme }) => ({
  "& .category-dropdown-link": {
    height: 40,
    display: "flex",
    minWidth: "278px",
    cursor: "pointer",
    whiteSpace: "pre",
    padding: "0px 1rem",
    alignItems: "center",
    transition: "all 250ms ease-in-out",
    "& .title": { flexGrow: 1, paddingLeft: "0.75rem" },
  },
  "&:hover": {
    "& > .category-dropdown-link": {
      color: theme.palette.primary.main,
      background: theme.palette.action.hover,
    },
    "& > .mega-menu": { display: "block" },
  },
}));

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type ProductFilterCarProps = {
  filterValues?: any;
  setFilterValues?: any;
};

const DeliveryPickup = ({
  filterValues,
  setFilterValues,
}: ProductFilterCarProps) => {
  const { settings } = useSettings();
  const theme = useTheme();
  const { t } = useTranslation("common");
  const [dialogOpenShowMore, setDialogOpenShowMore] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const toggleDialogShowMore = () => setDialogOpenShowMore(!dialogOpenShowMore);
  const [selected, setSelected] = useState("");
  const [alignment, setAlignment] = useState<string | null>("DELIVERY");
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };
  const handleDeliveryAndPickup = (e: any) => {
    setFilterValues({ ...filterValues, ["shippingType"]: e.target.value });
  };
  const {
    data: categories,
    isFetching,
    refetch,
  } = useQuery<any>(["get_categories_all"], getCategories);

  const handleClick = (id: string, name: string) => {
    setSelected(id);
    setFilterValues({ ...filterValues, ["category"]: id });
  };
  const handleClickAll = () => {
    setFilterValues({ ...filterValues, ["category"]: "all" });
  };

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
      }}
      variant="outlined"
    >
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        color="standard"
        sx={{
          height: 34,
          paddingRight: 0,
          color: "grey.700",
          background: "#fff",
          "& fieldset": { border: "none" },
          ml: -15,
        }}
      >
        <ToggleButton
          value="DELIVERY"
          aria-label="left aligned"
          onClick={handleDeliveryAndPickup}
        >
          <span aria-disabled>
            <DirectionsBikeRoundedIcon sx={{ mr: 1.5 }} />
          </span>
          {t("Delivery")}
        </ToggleButton>
        <ToggleButton
          value="PICKUP"
          aria-label="centered"
          onClick={handleDeliveryAndPickup}
        >
          <span aria-disabled>
            <TakeoutDiningRoundedIcon sx={{ mr: 1.5 }} />
          </span>
          {t("Pickup")}
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
};
export default DeliveryPickup;
