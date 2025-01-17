import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  styled,
  Theme,
  Typography,
} from "@mui/material";
import { FlexBox } from "components/flex-box";
import appIcons from "components/icons";
import { H1, H2, H3, H4, Span } from "components/Typography";
import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useMediaQuery from "@mui/material/useMediaQuery";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SavingsIcon from "@mui/icons-material/Savings";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { useTranslation } from "react-i18next";
import Countdown from "pages-sections/countdown";
import HomeCountdown from "pages-sections/countdown/HomeCountDown";

// styled components
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  flexWrap: "wrap",
  padding: "1.5rem",
  background: "#111d4d",
  borderRadius: "8px",
  boxShadow: theme.shadows[2],
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    padding: "1rem 0.5rem",
    flexDirection: "column",
  },
}));

// =============================================================
type Props = {
  id?: string;
  services: any[];
};
// =============================================================

const CounterPage: FC = () => {
  const { t } = useTranslation("common");
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  SwiperCore.use([Autoplay]);
  return (
    <Container
      sx={{
        pt: "25px",
        pb: 8,
        background: "#111d4d",
        height: "270px",
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: "white", textAlign: "center", mb: 0, mt: "1rem" }}
      >
        {t("time-to-beta-phase")}
      </Typography>
      <HomeCountdown expireDate={new Date(2023, 0, 16, 13, 45).getTime()} />
    </Container>
  );
};

export default CounterPage;

//<Countdown expireDate={new Date(2023, 0, 16, 13, 45).getTime()} />
