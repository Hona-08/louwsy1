/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Card, IconButton, styled } from "@mui/material";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import { Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import React, { useCallback } from "react";
import { lowisy_s3_url } from "utils/constants";

// styled components
const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,

  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: { height: "auto", minWidth: "100%" },
  },
}));

// =========================================================
type ProductCard7Props = {
  qty: number;
  name: string;
  price: number;
  imgUrl?: string;
  id: string | number;
  restaurantId?: string;
};
// =========================================================

const ProductCard7: React.FC<ProductCard7Props> = ({
  id,
  name,
  qty,
  price,
  imgUrl,
  restaurantId
}) => {
  const { dispatch } = useAppContext();
  // handle change cart
  const handleCartAmountChange = useCallback(
    (amount) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: { id, name, price, imgUrl, qty: amount, restaurantId },
      });
    },
    []
  );

  return (
    <Wrapper>
      <Image
        alt={name}
        width={140}
        height={140}
        display="block"
        src={lowisy_s3_url + imgUrl || "/assets/images/products/iphone-xi.png"}
      />

      <IconButton
        size="small"
        onClick={handleCartAmountChange(0)}
        sx={{ position: "absolute", right: 15, top: 15 }}
      >
        <Close fontSize="small" />
      </IconButton>

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link href={`/product/${id}`}>
          <a>
            <Span ellipsis fontWeight="600" fontSize={18}>
              {name}
            </Span>
          </a>
        </Link>

        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Span color="grey.600">
            €{price.toFixed(2)} x {qty}
          </Span>

          <Span fontWeight={600} color="primary.main">
            €{(price * qty).toFixed(2)}
          </Span>
        </FlexBox>

        <FlexBox alignItems="center">
          <Button
            color="primary"
            sx={{ p: "5px" }}
            variant="outlined"
            disabled={qty === 1}
            onClick={handleCartAmountChange(qty - 1)}
          >
            <Remove fontSize="small" />
          </Button>

          <Span mx={1} fontWeight={600} fontSize={15}>
            {qty}
          </Span>
          <Button
            color="primary"
            sx={{ p: "5px" }}
            variant="outlined"
            onClick={handleCartAmountChange(qty + 1)}
          >
            <Add fontSize="small" />
          </Button>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default ProductCard7;
