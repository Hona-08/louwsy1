import Person from "@mui/icons-material/Person";
import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import LoadingScreen from "components/loading-screen";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import { format } from "date-fns";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getCustomer } from "utils/api/customer-auth";

const Profile = () => {
  const { t } = useTranslation("common");
  const { data: customer, isFetching } = useQuery<any>(
    ["get_customer_detail"],
    getCustomer
  );

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Person}
        title={t("My-Profile")}
        navigation={<CustomerDashboardNavigation />}
        button={
          <Link href="/profile/edit" passHref>
            <Button color="primary" sx={{ px: 4, bgcolor: "primary.light" }}>
              {t("Edit-Profile")}
            </Button>
          </Link>
        }
      />
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Card
              sx={{
                display: "flex",
                p: "14px 32px",
                height: "100%",
                alignItems: "center",
              }}
            >
              <Avatar src="" sx={{ height: 64, width: 64 }} />

              <Box ml={1.5} flex="1 1 0">
                <FlexBetween flexWrap="wrap">
                  <div>
                    <H5 my="0px">{customer?.name}</H5>
                  </div>
                </FlexBetween>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <TableRow sx={{ p: "0.75rem 1.5rem", mb: 10 }}>
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            {t("First-Name")}
          </Small>
          <span>{customer?.name?.split(" ")[0]}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            {t("Last-Name")}
          </Small>
          <span>{customer?.name?.split(" ")[1]}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            Email
          </Small>
          <span>{customer?.email}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            {t("Phone")}
          </Small>
          <span>{customer?.phone}</span>
        </FlexBox>{" "}
      </TableRow>
    </CustomerDashboardLayout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default Profile;


