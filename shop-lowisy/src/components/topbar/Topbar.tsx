import { CallOutlined, ExpandMore, MailOutline } from "@mui/icons-material";
import { Box, Container, MenuItem, styled } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase";
import Image from "components/BazaarImage";
import BazaarMenu from "components/BazaarMenu";
import { FlexBox } from "components/flex-box";
import NavLink from "components/nav-link/NavLink";
import { Span } from "components/Typography";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { layoutConstant } from "utils/constants";

const TopbarWrapper = styled(Box, {
  shouldForwardProp: (props) => props !== "bgColor",
})<{ bgColor: any }>(({ theme, bgColor }) => ({
  fontSize: 12,
  height: layoutConstant.topbarHeight,
  background: bgColor || theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  "& .topbarLeft": {
    "& .logo": { display: "none" },
    "& .title": { marginLeft: "10px" },
    "@media only screen and (max-width: 900px)": {
      "& .logo": { display: "block" },
      "& > *:not(.logo)": { display: "none" },
    },
  },
  "& .topbarRight": {
    "& .link": {
      paddingRight: 30,
      color: theme.palette.secondary.contrastText,
    },

    "@media only screen and (max-width: 900px)": {
      "& .link": { display: "none" },
    },
  },
  "& .menuItem": { minWidth: 100 },
  "& .marginRight": { marginRight: "1.25rem" },
  "& .handler": { height: layoutConstant.topbarHeight },
  "& .smallRoundedImage": { height: 15, width: 25, borderRadius: 2 },
  "& .menuTitle": { fontSize: 12, marginLeft: "0.5rem", fontWeight: 600 },
}));

type TopbarProps = {
  bgColor?: string;
};

const Topbar: FC<TopbarProps> = ({ bgColor }) => {
  const [currency, setCurrency] = useState(currencyList[0]);
  const [language, setLanguage] = useState(languageList[0]);

  const handleCurrencyClick = (curr: typeof currency) => () =>
    setCurrency(curr);
  const handleLanguageClick = (lang: typeof language) => () =>
    setLanguage(lang);

  return (
    <TopbarWrapper bgColor={bgColor}>
      <Container
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexBox className="topbarLeft" alignItems="center">
          <div className="logo">
            <Link href="/" passHref>
              <Image
                display="block"
                height="28px"
                src="/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
          </div>

          <FlexBox alignItems="center">
            <CallOutlined fontSize="small" />
            <Span className="title">+43 676 4703540</Span>
          </FlexBox>

          <FlexBox alignItems="center" ml={2.5}>
            <MailOutline fontSize="small" />
            <Span className="title">info@lowisy.com</Span>
          </FlexBox>
        </FlexBox>

        <FlexBox className="topbarRight" alignItems="center">
          <NavLink className="link" href="/faq">
            Theme FAQ&quot;s
          </NavLink>

          <NavLink className="link" href="/help">
            Need Help?
          </NavLink>

          <BazaarMenu
            handler={
              <TouchRipple className="handler marginRight">
                <Span className="menuTitle">{language.title}</Span>
                <ExpandMore fontSize="inherit" />
              </TouchRipple>
            }
          >
            {languageList.map((item, index) => (
              <MenuItem
                className="menuItem"
                key={index}
                onClick={handleLanguageClick(item)}
              >
                <Span className="menuTitle">{item.title}</Span>
              </MenuItem>
            ))}
          </BazaarMenu>

          <BazaarMenu
            direction="right"
            handler={
              <TouchRipple className="handler">
                <Span className="menuTitle">{currency.title}</Span>
                <ExpandMore fontSize="inherit" />
              </TouchRipple>
            }
          >
            {currencyList.map((item, index) => (
              <MenuItem
                className="menuItem"
                key={index}
                onClick={handleCurrencyClick(item)}
              >
                <Span className="menuTitle">{item.title}</Span>
              </MenuItem>
            ))}
          </BazaarMenu>
        </FlexBox>
      </Container>
    </TopbarWrapper>
  );
};

const languageList = [
  { title: "EN", imgUrl: "/assets/images/flags/usa.png" },
  { title: "BN", imgUrl: "/assets/images/flags/bd.png" },
  { title: "HN", imgUrl: "/assets/images/flags/in.png" },
];

const currencyList = [
  { title: "USD", imgUrl: "/assets/images/flags/usa.png" },
  { title: "EUR", imgUrl: "/assets/images/flags/uk.png" },
  { title: "BDT", imgUrl: "/assets/images/flags/bd.png" },
  { title: "INR", imgUrl: "/assets/images/flags/in.png" },
];

export default Topbar;
