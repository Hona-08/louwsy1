/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Favorite, FavoriteBorder, Remove } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import PreviewIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Button, Chip, Divider, styled, useTheme } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import BazaarRating from "components/BazaarRating";
import { FlexBetween, FlexBox } from "components/flex-box";
import LazyImage from "components/LazyImage";
import ProductViewDialog from "components/products/ProductViewDialog";
import { H3, Span } from "components/Typography";
import { CartItem, useAppContext } from "contexts/AppContext";
import Link from "next/link";
import React, { Fragment, useCallback, useState } from "react";

const StyledBazaarCard = styled(BazaarCard)(({ theme }) => ({
  margin: "auto",
  height: "100%",
  display: "flex",
  overflow: "hidden",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  borderRadius: "0px 10px 10px 10px",
  "&:hover": {
    boxShadow: theme.shadows[2],
    "& .controller": { right: 1 },
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: { display: "block" },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  padding: "44px 40px",
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

const HoverWrapper = styled(FlexBetween)(({ theme }) => ({
  top: 0,
  bottom: 0,
  width: 25,
  right: -30,
  height: 120,
  margin: "auto",
  background: "#fff",
  overflow: "hidden",
  borderRadius: "5px",
  position: "absolute",
  flexDirection: "column",
  boxShadow: theme.shadows[2],
  transition: "right 0.3s ease-in-out",
  "& span": {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "10px 0px",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": { cursor: "pointer", background: "#f3f5f9" },
  },
  "& a": {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": { cursor: "pointer", background: "#f3f5f9" },
  },
  "& svg": { fontSize: 18, color: theme.palette.grey[600] },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  zIndex: 11,
  top: "16px",
  left: "0px",
  paddingLeft: 3,
  fontWeight: 600,
  paddingRight: 3,
  fontSize: "10px",
  position: "absolute",
  borderRadius: "0px 50px 50px 0px",
  background: theme.palette.primary.main,
}));

const ContentWrapper = styled(Box)(() => ({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

const ButtonBox = styled(FlexBox)(({ theme }) => ({
  gap: 10,
  marginTop: "15px",
  justifyContent: "space-between",
  "& button": {
    color: "#fff",
    background: theme.palette.primary.main,
    "&:hover": { background: theme.palette.primary[400] },
  },
}));

// =============================================================
type ProductCard14Props = {
  off: number;
  title: string;
  price: number;
  imgUrl: string;
  rating?: number;
  id: string | number;
  hideRating?: boolean;
  hoverEffect?: boolean;
};
// =============================================================

const ProductCard14: React.FC<ProductCard14Props> = (props) => {
  const { off, id, title, price, imgUrl, rating, hideRating, hoverEffect } =
    props;

  const { palette } = useTheme();
  const { state, dispatch } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);

  const cartItem: CartItem | undefined = state.cart.find(
    (item) => item.id === id
  );

  const handleCartAmountChange = useCallback(
    (amount) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: { price, imgUrl, id, name: title, qty: amount },
      });
    },
    []
  );

  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {off !== 0 && (
          <StyledChip color="primary" size="small" label={`${off}% off`} />
        )}

        <ImageBox>
          <Link href={`/product/${id}`}>
            <a>
              <LazyImage
                alt={title}
                src={imgUrl}
                width={190}
                height={190}
                layout="responsive"
                objectFit="contain"
              />
            </a>
          </Link>

          <HoverWrapper className="controller">
            <Span onClick={toggleDialog}>
              <PreviewIcon />
            </Span>

            <Divider orientation="horizontal" flexItem />

            <Span onClick={toggleIsFavorite}>
              {isFavorite ? (
                <Favorite color="primary" fontSize="small" />
              ) : (
                <FavoriteBorder fontSize="small" color="primary" />
              )}
            </Span>

            <Divider orientation="horizontal" flexItem />

            <Span
              onClick={handleCartAmountChange(
                cartItem?.qty ? cartItem.qty - 1 : 1
              )}
            >
              <ShoppingCartIcon />
            </Span>
          </HoverWrapper>
        </ImageBox>
      </ImageWrapper>

      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{ title, price, id, imgGroup: [imgUrl, imgUrl] }}
      />

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          <Link href={`/product/${id}`}>
            <a>
              <H3
                mb={1}
                title={title}
                fontSize="14px"
                // textAlign="left"
                fontWeight="600"
                className="title"
                color="text.secondary"
              >
                {title}
              </H3>
            </a>
          </Link>

          {!hideRating && (
            <Box display="flex" alignItems="center">
              <BazaarRating value={rating || 0} color="warn" readOnly />{" "}
              <Span sx={{ color: palette.grey[600] }}>{`(${rating}.0)`}</Span>
            </Box>
          )}

          <FlexBox gap={1} alignItems="center" mt={0.5}>
            <Box fontWeight="600" color="primary.main">
            €{(price - (price * off) / 100).toFixed(2)}
            </Box>

            {off !== 0 && (
              <Box color="grey.600" fontWeight="600">
                <del>{price?.toFixed(2)}</del>
              </Box>
            )}
          </FlexBox>
        </Box>

        <ButtonBox>
          <Button
            variant="contained"
            sx={{ py: "3px", width: "100%", fontSize: "13px" }}
            onClick={handleCartAmountChange(
              cartItem?.qty ? cartItem.qty - 1 : 1
            )}
          >
            {cartItem?.qty ? (
              <Fragment>
                <Remove /> Remove from Cart
              </Fragment>
            ) : (
              <Fragment>
                <Add /> Add to Cart
              </Fragment>
            )}
          </Button>

          <Button variant="contained" sx={{ p: "3px 8px" }}>
            <FavoriteIcon sx={{ fontSize: "16px" }} />
          </Button>
        </ButtonBox>
      </ContentWrapper>
    </StyledBazaarCard>
  );
};

export default ProductCard14;
