import { Grid } from "@mui/material";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PaymentForm from "pages-sections/payment/PaymentForm";
import PaymentSummary from "pages-sections/payment/PaymentSummary";
import { useState } from "react";

const Checkout: NextPage = () => {
  const [discount, setDiscount] = useState(0)
  const [discountId, setDiscountId] = useState('')
  return (
    <CheckoutNavLayout>
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <PaymentForm discount={discount} setDiscount={setDiscount} discountId={discountId} setDiscountId={setDiscountId} />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <PaymentSummary discount={discount} setDiscount={setDiscount} discountId={discountId} setDiscountId={setDiscountId} />
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["footer", "common"])),
  },
});

export default Checkout;
