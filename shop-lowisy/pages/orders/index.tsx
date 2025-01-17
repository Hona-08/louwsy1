import ShoppingBag from "@mui/icons-material/ShoppingBag";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import OrderList from "pages-sections/orders/OrderList";
import { useTranslation } from "react-i18next";
import axios from "utils/axios";

const Orders = () => {
  const { t } = useTranslation("common");
  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        title={t("My-Order")}
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />

      <OrderList />
    </CustomerDashboardLayout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});


export default Orders;