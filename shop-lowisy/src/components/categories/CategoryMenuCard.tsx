import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, LinearProgress, styled } from "@mui/material";
import LoadingScreen from "components/loading-screen";
import navigations from "data/navigations";
import { FC } from "react";
import { useQuery } from "react-query";
import { getCategories } from "utils/api/categories";
import CategoryMenuItem from "./CategoryMenuItem";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2";

// styled component
const Wrapper = styled(Box)<CategoryMenuCardProps>(
  ({ theme, position, open }) => ({
    left: 0,
    zIndex: 98,
    right: "auto",
    borderRadius: 4,
    padding: "0.5rem 0px",
    transformOrigin: "top",
    boxShadow: theme.shadows[2],
    position: position || "unset",
    transition: "all 250ms ease-in-out",
    transform: open ? "scaleY(1)" : "scaleY(0)",
    backgroundColor: theme.palette.background.paper,
    top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
  })
);

// ===============================================================
type CategoryMenuCardProps = {
  open?: boolean;
  position?: "absolute" | "relative";
};
// ===============================================================

const CategoryMenuCard: FC<CategoryMenuCardProps> = (props) => {
  const { open, position } = props;

  const megaMenu: any = { MegaMenu1, MegaMenu2 };

  const { data: categories, isFetching, refetch } = useQuery<any>(['get_categories_all'], getCategories)


  if (isFetching) {
    return <LoadingScreen />
  }

  return (
    <Wrapper open={open} position={position}>
      {categories?.map((item, index) => {
        //let MegaMenu = megaMenu[item.menuComponent];

        return (
          <CategoryMenuItem
            key={item.id}
            href={item.href}
            icon={navigations[index % navigations.length].icon}
            title={item.name}
            caret={!!item.menuData}
          >
            {/* <MegaMenu data={item.menuData || {}} /> */}
          </CategoryMenuItem>
        );
      })}
    </Wrapper>
  );
};

CategoryMenuCard.defaultProps = { position: "absolute" };

export default CategoryMenuCard;
