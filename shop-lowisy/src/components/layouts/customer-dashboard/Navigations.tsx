import { CreditCard, FavoriteBorder, Person, Place } from "@mui/icons-material";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { Card, styled, Typography } from "@mui/material";
import { FlexBox } from "components/flex-box";
import CustomerService from "components/icons/CustomerService";
import NavLink, { NavLinkProps } from "components/nav-link/NavLink";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

// custom styled components
const MainContainer = styled(Card)(({ theme }) => ({
  paddingBottom: "1.5rem",
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
    overflowY: "auto",
    height: "calc(100vh - 64px)",
  },
}));

type StyledNavLinkProps = { isCurrentPath: boolean };

const StyledNavLink = styled<FC<StyledNavLinkProps & NavLinkProps>>(
  ({ children, isCurrentPath, ...rest }) => (
    <NavLink {...rest}>{children}</NavLink>
  )
)<StyledNavLinkProps>(({ theme, isCurrentPath }) => ({
  display: "flex",
  alignItems: "center",
  borderLeft: "4px solid",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  marginBottom: "1.25rem",
  justifyContent: "space-between",
  borderColor: isCurrentPath ? theme.palette.primary.main : "transparent",
  "& .nav-icon": {
    color: isCurrentPath ? theme.palette.primary.main : theme.palette.grey[600],
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
    "& .nav-icon": { color: theme.palette.primary.main },
  },
}));

const Navigations = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation("common");

  return (
    <MainContainer>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
            {t(`${item.title}`)}
          </Typography>

          {item.list.map((item) => (
            <StyledNavLink
              href={item.href}
              key={item.title}
              isCurrentPath={pathname.includes(item.href)}
            >
              <FlexBox alignItems="center" gap={1}>
                <item.icon
                  color="inherit"
                  fontSize="small"
                  className="nav-icon"
                />
                <span> {t(`${item.title}`)}</span>
              </FlexBox>
            </StyledNavLink>
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
};

const linkList = [
  {
    title: "Dashboard",
    list: [
      { href: "/orders", title: "Orders", icon: ShoppingBagOutlined },
    ],
  },
  {
    title: "Account-setting",
    list: [
      { href: "/profile", title: "Profile-Info", icon: Person },
      { href: "/address", title: "Addresses", icon: Place },
    ],
  },
];

export default Navigations;
