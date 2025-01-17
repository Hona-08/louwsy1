/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Favorite, Remove, RemoveRedEye } from "@mui/icons-material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  IconButton,
  styled,
} from "@mui/material";
import BazaarCard from "components/BazaarCard";
import BazaarRating from "components/BazaarRating";
import LazyImage from "components/LazyImage";
import ProductViewDialog from "components/products/ProductViewDialog";
import { H3, H5, Span } from "components/Typography";
import { CartItem, useAppContext } from "contexts/AppContext";
import { useShoppingCart } from "contexts/ShoppingCartContext";
import Link from "next/link";
import { CSSProperties, FC, Fragment, useCallback, useState } from "react";
import { myLoader } from "utils/constants";
import { FlexBetween, FlexBox } from "../flex-box";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useQuery } from "react-query";
import { getProduct } from "utils/api/products";
import ProductDetailsDialog from "components/products/ProductDetailsDialog";
import BazaarButton from "components/BazaarButton";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

// const StyledBazaarCard = styled(BazaarCard)(() => ({
//   height: "100%",
//   margin: "auto",
//   display: "flex",
//   overflow: "hidden",
//   borderRadius: "8px",
//   position: "relative",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   transition: "all 250ms ease-in-out",
//   ":hover": { "& .hover-box": { opacity: 1 } },
// }));

const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: { display: "block" },
}));

const StyledChip = styled(Chip)(() => ({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
}));
const AddToCartBtn = styled(Button)(() => ({
  height: 32,
  color: "white",
  fontWeight: "normal",
}));

const HoverIconWrapper = styled(Box)(({ theme }) => ({
  zIndex: 2,
  top: "7px",
  opacity: 0,
  right: "15px",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
}));

const ContentWrapper = styled(Box)(() => ({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

// ========================================================
type ProductCard1Props = {
  off?: number;
  title: string;
  name?: string;
  productImages?: any[];
  price: number;
  imgUrl: string;
  rating?: number;
  discount?: number;
  restaurantId: any;
  className?: string;
  id: string;
  hideRating?: boolean;
  hoverEffect?: boolean;
  style?: CSSProperties;
  showProductSize?: boolean;
  shortDescription: string;
};
// ========================================================

const ProductCardList1: FC<ProductCard1Props> = ({
  id,
  title,
  price,
  imgUrl,
  restaurantId,
  hideRating,
  hoverEffect,
  showProductSize,
  shortDescription,
}) => {
  const { t } = useTranslation("common");
  const { state, dispatch } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
  const router = useRouter();
  const [dialogOpenProductDetail, setDialogOpenProductDetail] = useState(false);
  const toggleProductDetail = () => {
    setDialogOpenProductDetail(!dialogOpenProductDetail);
  };

  const { data: product, isFetched } = useQuery<any>(
    ["get_product_detail", id],
    () => getProduct(id),
    {
      onSuccess(data) {
        //setFilterValues({})
      },
    }
  );

  const cartItem: CartItem | undefined = state.cart?.find(
    (item) => item.id === id
  );

  const handleCartAmountChange = useCallback(
    (product) => () =>
      dispatch({ type: "CHANGE_CART_AMOUNT", payload: product }),
    []
  );

  return (
    <Card
      sx={{
        display: { xs: "flex", sm: "flex", md: "flex" },
        padding: "5px",
        cursor: "pointer",
      }}
    >
      {/* <Link href={`/product/${id}`}> */}
      <Box sx={{ width: { md: "200px", sm: "150px", xs: "150px" } }}>
        <CardActionArea>
          {/* <CardMedia
              component="img"
              height="194"
              image={imgUrl}
              alt="Paella dish"
              sx={{
                width: "full",
                height: "full",
                objectFit: "cover",
              }}
            /> */}
          <LazyImage
            src={imgUrl}
            width={0}
            height={0}
            layout="responsive"
            alt={title}
            loader={myLoader}
            sx={{
              width: "full",
              height: "full",
              objectFit: "cover",
            }}
          />
        </CardActionArea>
      </Box>
      {/* </Link> */}

      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{ title, price, id, imgGroup: [imgUrl, imgUrl] }}
      />

      <CardContent sx={{ ml: { md: "20px" } }}>
        <FlexBox>
          <Link href={`/product/${id}`}>
            <a>
              <H3
                mb={1}
                title={title}
                fontSize="14px"
                fontWeight="600"
                className="title"
                color="text.secondary"
              >
                {title}
              </H3>
            </a>
          </Link>

          <Box>
            <Dialog
              open={dialogOpenProductDetail}
              scroll="paper"
              //fullWidth={isMobile}
              sx={{
                mt: { lg: "-10rem", sm: "-4rem", md: "-4rem", xs: "0rem" },

                width: { xs: "100vw" },
                height: { xs: "100vh" },
              }}
              onClose={toggleProductDetail}
            // sx={{ padding: 10 }}
            >
              {isFetched && (
                <ProductDetailsDialog
                  setDialogOpen={setDialogOpenProductDetail}
                  product={product}
                />
              )}
            </Dialog>
          </Box>
          <InfoOutlinedIcon
            onClick={toggleProductDetail}
            sx={{ mt: "0.5px", mb: "2px", ml: "5px", fontSize: "20px" }}
          />
        </FlexBox>

        {showProductSize && (
          <Span color="grey.600" mb={1} display="block">
            300ml
          </Span>
        )}

        <FlexBox alignItems="center" gap={1} mt={0.2}>
          <Box fontWeight="600" color="primary.main">
            €{price.toFixed(2)}
          </Box>
        </FlexBox>
        <FlexBox alignItems="center" gap={1} mt={0.5}>
          <Box fontWeight="600" color="grey">
            {shortDescription}
          </Box>
        </FlexBox>
        <FlexBox mt={1.5}>
          {!cartItem?.qty && (
            <AddToCartBtn
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange({
                id,
                price,
                imgUrl,
                name: title,
                qty: (cartItem?.qty || 0) + 1,
                restaurantId,
              })}
            >
              {router.locale === "en" ? t("add-to-cart") : t("add")}
            </AddToCartBtn>
          )}
          {!!cartItem?.qty && (
            <FlexBetween>
              <Button
                color="primary"
                variant="outlined"
                sx={{ padding: "3px" }}
                onClick={handleCartAmountChange({
                  id,
                  price,
                  imgUrl,
                  name: title,
                  qty: (cartItem?.qty || 0) + 1,
                  restaurantId,
                })}
              >
                <Add fontSize="small" />
              </Button>
              <H5 fontWeight="600" fontSize="15px" mx={1.5}>
                {cartItem.qty}
              </H5>
              <Button
                color="primary"
                variant="outlined"
                sx={{ padding: "3px" }}
                onClick={handleCartAmountChange({
                  id,
                  price,
                  imgUrl,
                  name: title,
                  qty: (cartItem?.qty || 0) - 1,
                  restaurantId,
                })}
              >
                <Remove fontSize="small" />
              </Button>
            </FlexBetween>
          )}
        </FlexBox>
      </CardContent>
    </Card>
  );
};

export default ProductCardList1;
