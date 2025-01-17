import { Alert, Box, Button, Card, CardProps, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import BazaarButton from "components/BazaarButton";
import BazaarTextField from "components/BazaarTextField";
import { H3, Small } from "components/Typography";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import useIsMountedRef from "hooks/useIsMountedRef";
import router, { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { Mutation, useMutation } from "react-query";
import { login, register } from "utils/api/customer-auth";
import * as yup from "yup";
import EyeToggleButton from "./EyeToggleButton";
import SocialButtons from "./SocialButtons";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const fbStyle = { background: "#3B5998", color: "white" };
const googleStyle = { background: "#4285F4", color: "white" };

type WrapperProps = { passwordVisibility?: boolean };

export const Wrapper = styled<React.FC<WrapperProps & CardProps>>(
  ({ children, passwordVisibility, ...rest }) => (
    <Card {...rest}>{children}</Card>
  )
)<CardProps>(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: { width: "100%" },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": { marginBottom: 10, ...fbStyle, "&:hover": fbStyle },
  ".googleButton": { ...googleStyle, "&:hover": googleStyle },
  ".agreement": { marginTop: 12, marginBottom: 24 },
}));

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState();
  const { t } = useTranslation("common");
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const mutation = useMutation(
    (values: any) => login(values.email, values.password),
    {
      onSuccess(data) {
        toast.success("Successful Login");
      },
      onError(err: any) {
        setError(err.response.data.message ?? err.response);
      },
    }
  );

  useEffect(() => {
    if (isAuthenticated) {
      if (router.query.redirectTo) {
        router.push(router.query.redirectTo as string)
        return;
      }
      router.push("/");
    }
  }, [isAuthenticated]);

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
          {t("Welcome-to-Lowisy")}
        </H3>
        <Small
          mb={2.5}
          display="block"
          fontSize="12px"
          fontWeight="600"
          color="grey.800"
          textAlign="center"
        >
          {t("Login-with-email-&-password")}
        </Small>
        {error ? <Alert severity="error">{error}</Alert> : ""}

        <BazaarTextField
          mb={1.5}
          mt={2}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label={t("Email-or-Phone Number")}
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          required
        />

        <BazaarTextField
          mb={2}
          fullWidth
          size="small"
          name="password"
          label={t("Password")}
          autoComplete="on"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="*********"
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

        <BazaarButton
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{ mb: "1rem", height: 44 }}
        >
          {t("Login")}
        </BazaarButton>
      </form>
      
      <Divider sx={{ width: "100%", mb: "1rem" }}>{t("Or")}</Divider>
      <Box>
        <Button
          color="primary"
          sx={{ mb: 1.5 }}
          fullWidth
          size="large"
          //type="submit"
          variant="outlined"
          onClick={() => {
            router.push(`https://uat-api.lowisy.com/api/customers/auth/google`);
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
      </Box>

      <SocialButtons redirect="/signup" redirectText={t("Sign Up")} />
    </Wrapper>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("invalid email").required("Email is required"),
});

export default Login;
