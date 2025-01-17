import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Grid, Radio, Stack, TextField, Typography, styled } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { CartItem, useAppContext } from "contexts/AppContext";
import { Formik } from "formik";
import useWindowSize from "hooks/useWindowSize";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { createOrder, getKlarnaUi } from "utils/api/order";
import { getRestaurant } from "utils/api/restaurants";
import * as yup from "yup";
import CashDialog from "./CashDialog";
import CustomizedDialogs from "./Dialog";
import PayPalPayment from "components/PayPalPayment";



export const klarnaHtml = (snippet) => {
  return `
     <html>
     <head> </head>
  
     <body>
     <textarea style="display: none" id="KCO">
              ${snippet}
      </textarea
        >
  
        <div id="my-checkout-container"></div>
  
        <!-- START - Dont edit -->
        <script type="text/javascript">
           var checkoutContainer = document.getElementById(
              "my-checkout-container"
           );
           checkoutContainer.innerHTML = document
              .getElementById("KCO")
              .value.replace(/\\"/g, '"')
              .replace(/\\n/g, "");
           var scriptsTags = checkoutContainer.getElementsByTagName("script");
           for (var i = 0; i < scriptsTags.length; i++) {
              var parentNode = scriptsTags[i].parentNode;
              var newScriptTag = document.createElement("script");
              newScriptTag.type = "text/javascript";
              newScriptTag.text = scriptsTags[i].text;
              parentNode.removeChild(scriptsTags[i]);
              parentNode.appendChild(newScriptTag);
           }
        </script>
        <!-- END -->
     </body>
  </html>
  
     `;
};

