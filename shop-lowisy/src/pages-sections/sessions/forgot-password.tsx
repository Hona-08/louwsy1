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
import { forgotPassword, login, register } from "utils/api/customer-auth";
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

const ForgotPassword = () => {
    const [error, setError] = useState();
    const { t } = useTranslation("common");
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();

    const mutation = useMutation(
        (values: any) => forgotPassword(values.email),
        {
            onSuccess(data) {
                toast.success("We've sent you an email to reset your password.");
            },
            onError(err: any) {
                setError(err.response.data.message ?? err.response);
            },
        }
    );



    const handleFormSubmit = async (values: any) => {
        try {
          await  mutation.mutate(values);
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
        <Wrapper elevation={3}>
            <form onSubmit={handleSubmit}>
                <H3 textAlign="center" mb={2.5}>
                    {t("forgot-your-password")}
                </H3>
                <Small
                    mb={3.5}
                    display="block"
                    fontSize="14px"
                    fontWeight="600"
                    color="grey.800"
                    textAlign="center"
                >
                    {t("enter-email-address")}
                </Small>
                {error ? <Alert severity="error">{error}</Alert> : ""}

                <BazaarTextField
                    mb={2}
                    mt={2}
                    fullWidth
                    name="email"
                    size="small"
                    type="email"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    label={t("Email")}
                    placeholder="exmple@mail.com"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                />



                <BazaarButton
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ mb: "1rem", height: 44 }}
                    disabled={mutation.isLoading}
                >
                    {t("send-request")}
                </BazaarButton>

                <Button
                    fullWidth
                    href="/login"
                    color="warning"
                    variant="outlined"
                    sx={{ mb: "1rem", height: 44 }}
                >
                    {t("Back")}
                </Button>
            </form>
        </Wrapper>
    );
};

const initialValues = {
    email: ""
};

const formSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("Email is required"),
});

export default ForgotPassword;
