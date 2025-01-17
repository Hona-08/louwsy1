/* eslint-disable react-hooks/exhaustive-deps */
import { ControlPointDuplicateSharp } from "@mui/icons-material";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import {
  Box,
  Card,
  CircularProgress,
  LinearProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { debounce } from "@mui/material/utils";
import BazaarMenu from "components/BazaarMenu";
import { FlexBox } from "components/flex-box";
import LoadingScreen from "components/loading-screen";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getCategoriesInTreeFormat } from "utils/api/categories";
import { getNewProducts, getSearchProducts } from "utils/api/products";

// styled components
// also used in the GrocerySearchBox component
export const SearchOutlinedIcon = styled(SearchOutlined)(({ theme }) => ({
  color: theme.palette.grey[600],
  marginRight: 6,
}));

// also used in the GrocerySearchBox component
export const SearchResultCard = styled(Card)(() => ({
  zIndex: 99,
  top: "100%",
  width: "100%",
  position: "absolute",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
}));

const DropDownHandler = styled(FlexBox)(({ theme }) => ({
  whiteSpace: "pre",
  borderTopRightRadius: 300,
  borderBottomRightRadius: 300,
  borderLeft: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.down("xs")]: { display: "none" },
}));

interface IProduct {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  tax: string;
  unit: string;
  packagingContent: string;
  createdAt: string;
  updatedAt: string;
  shopId: string;
  isFeatured: 1;
  categoriesId: string;
  productImages: {
    images: string;
  }[];
}

const SearchBox: FC = () => {
  const [category, setCategory] = useState("All Categories");
  const [resultList, setResultList] = useState<string>("");
  const parentRef = useRef();
  const router = useRouter();
  const handleCategoryChange = (cat: any) => () => setCategory(cat);

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) {
      setResultList("");
    } else {
      setResultList(value);
    }
  }, 1000);

  const handleSearch = useCallback((event) => {
    event.persist();
    search(event);
  }, []);

  const { data: products, isFetching: fetchingProducts } = useQuery<any>(
    ["get_search_products", resultList],
    () => getSearchProducts(resultList)
  );

  const {
    data: categories,
    isFetching: fetchingCategories,
    refetch,
  } = useQuery<any>(["get_categories_tree"], getCategoriesInTreeFormat);

  // const handleDocumentClick = () => setResultList("");
  // const handleDocumentClick = () => setValue("");

  const handleDocumentClick = () => {
    //setResultList('')
    //router.push(`/product/search/${resultList}`)
  };

  // useEffect(() => {
  //   window.addEventListener("click", handleDocumentClick);
  //   return () => window.removeEventListener("click", handleDocumentClick);
  // }, []);

  if (fetchingCategories || fetchingProducts) {
    return <LoadingScreen />;
  }

  // const categoryDropdown = (
  //   <BazaarMenu
  //     direction="left"
  //     sx={{ zIndex: 1502 }}
  //     handler={
  //       <DropDownHandler
  //         px={3}
  //         gap={0.5}
  //         height="100%"
  //         color="grey.700"
  //         bgcolor="grey.100"
  //         alignItems="center"
  //         component={TouchRipple}
  //       >
  //         {category}
  //         <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
  //       </DropDownHandler>
  //     }
  //   >
  //     {categories?.map(({ name, id }) => (
  //       <MenuItem key={id} onClick={handleCategoryChange(name)}>
  //         {name}
  //       </MenuItem>
  //     ))}
  //   </BazaarMenu>
  // );

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{ ref: parentRef }}
    >
      {/* <TextField
        fullWidth
        variant="outlined"
        placeholder="Searching for..."
        onChange={handleSearch}
        InputProps={{
          sx: {
            height: 44,
            paddingRight: 0,
            borderRadius: 300,
            color: "grey.700",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
          endAdornment: categoryDropdown,
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      /> */}

      {/* {!!resultList && (
        <SearchResultCard elevation={2}>
          {products?.length > 0 ? products?.map((item) => (
            <Link href={`/product/search/${item.name}`} key={item.id} passHref>
              <MenuItem key={item.id}>{item.name}</MenuItem>
            </Link>
          )) : <MenuItem key='not-found'>Not found</MenuItem>}
        </SearchResultCard>
      )} */}
      {/* {!!resultList.length && (
        <SearchResultCard elevation={2}>
          {products.map((item) => (
            <Link href={`/product/search/${item}`} key={item} passHref>
              <MenuItem key={item}>{item}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )} */}
    </Box>
  );
};

const categories = [
  "All Categories",
  "Car",
  "Clothes",
  "Electronics",
  "Laptop",
  "Desktop",
  "Camera",
  "Toys",
];

const dummySearchResult = [
  "Macbook Air 13",
  "Asus K555LA",
  "Acer Aspire X453",
  "iPad Mini 3",
];

export default SearchBox;
