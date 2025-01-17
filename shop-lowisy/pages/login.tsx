import { FlexRowCenter } from "components/flex-box";
import ShopLayout2 from "components/layouts/ShopLayout2";
import SEO from "components/SEO";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Login from "pages-sections/sessions/Login";

const LoginPage: NextPage = () => {
  return (
    <ShopLayout2 showNavbar={false} showTopbar={false}>
      <FlexRowCenter flexDirection="column" minHeight="88vh">
        <SEO title="Login" />
        <Login />
      </FlexRowCenter>
    </ShopLayout2>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default LoginPage;
