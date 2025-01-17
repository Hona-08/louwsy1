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
import { login, register, resetPassword } from "utils/api/customer-auth";
import * as yup from "yup";
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
}));

const ResetPassword = () => {

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [error, setError] = useState();
    const { t } = useTranslation("common");
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();
    const token = router.query.token;

    const mutation = useMutation(
        ({ newPassword, token }: any) => resetPassword(newPassword, token),
        {
            onSuccess(data) {
                toast.success("password changed successfully");
                router.push('/login')
            },
            onError(err: any) {
                setError(err.response.data.message ?? err.response);
            },
        }
    );



    const handleFormSubmit = async (values: any) => {
        try {
            mutation.mutate({ newPassword: values.newPassword, token });
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
                    {t("Please change your password")}
                </H3>
                <Small
                    mb={2.5}
                    display="block"
                    fontSize="12px"
                    fontWeight="600"
                    color="grey.800"
                    textAlign="center"
                >
                    {t("Please enter the password in below box to change your login password.")}
                </Small>
                {error ? <Alert severity="error">{error}</Alert> : ""}

                <BazaarTextField
                    mb={1.5}
                    mt={2}
                    fullWidth
                    name="newPassword"
                    size="small"
                    type="password"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.newPassword}
                    onChange={handleChange}
                    label={t("New Password")}
                    placeholder="New Password"
                    error={!!touched.newPassword && !!errors.newPassword}
                    helperText={touched.newPassword && errors.newPassword}
                />

                <BazaarTextField
                    mb={1.5}
                    mt={2}
                    fullWidth
                    name="confirmPassword"
                    size="small"
                    type="password"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    label={t("Confirm Password")}
                    placeholder="confirm Password"
                    error={!!touched.confirmPassword && !!errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                />


                <BazaarButton
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ mb: "1rem", height: 44 }}
                    disabled={mutation.isLoading}
                >
                    {t("Change password")}
                </BazaarButton>
            </form>
        </Wrapper>
    );
};

const initialValues = {
    newPassword: "",
    confirmPassword: "",
};

const formSchema = yup.object().shape({
    newPassword: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup.string()
        .required('Confirm newPassword is required')
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export default ResetPassword;
