/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Remove } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import BazaarAvatar from "components/BazaarAvatar";
import BazaarButton from "components/BazaarButton";
import BazaarRating from "components/BazaarRating";
import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6 } from "components/Typography";
import { CartItem, useAppContext } from "contexts/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { lowisy_s3_url, myLoader } from "utils/constants";
import ImageViewer from "react-simple-image-viewer";
import { FlexBox, FlexRowCenter } from "../flex-box";

// ================================================================
type ProductIntroProps = {
  product: { [key: string]: any };
};
// ================================================================

const ProductIntro: React.FC<ProductIntroProps> = ({ product }) => {
  const { id, price, name: title, productImages } = product;
  const router = useRouter();
  const routerId = router.query.id as string;

  const [selectedImage, setSelectedImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const { state, dispatch } = useAppContext();
  const cartList: CartItem[] = state.cart;
  const cartItem = cartList.find(
    (item) => item.id === id || item.id === routerId
  );

  const handleImageClick = (ind: number) => () => {
    setSelectedImage(ind);
  };

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handleCartAmountChange = useCallback(
    (amount) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          price,
          qty: amount,
          name: title,
          imgUrl: productImages[0].images,
          id: id || routerId,
        },
      });
    },
    []
  );

  const images = productImages?.map((img: any) => lowisy_s3_url + img.images);

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
            <LazyImage
              width={300}
              alt={title}
              height={300}
              loading="eager"
              objectFit="contain"
              src={productImages[selectedImage]?.images}
              loader={myLoader}
              onClick={() =>
                openImageViewer(
                  productImages.indexOf(productImages[selectedImage])
                )
              }
            />
            {isViewerOpen && (
              <ImageViewer
                src={images}
                onClose={closeImageViewer}
                currentIndex={currentImage}
                backgroundStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  zIndex: 1501,
                }}
              />
            )}
          </FlexBox>

          <FlexBox overflow="auto">
            {productImages.map((url, ind) => (
              <FlexRowCenter
                key={ind}
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                ml={ind === 0 ? "auto" : 0}
                style={{ cursor: "pointer" }}
                onClick={handleImageClick(ind)}
                mr={ind === productImages.length - 1 ? "auto" : "10px"}
                borderColor={
                  selectedImage === ind ? "primary.main" : "grey.400"
                }
              >
                <BazaarAvatar
                  src={lowisy_s3_url + url.images}
                  variant="square"
                  height={40}
                />
              </FlexRowCenter>
            ))}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={2}>{title}</H1>

          <FlexBox alignItems="center" mb={2}>
            {/* <Box>Brand:</Box>
            <H6 ml={1}>Xiaomi</H6> */}
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={4}
                readOnly
              />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox>

          <Box mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {/* €{price.toFixed(2)} */}
            </H2>
            {/* <Box color="inherit">Stock Available</Box> */}
          </Box>

          {!cartItem?.qty ? (
            <BazaarButton
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
              sx={{ mb: 4.5, px: "1.75rem", height: 40 }}
            >
              Add to Cart
            </BazaarButton>
          ) : (
            <FlexBox alignItems="center" mb={4.5}>
              <BazaarButton
                size="small"
                sx={{ p: 1 }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Remove fontSize="small" color="primary" />
              </BazaarButton>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <BazaarButton
                size="small"
                sx={{ p: 1 }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Add fontSize="small" color="primary" />
              </BazaarButton>
            </FlexBox>
          )}

          <FlexBox alignItems="center" mb={2}>
            {/* <Box>Sold By:</Box>
            <Link href="/shops/fdfdsa">
              <a>
                <H6 ml={1}>Mobile Store</H6>
              </a>
            </Link> */}
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
