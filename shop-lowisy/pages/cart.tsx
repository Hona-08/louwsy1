import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
  Alert,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import ShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MenuItem from "@mui/material/MenuItem";
import { FlexBetween, FlexBox } from "components/flex-box";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import ProductCard7 from "components/product-cards/ProductCard7";
import SEO from "components/SEO";
import { H2, H3, Span } from "components/Typography";
import { CartItem, useAppContext } from "contexts/AppContext";
import { useShoppingCart } from "contexts/ShoppingCartContext";
import countryList from "data/countryList";
import { useLocalStorage } from "hooks/useLocalStorage";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { getRestaurant, getVoucherCode } from "utils/api/restaurants";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const Caption = styled(Typography)(({ theme }) => ({
  padding: "0.8rem",
  backgroundColor: "#FFF9DF",
  marginBottom: "0.2rem",
}));
const StyledH2 = styled(H2)(({ theme }) => ({
  padding: "0.8rem",

  marginBottom: "0.2rem",
  fontWeight: "normal",
  textAlign: "center",
}));
const StyledH3 = styled(H2)(({ theme }) => ({
  padding: "0.8rem",

  marginBottom: "0.2rem",
  fontWeight: "normal",
  textAlign: "center",
}));

const Cart: NextPage = () => {
  const { state } = useAppContext();
  const { t } = useTranslation("common");
  const cartList: CartItem[] = state.cart;
  const restaurantId = cartList.length > 0 ? cartList[0].restaurantId : null;
  const { data: restaurantDetails } = useQuery<any>(
    ["get_shop", restaurantId],
    () => getRestaurant(restaurantId as string),
    { enabled: Boolean(restaurantId) }
  );



  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  const totalPrice = parseFloat(getTotalPrice().toFixed(2));

  return (
    <CheckoutNavLayout>
      <SEO title="Cart" />
      <Grid container spacing={3} alignItems="center">
        <Grid item md={8} xs={12}>
          {cartList?.map((item) => (
            <ProductCard7 key={item.id} {...item} />
          ))}
          {!restaurantId && (
            <Card sx={{ padding: 5 }}>
              <Box p={2} sx={{ bgcolor: "white" }}>
                <Stack>
                  <StyledH2>{t("your-shopping-cart-is-empty")} </StyledH2>
                  <Box textAlign="center">
                    <ShoppingCartIcon fontSize="large" />
                  </Box>
                  <Box textAlign="center">
                    <Link href="/restaurants" passHref>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          color: "white",
                          mt: 2,
                          width: {
                            lg: "40%",
                            md: "40%",
                            sm: "40%",
                            xs: "100%",
                          },
                          padding: 1,
                        }}
                      >
                        {t("continue-shopping")}
                      </Button>
                    </Link>
                  </Box>
                </Stack>
              </Box>
            </Card>
          )}
        </Grid>

        <Grid item md={4} xs={12}>
          <Card sx={{ padding: 3 }}>
            <FlexBetween mb={2}>
              <Span color="grey.600">{t("Total")}:</Span>

              <Span fontSize={18} fontWeight={600} lineHeight="1">
                €{getTotalPrice().toFixed(2)}
              </Span>
            </FlexBetween>
          
            <Box p={1}>
              {totalPrice >= restaurantDetails?.minimumOrder ? null : (
                <Stack>
                  <Caption variant="caption">
                    {t("Amount-needed-to-reach-the-minimum-order-value")}{" "}
                    {restaurantDetails?.minimumOrder - totalPrice} €
                  </Caption>
                  <Typography fontSize="0.8rem" padding="0.5rem">
                    {t("Sorry,-you-can't-order-yet.")} {restaurantDetails?.name}{" "}
                    {t("has-has-set-a-minimum-order-amount-of")}{" "}
                    {restaurantDetails?.minimumOrder} €{" "}
                    {t("excluding-delivery-cost")}
                  </Typography>
                </Stack>
              )}
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Link href="/checkout" passHref>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={
                  totalPrice >= restaurantDetails?.minimumOrder ? false : true
                }
              >
                {t("checkout-now")}
              </Button>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

const stateList = [
  { value: "new-york", label: "New York" },
  { value: "chicago", label: "Chicago" },
];

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["footer", "common"])),
  },
});

export default Cart;

