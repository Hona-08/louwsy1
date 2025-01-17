import { Delete, Edit, Place } from "@mui/icons-material";
import { Alert, Button, IconButton, Pagination, TableCell, Typography } from "@mui/material";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getAddresses } from "utils/api/order";

const AddressList = () => {
  const { t } = useTranslation("common");
  const {
    data: addresses,
    isFetching,
    refetch,
  } = useQuery<any>(
    ["get_addresses"],
    () => getAddresses()
  );

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Place}
        title="My Addresses"
        navigation={<CustomerDashboardNavigation />}
      />

      {!isFetching && addresses?.length == 0 && (
        <TableRow>
          <TableCell colSpan={6}>
            <Alert severity="info" sx={{ mx: 1.8, my: 1, p: 1, width: "90%" }}>
              <H5>{t("No-any-Addresses")}</H5>
            </Alert>
          </TableCell>
        </TableRow>
      )}

      {addresses && addresses.map((address, ind) => (
        <TableRow sx={{ my: 2, padding: "6px 18px" }} key={ind}>
          <Typography whiteSpace="pre" m={0.75} textAlign="left">
            {address.fullName}
          </Typography>

          <Typography flex="1 1 260px !important" m={0.75} textAlign="left">
            {address.address1}  {' '}  {address.address2}
          </Typography>

          <Typography flex="1 1 260px !important" m={0.75} textAlign="left">
            {address.zipCode}
          </Typography>

          <Typography whiteSpace="pre" m={0.75} textAlign="left">
            {address.phone}
          </Typography>

          {/* <Typography whiteSpace="pre" textAlign="center" color="grey.600">
            <Link href="/address/xkssThds6h37sd" passHref>
              <IconButton>
                <Edit fontSize="small" color="inherit" />
              </IconButton>
            </Link>

            <IconButton onClick={(e) => e.stopPropagation()}>
              <Delete fontSize="small" color="inherit" />
            </IconButton>
          </Typography> */}
        </TableRow>
      ))}
    </CustomerDashboardLayout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default AddressList;
