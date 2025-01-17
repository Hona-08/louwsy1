import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import { H4 } from "components/Typography";
import Link from "next/link";
import React from "react";
import { myLoader } from "utils/constants";

// ==========================================================
type ProductCard2Props = {
  id: number;
  price: number;
  name: string;
  imgUrl: string;
  rating: number;
  discount: number;
  productImages: any
};
// ==========================================================

const ProductCard2: React.FC<ProductCard2Props> = (props) => {
  const { name, price, id, productImages } = props;




  return (
    <Link href={`/product/${id}`}>
      <a>
        <HoverBox borderRadius="8px" mb={1}>
          <LazyImage
            src={productImages[0]?.name}
            width={120}
            height={120}
            layout="responsive"
            alt={name}
            loader={myLoader}
          />
        </HoverBox>
        <H4 fontSize={14} mb={0.5}>
          {name}
        </H4>
        <H4 fontSize={14} color="primary.main">
        €{Math.ceil(price).toLocaleString()}
        </H4>
      </a>
    </Link>
  );
};

export default ProductCard2;
