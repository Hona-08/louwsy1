import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import BazaarButton from "components/BazaarButton";
import BazaarTextField from "components/BazaarTextField";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { H3, H6, Small } from "components/Typography";
import { topRatedList } from "fake-db/server/market-1/market-1-data";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as yup from "yup";
import EyeToggleButton from "./EyeToggleButton";
import { Wrapper } from "./Login";
import SocialButtons from "./SocialButtons";
import toast from "react-hot-toast";
import { Box, styled } from "@mui/system";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { useTranslation } from "react-i18next";
import PrivacyPolicyDialog from "components/PrivacyPolicyDialog";
import TermsAndConditions from "components/TermsAndConditions";

const Signup = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [dialogOpenTermsAndConditions, setDialogOpenTermsAndConditions] =
    useState(false);
  const toggleDialogPolicy = () =>
    setDialogOpenTermsAndConditions(!dialogOpenTermsAndConditions);
  const [error, setError] = useState();
  const { register, isAuthenticated } = useAuth();
  const { t } = useTranslation("common");
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const mutation = useMutation(
    (values: any) =>
      register(values.name, values.phone, values.email, values.password),
    {
      onSuccess(data) {
        toast.success("Please verify your email to login.");
        //router.push("/login");
      },
      onError(err: any) {
        setError(err.response.data.message ?? err.response);
        //enqueueSnackbar(err.response.data.message ?? err.message);
      },
    }
  );

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.back();
  //   }
  // }, [isAuthenticated]);

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
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <H3 textAlign="center" mb={1}>
          {t("Create-Your-Account")}
        </H3>
        <Small
          mb={4.5}
          fontSize={12}
          display="block"
          fontWeight={600}
          color="grey.800"
          textAlign="center"
        >
          {t("Please-fill-all-fields-to-continue")}
        </Small>
        {error ? (
          <Alert
            severity="error"
            sx={{
              mb: "1rem",
            }}
          >
            {error}
          </Alert>
        ) : (
          ""
        )}
        <BazaarTextField
          mb={1.5}
          fullWidth
          name="name"
          size="small"
          label={t("Full-Name")}
          variant="outlined"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          placeholder="Ralph Adwards"
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
          label="Email"
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          required
        />
        <BazaarTextField
          mb={1.5}
          fullWidth
          name="phone"
          size="small"
          type="phone"
          variant="outlined"
          onBlur={handleBlur}
          value={values.phone}
          onChange={handleChange}
          label={t("Phone-Number")}
          placeholder="+977-9861004874"
          error={!!touched.phone && !!errors.phone}
          helperText={touched.phone && errors.phone}
        />
        <BazaarTextField
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label={t("Password")}
          variant="outlined"
          autoComplete="on"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          required
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />
        <BazaarTextField
          fullWidth
          size="small"
          autoComplete="on"
          name="re_password"
          variant="outlined"
          label={t("Re-enter-Password")}
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
          required
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />
        <FormControlLabel
          name="agreement"
          className="agreement"
          onChange={handleChange}
          required
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={values.agreement || false}
            />
          }
          label={
            <FlexBox
              //flexWrap="wrap"
              //alignItems="center"
              justifyContent="flex-start"
            >
              {t("By-signing-up,-you-agree-to")}
              
              <Typography
                style={{ color: "#111D4D" }}
                sx={{
                  fontSize: { md: "16px", sm: "16px", xs: "14px" },
                  flexWrap: { xs: "wrap" },
                  display: "inline-block",
                  ml: "0.6rem",
                }}
                onClick={toggleDialogPolicy}
              >
                {t("Terms-Condition")}
              </Typography>
              <Dialog
                scroll="paper"
                open={dialogOpenTermsAndConditions}
                //fullWidth={isMobile}
                onClose={toggleDialogPolicy}
                sx={{ mt: { xs: "4rem" } }}
              >
                <TermsAndConditions
                  setDialogOpen={setDialogOpenTermsAndConditions}
                />
              </Dialog>
              {/* </a> */}
            </FlexBox>
          }
        />
        <BazaarButton
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{ height: 44 }}
          disabled={!values.agreement}
        >
          {t("Create-Your-Account")}
        </BazaarButton>
        <FlexRowCenter my="1.25rem">
          <Box>{t("Already-have-an-account?")}</Box>
          <Link href={"/login"}>
            <a>
              <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                {t("Login")}
              </H6>
            </a>
          </Link>
        </FlexRowCenter>
        {/* <Divider sx={{ width: "100%", mb: "1rem" }}>{t("or")}</Divider>
        <Box>
          <Button
            color="primary"
            sx={{ mb: 1.5 }}
            fullWidth
            size="large"
            //type="submit"
            variant="outlined"
            onClick={() => {
              router.push(
                `https://uat-api.lowisy.com/api/customers/auth/google`
              );
            }}
          //href={`http://localhost:3001/api/customers/auth/google`}
          >
            <GoogleIcon sx={{ mr: 2 }} />

            {t("Continue-with-Google")}
          </Button>

          <Button
            color="secondary"
            sx={{ mb: 1.5, ":hover": "none" }}
            fullWidth
            size="large"
            //type="submit"
            variant="contained"
            onClick={() => {
              router.push(
                `https://uat-api.lowisy.com/api/customers/auth/facebook`
              );
            }}
          //href={`http://localhost:3001/api/customers/auth/facebook`}
          >
            <FacebookRoundedIcon sx={{ mr: 2 }} />
            {t("Continue-with-Facebook")}
          </Button>
        </Box> */}
      </form>

      {/* <SocialButtons redirect="/login" redirectText="Login" /> */}
    </Wrapper>
  );
};

const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  agreement: false,
};

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  phone: yup.string(),
  password: yup.string().required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});

export default Signup;
