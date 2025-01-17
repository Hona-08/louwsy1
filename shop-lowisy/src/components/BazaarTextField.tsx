import { Box, BoxProps, TextField, TextFieldProps } from "@mui/material";
import { Small } from "./Typography";

export interface BazaarTextFieldProps { }

const BazaarTextField: React.FC<TextFieldProps & BoxProps> = ({
  InputProps,
  ...props
}: any) => {
  const boxProps: any = {};
  const textFieldProps: any = {};

  for (const key in props) {
    if (spacePropList.includes(key)) {
      boxProps[key] = props[key];
    } else textFieldProps[key] = props[key];
  }

  return (
    <Box {...boxProps}>
      {/* {textFieldProps.label && (
        <Small
          display="block"
          mb={1}
          textAlign="left"
          fontWeight="600"
          color="grey.700"
        >
          {textFieldProps.label}
        </Small>
      )} */}
      <TextField
        InputProps={{
          ...InputProps,
          style: {
            ...InputProps?.style,
            height: 44,
            //borderRadius: '1rem'
          },
        }}
        {...textFieldProps}
      />
    </Box>
  );
};

const spacePropList = [
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginX",
  "marginY",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingX",
  "paddingY",
];

export default BazaarTextField;
