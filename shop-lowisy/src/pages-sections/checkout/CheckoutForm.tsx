import { Button, Checkbox, Grid, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers";
import Card1 from "components/Card1";
import { CartItem, useAppContext } from "contexts/AppContext";
import countryList from "data/countryList";
import { Formik } from "formik";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { createOrder, saveShippingAddress } from "utils/api/order";
import { getRestaurant } from "utils/api/restaurants";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import * as yup from "yup";
import { loadLanguages } from "i18next";

const CheckoutForm = ({ address }: any) => {
  const [pickupTime, setPickupTime] = useState(dayjs().add(30, 'minute'));
  const { state } = useAppContext();
  const cartList: CartItem[] = state.cart;

  const router = useRouter();
  const { t } = useTranslation("common");


  const handleFormSubmit = async (values: any) => {
    values.pickupTime = `${pickupTime.hour()}:${pickupTime.minute()}`
    await localStorage.setItem('address', JSON.stringify(values))
    router.push("/payment");
  };

  const initialValues = {
    zipCode: address?.zipCode || "",
    full_name: address?.full_name || "",
    email: address?.email || "",
    phone: address?.phone || "",
    address1: address?.address1 || "",
    address2: address?.address2 || "",
  };

  useEffect(() => {
    JSON.parse(localStorage.getItem('address'))
  }, [])


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1 sx={{ mb: 4 }}>
            <Typography fontWeight="600" mb={2}>
              {t("shipping-address")}
            </Typography>

            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  label={t("Full-Name")}
                  onBlur={handleBlur}
                  name="full_name"
                  onChange={handleChange}
                  value={values.full_name}
                  error={!!touched.full_name && !!errors.full_name}
                  helperText={touched.full_name && errors.full_name}
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  onBlur={handleBlur}
                  label={t("Phone-Number")}
                  onChange={handleChange}
                  name="phone"
                  value={values.phone}
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  type="number"
                  sx={{ mb: 2 }}
                  label={t("zip-code")}
                  name="zipCode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.zipCode}
                  error={!!touched.zipCode && !!errors.zipCode}
                  helperText={touched.zipCode && errors.zipCode}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  sx={{ mb: 2 }}
                  onBlur={handleBlur}
                  name="email"
                  label={t("email-address")}
                  onChange={handleChange}
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  label={t("address-1")}
                  sx={{ mb: 2 }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="address1"
                  value={values.address1}
                  error={!!touched.address1 && !!errors.address1}
                  helperText={touched.address1 && errors.address1}
                  InputLabelProps={{ shrink: true }}
                  required
                />

                <TextField
                  fullWidth
                  label={t("address-2")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="address2"
                  value={values.address2}
                  error={!!touched.address2 && !!errors.address2}
                  helperText={touched.address2 && errors.address2}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>
            <Typography fontWeight="600" my={2}>
              {t("Pick up Time")}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DigitalClock
                value={pickupTime}
                onChange={(newValue: any) => {
                  setPickupTime(newValue)
                }}
              />
            </LocalizationProvider>
          </Card1>

          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart" passHref>
                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  fullWidth
                >
                  {t("back-to-cart")}
                </Button>
              </Link>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                {t("proceed-to-payment")}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

// uncomment these fields below for from validation
const checkoutSchema = yup.object().shape({
  full_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup.string().required("required"),
  zipCode: yup.string().required("required"),
  address1: yup.string().required("required"),
  address2: yup.string(),
});

export default CheckoutForm;
