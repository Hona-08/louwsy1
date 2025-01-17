import { FlexBox } from "components/flex-box";
import React, { FC, useCallback, useEffect, useState } from "react";
import CountBox from "./CountBox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/system";
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

const Countdown: FC<CountDownProps> = ({ expireDate }) => {
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState(initialState);
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const downXl = useMediaQuery((theme: Theme) => theme.breakpoints.down("xl"));
  const { t } = useTranslation("common");
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
    <FlexBox
      sx={{
        mt: 0,
        display: "flex",
        // width: downXl
        //   ? "50%"
        //   : downLg
        //   ? "80%"
        //   : downMd
        //   ? "80%"
        //   : downSm
        //   ? "100%"
        //   : "50%",
        width: { xs: "80%", sm: "80%", md: "70%", lg: "70%" },
        justifyContent: "space-evenly",
        height: "auto",
        mx: "auto",
        color: "white",
      }}
    >
      <CountBox digit={timeLeft.days} title={t("days")} />
      <CountBox digit={timeLeft.hours} title={t("hours")} />
      <CountBox digit={timeLeft.minutes} title={t("mins")} />
      <CountBox digit={timeLeft.seconds} title={t("secs")} />
    </FlexBox>
  );
};

export default Countdown;
