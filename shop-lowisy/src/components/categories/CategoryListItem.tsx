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
import DeliveryPickup from "components/header/DeliveryPickup";
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
  selected?: any;
  setSelected?: any;
};

const CategoryItemList = ({
  filterValues,
  setFilterValues,
  selected,
  setSelected
}: ProductFilterCarProps) => {
  const { settings } = useSettings();
  const theme = useTheme();
  const { t } = useTranslation("common");
  const [dialogOpenShowMore, setDialogOpenShowMore] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const toggleDialogShowMore = () => setDialogOpenShowMore(!dialogOpenShowMore);
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
    setSelected("")
    setFilterValues({ ...filterValues, ["category"]: "" });
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
      <ListItem key="all">
        <Chip
          label={t("All")}
          color={selected ? "default" : "primary"}
          sx={{ width: "4rem" }}
          variant="filled"
          onClick={handleClickAll}
        ></Chip>
      </ListItem>
      {categories &&
        categories?.slice(0, isMobile ? 4 : 8).map((item: any, ind: any) => (
          <ListItem key={ind}>
            <Chip
              label={item.name}
              color={selected === item.id ? "primary" : "default"}
              variant="outlined"
              onClick={() => handleClick(item.id, item.name)}
            />
          </ListItem>
        ))}
      <ListItem key="show-more" onClick={toggleDialogShowMore}>
        <Chip
          label={t("Show-more")}
          color={selected ? "default" : "primary"}
          variant="outlined"
          sx={{ cursor: "pointer" }}
        ></Chip>
      </ListItem>
      <Dialog
        open={dialogOpenShowMore}
        scroll="paper"
        sx={{
          // mt: { lg: "0rem", sm: "0rem", md: "0rem", xs: "0rem" },
          width: { xs: "100vw" },
          height: { xs: "100vh" },
        }}
        //fullWidth={isMobile}
        onClose={toggleDialogShowMore}
      >
        <ShowMoreDialog
          setDialogOpen={setDialogOpenShowMore}
          categories={categories}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          selected={selected}
          setSelected={setSelected}
        />
      </Dialog>
    </Paper>
  );
};
export default CategoryItemList;
