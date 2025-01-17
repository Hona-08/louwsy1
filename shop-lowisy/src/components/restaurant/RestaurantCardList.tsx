import { Call, East, Place } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import {
  alpha,
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H3, Span } from "components/Typography";
import Link from "next/link";
import React, { useState } from "react";
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
type RestaurantCardListProps = {
  name: string;
  slug: string;
  phone: string;
  rating: number;
  imgUrl: string;
  address: string;
  shopUrl?: string;
  coverImage: string;
  logo: string;
  streetAddress: string;
  id: string;
  minimumOrder: number;
  openingTime: string;
  closingTime: string;
  street_address: string;
  cover_image: string;
  minimum_order: string;
  opening_time: string;
  closing_time: string;
  rate: number;
};
// ================================================================

const RestaurantCardList: React.FC<RestaurantCardListProps> = (props) => {
  const [isHover, setIsHover] = useState(false);
  // props list
  const {
    name,
    slug,
    rating,
    street_address,
    coverImage,
    phone,
    cover_image,
    logo: imgUrl,
    id,
    minimumOrder,
    minimum_order,
    openingTime,
    opening_time,
    closing_time,
    closingTime,
    streetAddress,
    rate = 0
  } = props;


  return (
    <Link href={`/restaurants/${slug}`} passHref>
      <Card
        sx={{
          display: { xs: "flex-col", sm: "flex-col", md: "flex" },
          padding: "5px",
          cursor: "pointer",
        }}
      >
        <Box sx={{ width: { md: "350px" } }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="194"
              image={coverImage ? lowisy_s3_url + coverImage : lowisy_s3_url + cover_image}
              alt={name}
              sx={{
                width: "full",
                height: "full",
                objectFit: "cover",
              }}
            />
          </CardActionArea>
        </Box>

        <CardContent sx={{ ml: { md: "20px" } }}>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 800,
              mb: { md: 2, sm: 2, xs: 2 },
            }}
          >
            {name}
          </Typography>
          <Rating
            value={rate}
            color="gray"
            size="small"
            readOnly
            sx={{ mb: "0.75rem" }}
            precision={0.5}
          />

          <FlexBox
            mb={1}
            gap={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box sx={{ display: "flex" }}>
              <Place
                fontSize="small"
                sx={{ fontSize: 17, mt: "3px", mr: 0.5 }}
              />
              <Span color="gray">{streetAddress ?? street_address}</Span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalMallIcon
                fontSize="small"
                sx={{ fontSize: 15, mt: "3px", mr: 0.5 }}
              />
              <Span color="gray" sx={{ mr: { md: 3 } }}>
                Min: €{minimumOrder ?? minimum_order}
              </Span>
            </Box>
          </FlexBox>

          <FlexBox
            mb={1}
            gap={0.5}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box sx={{ display: "flex" }}>
              <Call
                fontSize="small"
                sx={{ fontSize: 17, mt: "3px", mr: 0.5 }}
              />
              <Span color="gray">{phone}</Span>
            </Box>
            <Box sx={{ display: "flex" }}>
              <AccessTimeIcon
                fontSize="small"
                sx={{ fontSize: 17, mt: "3px", mr: 0.5 }}
              />
              <Span color="gray">
                {openingTime ?? opening_time} - {closingTime ?? closing_time}
              </Span>
            </Box>
          </FlexBox>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCardList;
