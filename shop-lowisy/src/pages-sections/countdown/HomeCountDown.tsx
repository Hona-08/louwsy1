import { FlexBox } from "components/flex-box";
import React, { FC, useCallback, useEffect, useState } from "react";
import CountBox from "./CountBox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Theme } from "@mui/system";
import HomeCountBox from "./HomeCountBox";
import { useTranslation } from "react-i18next";

// component props interface
interface CountDownProps {
  expireDate: number;
}

const initialState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const HomeCountdown: FC<CountDownProps> = ({ expireDate }) => {
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState(initialState);
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { t } = useTranslation("common");
  const downSm = useMediaQuery(theme.breakpoints.down(535));
  const downXs = useMediaQuery(theme.breakpoints.down(450));
  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const downXl = useMediaQuery((theme: Theme) => theme.breakpoints.down("xl"));

  const calculateTimeLeft = useCallback(() => {
    const distance = expireDate - new Date().getTime();
    // if date expire
    if (distance < 0) return initialState;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }, [expireDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <Box
      sx={{
        width: { lg: "1100px", md: "800px" },
        mx: "auto",
      }}
    >
      <FlexBox
        sx={{
          display: "flex",

          width: downXs
            ? "80%"
            : downSm
              ? "55%"
              : { lg: "45%", md: "45%", sm: "45%", xs: "55%" },

          justifyContent: {
            lg: "space-evenly",
            md: "space-between",
            sm: "space-evenly",
            xs: "space-around",
          },
          height: "auto",
          mx: "auto",
        }}
      >
        <HomeCountBox digit={timeLeft.days} title={t("days")} />
        <HomeCountBox digit={timeLeft.hours} title={t("hours")} />
        <HomeCountBox digit={timeLeft.minutes} title={t("mins")} />
        <HomeCountBox digit={timeLeft.seconds} title={t("secs")} />
      </FlexBox>
    </Box>
  );
};

export default HomeCountdown;
