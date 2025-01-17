/* eslint-disable react-hooks/exhaustive-deps */
//import { Add, Close, Remove } from "@mui/icons-material";
import { Add, Close, Remove } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/system";
import BazaarAvatar from "components/BazaarAvatar";
import BazaarButton from "components/BazaarButton";
import BazaarIconButton from "components/BazaarIconButton";
import { FlexBetween, FlexBox } from "components/flex-box";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import LazyImage from "components/LazyImage";
import LoadingScreen from "components/loading-screen";
import { H5, Tiny } from "components/Typography";
import { CartItem, useAppContext } from "contexts/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getRestaurant, getRestaurantBySlug } from "utils/api/restaurants";
import { lowisy_s3_url } from "utils/constants";
import CloseIcon from "@mui/icons-material/Close";

// =========================================================
type MiniCartProps = {
  toggleSidenav?: () => void;
};
// =========================================================

const MiniCart: React.FC<MiniCartProps> = ({ toggleSidenav }) => {
  const { palette } = useTheme();
  const { state, dispatch } = useAppContext();
  const cartList = state.cart;
  const { query } = useRouter();
  const { id } = query;
  const { t } = useTranslation("common");
  const Caption = styled(Typography)(({ theme }) => ({
    padding: "0.8rem",
    backgroundColor: "#FFF9DF",
    marginBottom: "0.2rem",
  }));

  const StyledFlexBetween = styled(FlexBetween)(({ theme }) => ({
    marginBottom: "0.4rem",
  }));
  const {
    data: restaurantDetails,
    isLoading,
    isFetching,
    isFetched,
  } = useQuery<any>(["get_shop", id], () => getRestaurantBySlug(id as string));

  const { name, minimumOrder, shippingCost } = restaurantDetails;

  const handleCartAmountChange = useCallback(
    (amount, product) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: { ...product, qty: amount },
      });
    },
    []
  );

  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  const totalPrice = parseFloat(getTotalPrice().toFixed(2));

  return (
    <Box width="380px">
      <Box
        overflow="auto"
        height={`calc(100vh - ${!!cartList.length ? "80px - 3.25rem" : "0px"})`}
      >
        <FlexBox
          alignItems="center"
          m="0px 20px"
          height="74px"
          color="secondary.main"
        >
          <ShoppingBagOutlined color="inherit" />
          <Box fontWeight={600} fontSize="16px" ml={1}>
            {cartList.length} {t("item")}
          </Box>

          <IconButton
            aria-label="close"
            onClick={toggleSidenav}
            sx={{
              position: "absolute",
              right: 8,
              top: 16,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </FlexBox>

        <Divider />

        {!!!cartList.length && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 74px)"
          >
            <LazyImage
              src="/assets/images/logos/shopping-bag.svg"
              width={90}
              height={100}
            />
            <Box
              component="p"
              mt={2}
              color="grey.600"
              textAlign="center"
              maxWidth="200px"
            >
              {t("Your-shopping-bag-is-empty.-Start-shopping")}
            </Box>
          </FlexBox>
        )}

        {cartList.map((item: CartItem) => (
          <FlexBox
            py={2}
            px={2.5}
            key={item.id}
            alignItems="center"
            borderBottom={`1px solid ${palette.divider}`}
          >
            <FlexBox alignItems="center" flexDirection="column">
              <BazaarButton
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(item.qty + 1, item)}
                sx={{ height: "32px", width: "32px", borderRadius: "300px" }}
              >
                <Add fontSize="small" sx={{ color: "GrayText" }} />
              </BazaarButton>

              <Box fontWeight={600} fontSize="15px" my="3px">
                {item.qty}
              </Box>

              <BazaarButton
                color="primary"
                variant="outlined"
                disabled={item.qty === 1}
                onClick={handleCartAmountChange(item.qty - 1, item)}
                sx={{ height: "32px", width: "32px", borderRadius: "300px" }}
              >
                <Remove fontSize="small" sx={{ color: "GrayText" }} />
              </BazaarButton>
            </FlexBox>

            <Link href={`/product/${item.id}`}>
              <a>
                <BazaarAvatar
                  mx={2}
                  width={76}
                  height={76}
                  alt={item.name}
                  src={
                    lowisy_s3_url + item.imgUrl ||
                    "/assets/images/products/iphone-x.png"
                  }
                />
              </a>
            </Link>

            <Box flex="1 1 0">
              <Link href={`/product/${item.id}`}>
                <a>
                  <H5 className="title" fontSize="14px">
                    {item.name}
                  </H5>
                </a>
              </Link>

              <Tiny color="grey.600">
                €{item.price.toFixed(2)} x {item.qty}
              </Tiny>

              <Box
                fontWeight={600}
                fontSize="14px"
                color="primary.main"
                mt={0.5}
              >
                €{(item.qty * item.price).toFixed(2)}
              </Box>
            </Box>

            <BazaarIconButton
              ml={2.5}
              size="small"
              onClick={handleCartAmountChange(0, item)}
            >
              <Close fontSize="small" />
            </BazaarIconButton>
          </FlexBox>
        ))}
        <Box p={2.5}>
          {totalPrice >= minimumOrder ? null : (
            <Stack>
              <Caption variant="caption">
                {t("Amount-needed-to-reach-the-minimum-order-value")}{" "}
                {minimumOrder - totalPrice} €
              </Caption>
              <Typography fontSize="0.8rem" padding="0.5rem">
                {t("Sorry,-you-can't-order-yet.")} {name}{" "}
                {t("has-has-set-a-minimum-order-amount-of")} {minimumOrder} €{" "}
                {t("excluding-delivery-cost")}
              </Typography>
            </Stack>
          )}
        </Box>
      </Box>

      {!!cartList.length && (
        <Box p={2.5}>
          <Stack padding="0.5rem">
            {/* <StyledFlexBetween>
              <Typography>Subtotal</Typography>
              <Typography>{totalPrice} €</Typography>
            </StyledFlexBetween> */}
            {/* <StyledFlexBetween>
              <Typography>Shipping Cost</Typography>
              <Typography>{shippingCost} €</Typography>
            </StyledFlexBetween> */}
            <StyledFlexBetween>
              <Typography fontWeight="bold">{t("total")}</Typography>
              <Typography fontWeight="bold">{totalPrice} €</Typography>
            </StyledFlexBetween>
          </Stack>
          <Link href="/checkout" passHref>
            <BazaarButton
              fullWidth
              color="primary"
              variant="contained"
              sx={{ mb: "0.75rem", height: "40px" }}
              onClick={toggleSidenav}
              disabled={totalPrice >= minimumOrder ? false : true}
            >
              {t("checkout-now")}(€{totalPrice})
            </BazaarButton>
          </Link>

          {/* <Link href="/cart" passHref>
            <BazaarButton
              fullWidth
              color="primary"
              variant="contained"
              sx={{ height: 40 }}
              onClick={toggleSidenav}
            >
              View Cart
            </BazaarButton>
          </Link> */}
        </Box>
      )}
    </Box>
  );
};

MiniCart.defaultProps = {
  toggleSidenav: () => {},
};

export default MiniCart;
