import { CircularProgress, LinearProgress, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import LoadingScreen from "components/loading-screen";
import ProductCard9 from "components/product-cards/ProductCard9";
import productDatabase from "data/product-database";
import React from "react";
import { useQuery } from "react-query";
import { getNewProducts, getSearchProducts } from "utils/api/products";
import { Span } from "../Typography";

// ==========================================================
type ProductCard9ListProps = {
  searchProducts?: string | string[]
  sortedBy?: string
};
// ==========================================================

const ProductCard9List: React.FC<ProductCard9ListProps> = ({ searchProducts = 'all', sortedBy }) => {

  const { data: products, isFetching } = useQuery<any>(['get_new_products', searchProducts, sortedBy], () => getSearchProducts(searchProducts, sortedBy))

  if (isFetching) {
    return <LoadingScreen />
  }
  return (
    <div>
      {products?.map((item, ind) => (
        <ProductCard9
          key={ind}
          id={item.id}
          title={item.name}
          price={item.price}
          imgUrl={item.productImages[0]?.name}
          rating={item?.rating || 4}
          discount={item?.discount || 23}
        />
      ))}

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-{products?.length || 5} of {products?.length || 10} Products</Span>
        <Pagination count={10} variant="outlined" color="primary" />
      </FlexBetween>
    </div>
  );
};

export default ProductCard9List;
