import {
  Chip,
  CircularProgress,
  debounce,
  Grid,
  LinearProgress,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { borderRadius } from "@mui/system";
import { FlexBetween, FlexBox } from "components/flex-box";
import LoadingScreen from "components/loading-screen";
import ProductCard1 from "components/product-cards/ProductCard1";
import { SearchOutlinedIcon } from "components/search-box/SearchBox";
import { Paragraph, Span } from "components/Typography";
import productDatabase from "data/product-database";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useState } from "react";
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
};
// ========================================================

const sortOptions = [
  { label: "Alphabetical a-z", value: "name|asc" },
  { label: "Alphabetical z-a", value: "name|desc" },
  // { label: "Min. order amount Low-High", value: "minimumOrderAmount|asc" },
  // { label: "Min. order amount High-Low", value: "minimumOrderAmount|desc" },
  { label: "Price Low-High", value: "price|asc" },
  { label: "Price High-Low", value: "price|desc" },
];

const ResturantProductsList1: React.FC<ResturantProductsListProps> = ({
  filterValues,
  setFilterValues,
}) => {
  const { query } = useRouter();
  const { id: shopId } = query;
  const [viewFilter, setViewFilter] = useState(false);
  const [sortOption, setSortOption] = useState("createdAt|asc");
  const [searchQuery, setSearchQuery] = useState("");


  const { data: products, isFetching } = useQuery<any>(
    ["get_shop_products", sortOption, searchQuery, filterValues, shopId],
    () =>
      getShopProducts({
        shopId,
        sortBy: sortOption,
        searchQuery,
        filterValues,
      }),
    {
      onSuccess(data) {
        //setFilterValues({})
      },
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

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <Fragment>
      <FlexBox
        alignItems="center"
        columnGap={4}
        flexWrap="wrap"
        my="-0.8rem"
        rowGap={1}
        sx={{ mr: 2 }}
      >
        <FlexBox alignItems="center" gap={1} flex="1 1 0">
          <TextField
            placeholder="Search Food Items..."
            sx={{ my: 2, width: 290 }}
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
                // <BazaarButton
                //   color="primary"
                //   disableElevation
                //   variant="contained"
                //   sx={{ px: "2rem", height: "100%", borderRadius: "0 8px 8px 0" }}
                // >
                //   Search
                // </BazaarButton>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={searchQuery}
                    sx={{ mr: 2 }}
                    onDelete={handleDelete}
                  />
                  {/* <Chip label="Deletable" variant="outlined" onDelete={handleDelete} /> */}
                </Stack>
              ),
              startAdornment: <SearchOutlinedIcon fontSize="small" />,
            }}
          />
        </FlexBox>
        <FlexBox alignItems="flex-end" gap={1} flex="1 1 1">
          <Paragraph color="grey.600" whiteSpace="pre">
            Sort by:
          </Paragraph>

          <TextField
            select
            size="small"
            variant="outlined"
            placeholder="Short by"
            defaultValue={sortOptions[0].value}
            sx={{
              width: 100,
              flex: "1 1 0",
            }}
          >
            {sortOptions.map((item) => (
              <MenuItem
                value={item.value}
                key={item.value}
                onClick={() => handleChange(item.value)}
              >
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </FlexBox>

      </FlexBox>
      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((item, ind) => (
            <Grid item lg={12} sm={12} xs={12} key={ind}>
              <ProductCard1
                id={item.id}
                title={item.name}
                price={item.price}
                imgUrl={item.productImages[0]?.name}
                rating={item?.rating || 4}
                discount={item?.discount || 23}
                restaurantId={item?.shopId}
              />
            </Grid>
          ))
        ) : (
          <Grid>
            <Typography variant="h2" sx={{ m: 2 }}>
              Product not found
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* <FlexBetween flexWrap="wrap" mt={4}>
                  <Span color="grey.600">Showing 1-{products?.length || 5} of {products?.length || 10} Products</Span>
                  <Pagination count={10} variant="outlined" color="primary" />
              </FlexBetween> */}
    </Fragment>
  );
};

export default ResturantProductsList1;
