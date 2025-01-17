import { Box, Divider, Stack, Typography, styled, Alert, Button, TextField } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
import { useAppContext, CartItem } from "contexts/AppContext";
import { useShoppingCart } from "contexts/ShoppingCartContext";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { getRestaurant, getVoucherCode } from "utils/api/restaurants";

const Caption = styled(Typography)(({ theme }) => ({
  padding: "0.8rem",
  backgroundColor: "#FFF9DF",
  marginBottom: "0.2rem",
}));

const PaymentSummary = ({ discount, setDiscount, discountId, setDiscountId }) => {
  const { state } = useAppContext();
  const [error, setError] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const cartList: CartItem[] = state.cart;
  const { t } = useTranslation("common");

  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  const restaurantId = cartList.length > 0 ? cartList[0].restaurantId : null;
  const {
    data: restaurantDetails,
  } = useQuery<any>(["get_shop", restaurantId], () => getRestaurant(restaurantId as string), { enabled: Boolean(restaurantId) });

  const address = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('address')) : ''

  const mutation = useMutation((voucherCode: any) => getVoucherCode(voucherCode, restaurantId, address?.email), {
    onSuccess(data) {
      setError(null)
      setDiscount(data?.amount)
      setDiscountId(data?.id)
      localStorage.setItem('discountId', discountId)
    },
    onError(err: any) {
      setError(err.response.data.message ?? err.response);
    },
  });

  const handleVoucher = () => {
    mutation.mutate(voucherCode)
  }



  const totalPrice = parseFloat(getTotalPrice().toFixed(2));

  return (
    <Box>
      {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : ""}
      <TextField
        fullWidth
        size="small"
        label="Voucher"
        variant="outlined"
        placeholder="Voucher"
        onChange={(event: any) => {
          setVoucherCode(event.target.value)
          setError('')
        }}
      />

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 2, mb: 4 }}
        onClick={handleVoucher}
      >
        Apply Voucher
      </Button>
      <Paragraph color="secondary.900" fontWeight={700} mb={2}>
        {t("your-order")}
      </Paragraph>


      {cartList.map((item: CartItem) => (
        <FlexBetween mb={1.5} key={item.name}>
          <Paragraph>
            <Span fontWeight="700" fontSize="14px">
              {item.qty}
            </Span>{" "}
            x {item.name}
          </Paragraph>
          <Paragraph>€{item.price.toFixed(2)}</Paragraph>
        </FlexBetween>
      ))}
      <Divider sx={{ borderColor: "grey.300", mb: 1 }} />

      <Box p={1}>
        {totalPrice >= restaurantDetails?.minimumOrder ? null : (
          <Stack>
            <Caption variant="caption">
              {t("Amount-needed-to-reach-the-minimum-order-value")}{" "}
              {restaurantDetails?.minimumOrder - totalPrice} €
            </Caption>
            <Typography fontSize="0.8rem" padding="0.5rem">
              {t("Sorry,-you-can't-order-yet.")} {restaurantDetails?.name}{" "}
              {t("has-has-set-a-minimum-order-amount-of")} {restaurantDetails?.minimumOrder} €{" "}
              {t("excluding-delivery-cost")}
            </Typography>
          </Stack>
        )}
      </Box>

      <FlexBetween fontWeight="700" mb={1}>
        <Paragraph>{t("subtotal")}:</Paragraph>
        <Paragraph fontWeight="700">€{totalPrice}</Paragraph>
      </FlexBetween>

      <FlexBetween fontWeight="700" mb={1}>
        <Paragraph>{t("discount")}:</Paragraph>
        <Paragraph fontWeight="700">- €{mutation?.data?.amount ?? 0}</Paragraph>
      </FlexBetween>

      <Divider sx={{ borderColor: "grey.300", mb: 1 }} />


      <FlexBetween fontWeight="700" mb={1}>
        <Paragraph></Paragraph>
        <Paragraph fontWeight="700"> €{totalPrice - (mutation?.data?.amount ?? 0)}</Paragraph>
      </FlexBetween>

    </Box>
  );
};


export default PaymentSummary;
