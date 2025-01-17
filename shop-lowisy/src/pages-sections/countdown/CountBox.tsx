import { Box } from "@mui/system";
import { H3, Span } from "components/Typography";
import React, { FC } from "react";

// component props interface
interface CountBoxProps {
  digit: number;
  title: string;
}

const CountBox: FC<CountBoxProps> = ({ digit, title }) => {
  return (
    <H3>
      <Span sx={{ fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" } }}>
        {digit}
      </Span>
      <br />
      <Box
        // color="grey.600"
        color="white"
        fontWeight="600"
        sx={{
          fontSize: { xs: "0.625rem", sm: "0.625rem", md: "0.875rem" },
          mt: "-5px",
        }}
      >
        {title}
      </Box>
    </H3>
  );
};

export default CountBox;

CountBox.defaultProps = {
  digit: 365,
  title: "DAYS",
};
