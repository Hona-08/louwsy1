import { FlexRowCenter } from "components/flex-box";
import ShopLayout2 from "components/layouts/ShopLayout2";
import SEO from "components/SEO";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ForgotPassword from "pages-sections/sessions/forgot-password";

const ForgotPasswordPage: NextPage = () => {
    return (
        <ShopLayout2 showNavbar={false} showTopbar={false}>
            <FlexRowCenter flexDirection="column" minHeight="80vh">
                <SEO title="Reset Password" />
                <ForgotPassword />
            </FlexRowCenter>
        </ShopLayout2>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
});

export default ForgotPasswordPage;
