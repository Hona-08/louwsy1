import { CircularProgress, Grid, LinearProgress, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import LoadingScreen from "components/loading-screen";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";
import productDatabase from "data/product-database";
import React, { Fragment } from "react";
import { useQuery } from "react-query";
import { getNewProducts, getSearchProducts } from "utils/api/products";

// ========================================================
type ProductCard1ListProps = {
  searchProducts?: string | string[]
  sortedBy?: string
};
// ========================================================

const ProductCard1List: React.FC<ProductCard1ListProps> = ({ searchProducts = 'all', sortedBy }) => {


  const { data: products, isFetching } = useQuery<any>(['get_new_products', searchProducts, sortedBy], () => getSearchProducts(searchProducts, sortedBy))

  if (isFetching) {
    return <LoadingScreen />
  }

  return (
    <Fragment>
      <Grid container spacing={3}>
        {products.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
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
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-{products?.length || 5} of {products?.length || 10} Products</Span>
        <Pagination count={10} variant="outlined" color="primary" />
      </FlexBetween>
    </Fragment>
  );
};

export default ProductCard1List;
