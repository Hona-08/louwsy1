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
type RestaurantCard1Props = {
  name: string;
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
  slug: string;
};
// ================================================================

const RestaurantCard1: React.FC<RestaurantCard1Props> = (props) => {
  const [isHover, setIsHover] = useState(false);
  // props list
  const {
    name,
    slug,
    rating,
    street_address: streetAddress,
    phone,
    cover_image: coverImage,
    logo: imgUrl,
    id,
    minimum_order: minimumOrder,
    opening_time: openingTime,
    closing_time: closingTime,
  } = props;

  return (
    <Card
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      sx={{
        padding: "5px",
      }}
    >
      <Link href={`/restaurants/${slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            height="194"
            image={lowisy_s3_url + coverImage}
            alt="Paella dish"
            sx={{
              transition: "0.3s ease-in-out",
              "&:hover, &:focus-within": {
                transform: "scale(1.1)",
              },
            }}
          />
          {/* 
          <CardHeader
            title={name}
            sx={{ fontSize: "22px", fontWeight: "900" }}
          /> */}
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 800,
              mb: { md: 2, sm: 2 },
              mt: { xs: 2 },
              ml: { xs: 2 },
            }}
          >
            {name}
          </Typography>
        </CardActionArea>
      </Link>

      <CardContent>
        <Rating
          value={rating || 4}
          color="gray"
          size="small"
          readOnly
          sx={{ mb: "0.75rem" }}
        />

        <FlexBox
          mb={1}
          gap={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ display: "flex" }}>
            <Place sx={{ fontSize: 17, mt: "3px", mr: 0.5 }} />
            <Span color="gray">{streetAddress}</Span>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalMallIcon sx={{ fontSize: 15, mt: "3px", mr: 0.5 }} />
            <Span color="gray">Min: €{minimumOrder}</Span>
          </Box>
        </FlexBox>

        <FlexBox
          mb={1}
          gap={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ display: "flex" }}>
            <Call sx={{ fontSize: 17, mt: "3px", mr: 0.5 }} />
            <Span color="gray">{phone}</Span>
          </Box>
          <Box sx={{ display: "flex" }}>
            <AccessTimeIcon
              fontSize="small"
              sx={{ fontSize: 17, mt: "3px", mr: 0.5 }}
            />
            <Span color="gray">
              {openingTime} - {closingTime}
            </Span>
          </Box>
        </FlexBox>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard1;
