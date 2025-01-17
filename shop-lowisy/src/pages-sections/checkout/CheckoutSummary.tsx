import { Box, Divider } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
import { useAppContext, CartItem } from "contexts/AppContext";
import { useShoppingCart } from "contexts/ShoppingCartContext";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useTranslation } from "react-i18next";

const CheckoutSummary = () => {
  const { state } = useAppContext();
  const cartList: CartItem[] = state.cart;
  const { t } = useTranslation("common");

  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  const totalPrice = parseFloat(getTotalPrice().toFixed(2));

  return (
    <Box>
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

      <FlexBetween fontWeight="700" mb={1}>
        <Paragraph>{t("Total")}:</Paragraph>
        <Paragraph fontWeight="700">€{totalPrice}</Paragraph>
      </FlexBetween>
    </Box>
  );
};


export default CheckoutSummary;
