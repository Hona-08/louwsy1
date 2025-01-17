import { forwardRef } from "react";
import NextLink from "next/link";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------
/* eslint-disable react/display-name */
interface Props extends BoxProps {
  disabledLink?: boolean;
}

const LogoWithoutText = forwardRef<any, Props>(
  ({ disabledLink = false, sx }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box ref={ref} sx={{ height: 40, cursor: "pointer", ...sx }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="200"
          height="66"
          viewBox="0 0 86 56"
        >
          <g id="Header" transform="translate(-320 -176)">
            <image
              id="Lowisy_Logo_512x256_111d4d_tr"
              data-name="Lowisy Logo_512x256_111d4d_tr"
              width="100"
              height="55"
              transform="translate(320 183)"
              xlinkHref="data:image/png;base64,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"
            />
          </g>
        </svg>
      </Box>
    );

    if (disabledLink) {
      return <>{logo}</>;
    }

    return <NextLink href="/">{logo}</NextLink>;
  }
);

export default LogoWithoutText;
