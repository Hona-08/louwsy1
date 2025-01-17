import { SxProps } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import { FlexBox } from "components/flex-box";
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import { H6, Span } from "components/Typography";
import Link from "next/link";
import React from "react";

// =======================================================
type ProductCard8Props = {
  id: string;
  sx: SxProps;
  price: number;
  title: string;
  imgUrl: string;
};
// =======================================================

const ProductCard8: React.FC<ProductCard8Props> = (props) => {
  const { id, imgUrl, price, title, sx = {} } = props;

  return (
    <BazaarCard sx={{ p: 2, ...sx }}>
      <Link href={`/product/${id}`}>
        <a>
          <HoverBox mb={1.5} borderRadius="8px">
            <LazyImage
              width={500}
              height={500}
              borderRadius="8px"
              layout="responsive"
              objectFit="contain"
              objectPosition="center"
              src={imgUrl || "/assets/images/products/Rectangle 116.png"}
            />
          </HoverBox>

          <Span title={title} mb={0.5} color="inherit" ellipsis display="block">
            {title}
          </Span>

          <FlexBox alignItems="center">
            <H6 color="primary.main" mr={0.5}>
              €{price}
            </H6>

            <Span color="grey.600">
              <del>€1600</del>
            </Span>
          </FlexBox>
        </a>
      </Link>
    </BazaarCard>
  );
};

export default ProductCard8;
