import {
  Delete,
  Done,
  KeyboardArrowDown,
  ShoppingBag,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import Delivery from "components/icons/Delivery";
import PackageBox from "components/icons/PackageBox";
import TruckFilled from "components/icons/TruckFilled";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import LoadingScreen from "components/loading-screen";
import TableRow from "components/TableRow";
import { H5, H6, Paragraph, Span } from "components/Typography";
import productDatabase from "data/product-database";
import { format } from "date-fns";
import useLocales from "hooks/useLocales";
import useWindowSize from "hooks/useWindowSize";
import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getOrder } from "utils/api/order";
import axios from "utils/axios";
import { lowisy_s3_url } from "utils/constants";
import { string } from "yup/lib/locale";

const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: { flexDirection: "column" },

  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    [theme.breakpoints.down("sm")]: { flex: "unset", height: 50, minWidth: 4 },
  },
}));


const OrderDetails = ({ params }) => {
  const { t } = useTranslation("common");
  const { translate } = useLocales();
  const { query } = useRouter();

  const { id: orderId } = query;

  const {
    data: order,
    isFetching,
    isError,
  } = useQuery<any>(["order_details", orderId], () => getOrder(orderId as string), {
    enabled: Boolean(orderId),
  });

  const width = useWindowSize();
  const theme = useTheme();
  const breakpoint = 350;

  if (!order) {
    return <LoadingScreen />
  }

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={ShoppingBag}
        title="Order Details"
        navigation={<CustomerDashboardNavigation />}
      // button={
      //   <Button color="primary" sx={{ bgcolor: "primary.light", px: 4 }}>
      //     {t("order-again")}
      //   </Button>
      // }
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <FlexBox alignItems="center" gap={4}>
              <Paragraph>
                <Span color="grey.600">{t("order-id")}</Span> {orderId}
              </Paragraph>

              <Paragraph>
                <Span color="grey.600">{t("placed-on")}:</Span>{" "}
                {new Date(order?.createdAt).toLocaleString()}
              </Paragraph>
            </FlexBox>

            {order?.inputDetails &&
              order?.inputDetails.map((item: any, index: any) => (
                <Box
                  my={2}
                  gap={2}
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
                  }}
                >
                  <FlexBox flexShrink={0} gap={1.5} alignItems="center">
                    <Avatar
                      src={lowisy_s3_url + item.imgUrl}
                      sx={{ height: 64, width: 64, borderRadius: "8px" }}
                    />

                    <Box>
                      <H6 mb={1}>{item.name}</H6>

                      <FlexBox alignItems="center" gap={1}>
                        <Paragraph fontSize={14} color="grey.600">
                          {item.price} x
                        </Paragraph>

                        <Box maxWidth={60}>
                          <TextField
                            defaultValue={item.qty}
                            type="number"
                            fullWidth
                            disabled
                          />
                        </Box>
                      </FlexBox>
                    </Box>
                  </FlexBox>

                  <FlexBetween flexShrink={0}>
                    <Paragraph color="grey.600">
                      {/* Product properties: Black, L */}
                    </Paragraph>

                    <IconButton>
                      {/* <Delete sx={{ color: "grey.600", fontSize: 22 }} /> */}
                    </IconButton>
                  </FlexBetween>
                </Box>
              ))}
          </Card>
        </Grid>

        <Grid item md={6} xs={12} >
          <Card sx={{ px: 2, py: 2 }}>
            <TextField
              rows={5}
              multiline
              fullWidth
              color="primary"
              variant="outlined"
              label="Shipping Address"
              defaultValue={order?.shippingAddress ? `${order?.shippingAddress?.address1} ${order?.shippingAddress?.address2}` : ''}
              sx={{ mb: 1 }}
            // disabled
            />

            {/* <TextField
              rows={5}
              multiline
              fullWidth
              color="info"
              variant="outlined"
              label="Customer’s Note"
              defaultValue="Please deliver ASAP."
              disabled
            /> */}
          </Card>
        </Grid>

        <Grid item md={6} xs={12}>
          <Card sx={{ px: 3, py: 2 }}>

            <FlexBetween mb={2}>
              <H6>{t("total")}</H6>
              <H6>€{order?.totalCost}</H6>
            </FlexBetween>

            <Paragraph>{t("paid-by")} {" "} {order?.paypalOrderId ? 'PayPal' : 'Cash'}</Paragraph>
          </Card>
        </Grid>

        {/* <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" color="primary" disabled>
            {t("save-changes")}
          </Button>
        </Grid> */}
      </Grid>
    </CustomerDashboardLayout>
  );
};


// export const getServerSideProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale ?? "en", ["common"])),
//     revalidate: 10
//   },
// });

export async function getStaticProps({ locale }) {
  const res = await axios.get('/api/customers/all-order-id');

  const id = res.data.data.map(id => id)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      restaurants: id,
      revalidate: 10
    },

    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    //revalidate: 10, // In seconds
  }
}


export const getStaticPaths = async ({ params }) => {

  const response = await axios.get('/api/customers/all-order-id');

  return {
    paths: response.data.data.map(id => {
      return ([{
        params: {
          id: id
        },
        locale: 'en'
      },
      {
        params: {
          id: id
        },
        locale: 'de'
      }])
    }).flat(),
    fallback: 'blocking', //indicates the type of fallback
  };
}

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale ?? "en", ["common"])),
//   },
// });


export default OrderDetails;
