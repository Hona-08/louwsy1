import {
  Alert,
  Button,
  Checkbox,
  DialogTitle,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import BazaarButton from "components/BazaarButton";
import BazaarTextField from "components/BazaarTextField";
import { FlexBox } from "components/flex-box";
import { H2, H3, H6, Small } from "components/Typography";
import { topRatedList } from "fake-db/server/market-1/market-1-data";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Wrapper } from "pages-sections/sessions/Login";
import EyeToggleButton from "pages-sections/sessions/EyeToggleButton";
import CloseIcon from "@mui/icons-material/Close";
import { saveRecommendedRestaurant } from "utils/api/sheet";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const RecommendRestaurant = ({ setDialogOpen }) => {
  const { t } = useTranslation("common");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState();
  const [isVerified, setIsVerified] = useState(false);
  function onChange(value) {
    if (values) {
      setIsVerified(true);
    }
  }

  const mutation = useMutation(
    (values: any) => saveRecommendedRestaurant(values),
    {
      onSuccess(data) {
        toast.success(data.message);
        setDialogOpen(false);
      },
      onError(err: any) {
        setError(err.response.data.message ?? err.response);
        //enqueueSnackbar(err.response.data.message ?? err.message);
      },
    }
  );

  const handleClose = () => {
    setDialogOpen(false);
  };

  function CustomDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 1.5 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 6,
              top: 10,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  const handleFormSubmit = async (values: any) => {
    try {
      mutation.mutate(values);
    } catch (error) {
      setError(error ?? error.response.data.message ?? error.response);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
    <Wrapper
      elevation={3}
      passwordVisibility={passwordVisibility}
      sx={{ backgroundColor: "" }}
    >
      <form onSubmit={handleSubmit}>
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <H3 textAlign="center" mb={1}>
            {t("Recommend-Your-Favorite-Restaurant")}
          </H3>
          <H6 textAlign="center" mb={1}>
            {t("You-will-receive-a-€10-voucher-as-a-gift")}
          </H6>
        </CustomDialogTitle>
        {/* <Small
                    mb={2.5}
                    fontSize={12}
                    display="block"
                    fontWeight={600}
                    color="grey.800"
                    textAlign="center"
                >
                    Please fill all fields
                </Small> */}
        {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : ""}
        <BazaarTextField
          mb={1.5}
          fullWidth
          name="name"
          size="small"
          label={t("Your-Name")}
          variant="outlined"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          placeholder={t("Your-Name")}
          error={!!touched.name && !!errors.name}
          helperText={touched.name && errors.name}
          required
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label={t("Your-email-address")}
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          required
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="restaurantName"
          size="small"
          label={t("Restaurant-name")}
          variant="outlined"
          onBlur={handleBlur}
          value={values.restaurantName}
          onChange={handleChange}
          placeholder={t("Restaurant-name")}
          error={!!touched.restaurantName && !!errors.restaurantName}
          helperText={touched.restaurantName && errors.restaurantName}
          required
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="restaurantEmail"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.restaurantEmail}
          onChange={handleChange}
          label={t("Restaurant-email")}
          placeholder="exmple@mail.com"
          error={!!touched.restaurantEmail && !!errors.restaurantEmail}
          helperText={touched.restaurantEmail && errors.restaurantEmail}
          required
        />

        <ReCAPTCHA
          sitekey="6LfLzVQjAAAAAIDP9ujXtSGBf66lzMRC5lCzI3XY"
          onChange={onChange}
        />

        <BazaarButton
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{ height: 44, mt: 1.5 }}
          disabled={!isVerified || mutation.isLoading}
        >
          {t("Recommend-now")}
        </BazaarButton>
      </form>
    </Wrapper>
  );
};

const initialValues = {
  name: "",
  email: "",
  restaurantName: "",
  restaurantEmail: "",
};

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  restaurantName: yup.string().required("Restaurant Name is required"),
  restaurantEmail: yup
    .string()
    .email("invalid email")
    .required(" Restaurant Email is required"),
});

export default RecommendRestaurant;
