import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import OrderTrackingForm from 'pages-sections/orders/FindMyOrder';
import ShopLayout1 from 'components/layouts/ShopLayout1';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const OrderTrackingPage: React.FC = () => {
    const { t } = useTranslation("common");
    return (
        <ShopLayout1>
            <Container>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    mt={8}
                >
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                {t("find-my-order")}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" mb={2}>
                                {t("enter-your-details")}
                            </Typography>
                            <Grid item xs={12} sm={8} md={6} lg={4} mb={10}>
                                <OrderTrackingForm />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ShopLayout1>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["footer", "common"])),
    },
});

export default OrderTrackingPage;