const PaymentForm = ({ discount, setDiscount, discountId, setDiscountId }) => {
  const { state } = useAppContext();
  const cartList: CartItem[] = state.cart;
  const { t } = useTranslation("common");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const width = useWindowSize();
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const [openCash, setOpenCash] = useState(false)
  const [htmlSnippet, setHtmlSnippet] = useState('')
  const isMobile = width < 769;

  const restaurantId = cartList.length > 0 ? cartList[0].restaurantId : null;
  const {
    data: restaurantDetails,
    isLoading,
    isFetching,
    isFetched,
  } = useQuery<any>(["get_shop", restaurantId], () => getRestaurant(restaurantId as string), { enabled: Boolean(restaurantId) });

  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  const totalPrice = parseFloat(getTotalPrice().toFixed(2));

  const mutation = useMutation(getKlarnaUi, {
    onSuccess(data) {
      setOpen(true)
      setHtmlSnippet(data.html_snippet)
    },
    onError(err: any) {
      toast.error(err.response.data.message ?? err.response);
    },
  });

  // const paypalMutation = useMutation(, {
  //   onSuccess(data) {
  //   },
  //   onError(err: any) {
  //     toast.error(err.response.data.message ?? err.response);
  //   },
  // });

  const handleFormSubmit = async (e: any) => {
    //router.push("/payment");
    e.preventDefault();

    if (paymentMethod === "klarna") {
      mutation.mutate({
        purchase_country: 'AT',
        purchase_currency: 'EUR',
        locale: typeof window !== 'undefined' ? localStorage.getItem('lang') : 'de',
        order_amount: getTotalPrice() * 100,
        order_lines: cartList.map(({ name, qty, price }) => ({
          type: 'physical',
          name,
          quantity: qty,
          unit_price: price * 100,
          tax_rate: 0,
          total_amount: qty * price * 100,
          total_discount_amount: 0,
          total_tax_amount: 0,
        })),
      })
      return;
    }

    if (paymentMethod === "paypal") {
      mutation.mutate({
        purchase_country: 'AT',
        purchase_currency: 'EUR',
        locale: typeof window !== 'undefined' ? localStorage.getItem('lang') : 'de',
        order_amount: getTotalPrice() * 100,
        order_lines: cartList.map(({ name, qty, price }) => ({
          type: 'physical',
          name,
          quantity: qty,
          unit_price: price * 100,
          tax_rate: 0,
          total_amount: qty * price * 100,
          total_discount_amount: 0,
          total_tax_amount: 0,
        })),
      })
      return;
    }

    const data = {
      totalCost: getTotalPrice(),
      paymentMethod: paymentMethod === "cash" ? "Collect" : paymentMethod,
      cartList,
      discountId,
      address: JSON.parse(localStorage.getItem('address'))
    };

    await createMutation.mutate(data);
    //localStorage.removeItem('address')
    setOpenCash(true)
  };

  const createMutation = useMutation((data: any) => createOrder(data), {
    onSuccess(data) {
      localStorage.removeItem("cart");
      localStorage.removeItem('discountId')
      toast.success("Order Placed Successfully");
    },
    onError(err: any) {
      //console.log(err);
    },
  });

  const handlePaymentMethodChange = ({ target: { name } }: any) => {
    setPaymentMethod(name);
    // if(name === 'klarna'){
    //   mutation.mutate()
    // }
  };

  const body = {}

  useEffect(() => {
    if (!localStorage.getItem('cart')) {
      setTimeout(() => {
        router.push('/orders')
      }, 1000)
    }
  }, [open, openCash])

  return (
    <Fragment>
      <form onSubmit={handleFormSubmit}>
        <Card1 sx={{ mb: 4 }}>
          {/* <FormControlLabel
            name="klarna"
            sx={{ mb: 3 }}
            disabled
            onChange={handlePaymentMethodChange}
            label={
              <Paragraph fontWeight={600}>{t("pay-with-klarna")}</Paragraph>
            }
            control={
              <Radio
                checked={paymentMethod === "klarna"}
                color="primary"
                size="small"
              />
            }
          />

          <Divider sx={{ mb: 3, mx: -4 }} /> */}

          <FormControlLabel
            name="paypal"
            sx={{ mb: 3 }}
            onChange={handlePaymentMethodChange}
            label={
              <Paragraph fontWeight={600}>{t("pay-with-paypal")}</Paragraph>
            }
            control={
              <Radio
                checked={paymentMethod === "paypal"}
                color="primary"
                size="small"
              />
            }
          />

          <Divider sx={{ mb: 3, mx: -4 }} />


          <FormControlLabel
            name="cash"
            onChange={handlePaymentMethodChange}
            label={
              <Paragraph fontWeight={600}>{t("cash-on-delivery")}</Paragraph>
            }
            control={
              <Radio
                checked={paymentMethod === "cash"}
                color="primary"
                size="small"
              />
            }
          />
        </Card1>

        <Grid container spacing={5}>
          <Grid item sm={6} xs={12}>
            <Link href="/checkout" passHref>
              <Button
                variant="outlined"
                color="primary"
                type="button"
                fullWidth
              >
                {t("back-to-checkout-details")}
              </Button>
            </Link>
          </Grid>
          <Grid item sm={6} xs={12}>
            {paymentMethod == 'cash' ? <LoadingButton
              variant="contained"
              loading={createMutation.isLoading}
              color="primary"
              type="submit"
              fullWidth
              disabled={
                totalPrice >= restaurantDetails?.minimumOrder
                  ? false
                  : true
              }
            >
              {t("place-order")} {paymentMethod && `(${paymentMethod})`}
            </LoadingButton>
              :
              <PayPalPayment discountId={discountId} />
            }
          </Grid>
        </Grid>
      </form>
      {/* <CustomizedDialogs open={open} setOpen={setOpen} htmlSnippet={htmlSnippet} /> */}
      <CashDialog open={openCash} setOpen={setOpenCash} />
    </Fragment>
  );
};

const initialValues = {
  card_no: "",
  name: "",
  exp_date: "",
  cvc: "",
  shipping_zip: "",
  shipping_country: "",
  shipping_address1: "",
  shipping_address2: "",

  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_zip: "",
  billing_country: "",
  billing_address1: "",
  billing_address2: "",
};

const checkoutSchema = yup.object().shape({
  card_no: yup.string(),
  name: yup.string(),
  exp_date: yup.string(),
  cvc: yup.string(),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});

export default PaymentForm;
