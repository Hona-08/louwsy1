import { Box } from "@mui/system";
import { H3, Span } from "components/Typography";
import React, { FC } from "react";

// component props interface
interface CountBoxProps {
  digit: number;
  title: string;
}

const HomeCountBox: FC<CountBoxProps> = ({ digit, title }) => {
  return (
    <Box>
      <H3
        sx={{
          display: "flex-col",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mx: "auto",

            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem", lg: "4rem" },
          }}
        >
          {digit}
        </Box>
        <br />
        <Box
          color="grey.600"
          // color="#111D4D"
          fontWeight="600"
          sx={{
            width: { lg: "100px", md: "50px", sm: "50px" },
            mx: "auto",
            fontSize: {
              xs: "1rem",
              sm: "1rem",
              md: "1rem",
              lg: "1.5rem",
            },
            textAlign: "center",
            mt: "-30px",
          }}
        >
          {title}
        </Box>
      </H3>
    </Box>
  );
};

export default HomeCountBox;

HomeCountBox.defaultProps = {
  digit: 365,
  title: "DAYS",
};
