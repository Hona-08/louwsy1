import { Container, Grid } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Navigations from "./Navigations";

/**
 *  Used in:
 *  1. wish-list page
 *  2. address and address-details page
 *  3. orders and order-details page
 *  4. payment-methods and payment-method-details page
 *  5. profile and edit profile page
 *  6. support-tickets page
 */

const CustomerDashboardLayout: React.FC = ({ children }) => (
  <ShopLayout1>
    <Container sx={{ my: "2rem" }}>
      <Grid container spacing={3}>
        <Grid
          item
          md={3}
          lg={3}
          xs={12}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <Navigations />
        </Grid>

        <Grid item lg={9} xs={12} md={9}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </ShopLayout1>
);


export default CustomerDashboardLayout;
