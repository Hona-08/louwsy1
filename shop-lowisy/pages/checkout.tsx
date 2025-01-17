import { Grid } from "@mui/material";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import SEO from "components/SEO";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CheckoutForm from "pages-sections/checkout/CheckoutForm";
import CheckoutSummary from "pages-sections/checkout/CheckoutSummary";

const Checkout: NextPage = () => {

  let address = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('address')) : {}
  
  return (
    <CheckoutNavLayout>
      <SEO title="Checkout" />
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <CheckoutForm address={address} />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <CheckoutSummary />
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
