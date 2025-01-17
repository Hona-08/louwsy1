import {
  Chip,
  CircularProgress,
  debounce,
  Grid,
  LinearProgress,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { borderRadius, Box } from "@mui/system";
import EmptyContent from "components/EmptyContent";
import { FlexBetween, FlexBox } from "components/flex-box";
import LoadingScreen from "components/loading-screen";
import ProductCard1 from "components/product-cards/ProductCard1";
import ProductCardList1 from "components/product-cards/ProductCardList1";
import { SearchOutlinedIcon } from "components/search-box/SearchBox";
import { Paragraph, Span } from "components/Typography";
import productDatabase from "data/product-database";
import useLocales from "hooks/useLocales";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  getNewProducts,
  getSearchProducts,
  getShopProducts,
} from "utils/api/products";

// ========================================================
type ResturantProductsListProps = {
  searchProducts?: string | string[];
  sortedBy?: string;
  filterValues: any;
  setFilterValues: any;
  shopId: string | string[];
};
// ========================================================

const sortOptions = [
  { label: "alphabetical-a-z", value: "name|asc" },
  { label: "alphabetical-z-a", value: "name|desc" },
  // { label: "Min. order amount Low-High", value: "minimumOrderAmount|asc" },
  // { label: "Min. order amount High-Low", value: "minimumOrderAmount|desc" },
  { label: "price-low-high", value: "price|asc" },
  { label: "price-high-low", value: "price|desc" },
];

const ResturantProductsList: React.FC<ResturantProductsListProps> = ({
  filterValues,
  setFilterValues,
  shopId,
}) => {
  const [viewFilter, setViewFilter] = useState(false);
  const [sortOption, setSortOption] = useState("createdAt|asc");
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation("common");
  const { translate } = useLocales();

  const { data: products, isFetching } = useQuery<any>(
    ["get_shop_products", shopId, sortOption, searchQuery, filterValues],
    () =>
      getShopProducts({
        shopId,
        sortBy: sortOption,
        searchQuery,
        filterValues,
      }),
    {
      enabled: Boolean(shopId),
    }
  );

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) {
      setSearchQuery("");
    } else {
      setSearchQuery(value);
    }
  }, 1000);

  const handleSearch = useCallback((event) => {
    event.persist();
    search(event);
    setViewFilter(true);
  }, []);

  const handleChange = (value) => {
    setSortOption(value);
  };

  const handleDelete = () => {
    setSearchQuery("");
    setViewFilter(false);
  };

  // if (isFetching || !shopId) {
  //   return <LoadingScreen />;
  // }

  return (
    <Fragment>
      <FlexBox
        alignItems="center"
        columnGap={4}
        flexWrap="wrap"
        my="-0.8rem"
        rowGap={1}
        sx={{ mr: 2, mb: "1rem" }}
      >
        <FlexBox alignItems="center" gap={1} flex="1 1 0">
          <TextField
            placeholder={t("Search-food-items") + "..."}
            sx={{
              my: 2,
              width: {
                sm: "20rem",
                xs: "17rem",
                md: "30rem",
                lg: "40rem",
                ml: "50rem",
              },
            }}
            variant="outlined"
            onChange={handleSearch}
            InputProps={{
              sx: {
                height: 50,
                paddingRight: 0,
                color: "grey.700",
                borderRadius: 100,
                // background: "#fff",
                // "& fieldset": { border: "none" },
                overflow: "hidden",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              },
              endAdornment: viewFilter && searchQuery.length > 0 && (
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={searchQuery}
                    sx={{ mr: 2 }}
                    onDelete={handleDelete}
                  />
                </Stack>
              ),
              startAdornment: <SearchOutlinedIcon fontSize="small" />,
            }}
          />
        </FlexBox>
        {/* <FlexBox alignItems="flex-end" gap={1} flex="1 1 1">
          <Paragraph color="grey.600" whiteSpace="pre">
            {t("sort-by")}
          </Paragraph>

          <TextField
            select
            size="small"
            variant="outlined"
            placeholder="Sort by"
            defaultValue={sortOptions[0].value}
            sx={{
              width: 180,
              flex: "1 1 0",
            }}
          >
            {sortOptions.map((item) => (
              <MenuItem
                value={item.value}
                key={item.value}
                onClick={() => handleChange(item.value)}
              >
                {t(`${item.label}`)}
              </MenuItem>
            ))}
          </TextField>
        </FlexBox> */}
      </FlexBox>
      <Grid container spacing={3}>
        {products?.length > 0 ? (
          products?.map((item, ind) => (
            <Grid item lg={12} sm={12} xs={12} key={ind}>
              <ProductCardList1
                id={item.id}
                title={item.name}
                price={item.price}
                shortDescription={item.shortDescription}
                imgUrl={item.productImages[0]?.name}
                restaurantId={item?.shopId}
              />
            </Grid>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <EmptyContent
                title={t("no-product")}
                sx={{
                  "& span.MuiBox-root": { height: 160 },
                }}
              />
            </TableCell>
          </TableRow>
        )}
      </Grid>

      {/* <FlexBetween flexWrap="wrap" mt={4}>
                <Span color="grey.600">Showing 1-{products?.length || 5} of {products?.length || 10} Products</Span>
                <Pagination count={10} variant="outlined" color="primary" />
            </FlexBetween> */}
    </Fragment>
  );
};

export default ResturantProductsList;
