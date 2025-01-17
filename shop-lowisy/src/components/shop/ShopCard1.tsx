import { Call, East, Place } from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Card,
  IconButton,
  Rating,
  styled,
} from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H3, Span } from "components/Typography";
import Link from "next/link";
import React from "react";
import { lowisy_s3_url } from "utils/constants";

// styled components
const ContentWrapper = styled(Box)<{ imgUrl: string }>(({ theme, imgUrl }) => ({
  color: "white",
  backgroundSize: "cover",
  padding: "17px 30px 56px",
  backgroundPosition: "center",
  backgroundImage: `linear-gradient(to bottom,
    ${alpha(theme.palette.grey[900], 0.8)}, ${alpha(
    theme.palette.grey[900],
    0.8
  )}), 
    url(${imgUrl || "/assets/images/banners/cycle.png"})`,
}));

// ================================================================
type ShopCard1Props = {
  name: string;
  phone: string;
  rating: number;
  imgUrl: string;
  address: string;
  shopUrl: string;
  coverImgUrl?: string;
  coverImage?: string;
  logo?: string
  streetAddress?: string
  id?: string
  slug?: string
};
// ================================================================

const ShopCard1: React.FC<ShopCard1Props> = (props) => {
  // props list
  const { name, rating, streetAddress, phone, coverImage: coverImgUrl, logo: imgUrl, id, slug } = props;

  return (
    <Card>
      <ContentWrapper imgUrl={coverImgUrl ? lowisy_s3_url + coverImgUrl : coverImgUrl}>
        <H3 fontWeight="600" mb={1}>
          {name}
        </H3>

        <Rating
          value={rating || 4}
          color="warn"
          size="small"
          readOnly
          sx={{ mb: "0.75rem" }}
        />

        <FlexBox mb={1} gap={1}>
          <Place fontSize="small" sx={{ fontSize: 17, mt: "3px" }} />
          <Span color="white">{streetAddress}</Span>
        </FlexBox>

        <FlexBox alignItems="center" gap={1}>
          <Call fontSize="small" sx={{ fontSize: 17 }} />
          <Span color="white">{phone}</Span>
        </FlexBox>
      </ContentWrapper>

      <FlexBetween pl={3} pr={1}>
        <Avatar
          src={lowisy_s3_url + imgUrl}
          sx={{
            width: 64,
            height: 64,
            mt: "-32px",
            border: "3px solid",
            borderColor: "grey.100",
          }}
        />
        <Link href={`/restaurants/${slug}`} passHref>
          <a>
            <IconButton sx={{ my: 0.5 }}>
              <East
                sx={{
                  fontSize: 19,
                  transform: ({ direction }) =>
                    `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
                }}
              />
            </IconButton>
          </a>
        </Link>
      </FlexBetween>
    </Card>
  );
};

export default ShopCard1;
