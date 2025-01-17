import { Call, Phone, Place } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import {
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  LinearProgress,
  Rating,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import FacebookFilled from "components/icons/FacebookFilled";
import InstagramFilled from "components/icons/InstagramFilled";
import TwitterFilled from "components/icons/TwitterFilled";
import YoutubeFilled from "components/icons/YoutubeFilled";
import LoadingScreen from "components/loading-screen";
import { H3, Small, Span } from "components/Typography";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getRestaurant, getRestaurantBySlug } from "utils/api/restaurants";
import { lowisy_s3_url } from "utils/constants";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RestaurantDetailsDialog from "components/restaurant/RestaurantDetailsDialog";
import RatingDialog from "components/RatingDialog";
import { useTranslation } from "react-i18next";
import useLocales from "hooks/useLocales";
import ContactUsModal from "pages-sections/restaurant/ContactUsModal";
import RestaurantContactModal from "pages-sections/restaurant/RestaurantContactModal";
const StyledLink = styled("a")(({ theme }) => ({
  // borderRadius: 4,
  display: "block",
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.dark[600],
  "&:hover": { color: theme.palette.grey[600] },
}));

// =======================================================
type ShopIntroCardProps = { shopId?: string | string[] };
// =======================================================

const ShopIntroCard: React.FC<ShopIntroCardProps> = ({ shopId }) => {
  const { query } = useRouter();
  const theme = useTheme();
  const { rate } = query;
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t } = useTranslation("common");
  const { translate } = useLocales();
  const [dialogOpenContactus, setDialogOpenContactus] = useState(false);
  const toggleDialogContactUs = () =>
    setDialogOpenContactus(!dialogOpenContactus);

  const [dialogOpenRestaurantDetail, setDialogOpenRestaurantDetail] =
    React.useState(false);
  const toggleRestaurantDetail = () => {
    setDialogOpenRestaurantDetail(!dialogOpenRestaurantDetail);
  };
  const [dialogOpenRating, setDialogOpenRating] = React.useState(false);
  const toggleRating = () => {
    setDialogOpenRating(!dialogOpenRating);
  };

  const InfoIcon = styled(InfoOutlinedIcon)(() => ({
    marginTop: "1.2px",

    fontSize: "20px",
    cursor: "pointer",
  }));

  const {
    data: restaurantDetails,
    isLoading,
    isFetching,
    isFetched,
  } = useQuery<any>(["get_shop", shopId], () =>
    getRestaurantBySlug(shopId as string)
  );

  // if (isFetching) {
  //   return <LoadingScreen />;
  // }

  const socialLinks = [
    { icon: FacebookFilled, url: `${restaurantDetails?.facebookUrl}` },
    { icon: InstagramFilled, url: `${restaurantDetails?.instagramUrl}` },
  ];

  const imgUrl = lowisy_s3_url + restaurantDetails?.coverImage;

  useEffect(() => {
    setDialogOpenRating(rate ? true : false);
  }, [rate]);
  return (
    <Card sx={{ mb: 4, pb: 2.5 }}>
      <Box
        height="202px"
        sx={{
          background: `url(${imgUrl}) center/cover`,
        }}
      />

      <FlexBox mt={-8} px={3.75} flexWrap="wrap">
        <Avatar
          src={lowisy_s3_url + restaurantDetails?.logo}
          sx={{
            mr: "37px",
            width: "120px",
            height: "120px",
            border: "4px solid",
            borderColor: "grey.100",
          }}
        />

        <Box
          sx={{
            flex: "1 1 0",
            minWidth: "250px",
            "@media only screen and (max-width: 500px)": { marginLeft: 0 },
          }}
        >
          <FlexBetween flexWrap="wrap" mt={0.375} mb={3}>
            <Box
              my={1}
              p="4px 16px"
              borderRadius="4px"
              display="inline-block"
              bgcolor="secondary.main"
            >
              <H3 fontWeight="600" color="grey.100">
                {restaurantDetails?.name}
              </H3>
            </Box>

            {(restaurantDetails?.facebookUrl.includes(".com") ||
              restaurantDetails?.instagramUrl.includes(".com")) && (
              <FlexBox my={1} gap={1.5}>
                {socialLinks.map((item, ind) => (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    key={ind}
                  >
                    <item.icon sx={{ fontSize: 27 }} />
                  </a>
                ))}
              </FlexBox>
            )}
          </FlexBetween>

          <FlexBetween flexWrap="wrap">
            <Box>
              <FlexBox alignItems="center" gap={1} mb={2}>
                <Rating
                  color="warn"
                  size="small"
                  value={restaurantDetails?.rating?.rate ?? 0}
                  readOnly
                />
                <Small color="grey.600" display="block" onClick={toggleRating}>
                  {`(${restaurantDetails?.rating?.totalCount ?? 0})`}
                </Small>
                <Box>
                  <Dialog
                    open={dialogOpenRating}
                    scroll="body"
                    //fullWidth
                    sx={{
                      //width: { xs: "100vw", sm: '100vw', md: '100vw' },
                      height: "100%",
                    }}
                    onClose={toggleRating}
                  >
                    <RatingDialog
                      restaurantId={shopId}
                      setDialogOpen={setDialogOpenRating}
                    />
                  </Dialog>
                </Box>
                <Box>
                  <Dialog
                    open={dialogOpenRestaurantDetail}
                    scroll="paper"
                    //fullWidth={isMobile}
                    sx={{
                      mt: {
                        lg: "-10rem",
                        sm: "-4rem",
                        md: "-4rem",
                        xs: "0rem",
                      },

                      width: { xs: "100vw" },
                      height: { xs: "100vh" },
                    }}
                    onClose={toggleRestaurantDetail}
                    // sx={{ padding: 10 }}
                  >
                    {isFetched && (
                      <RestaurantDetailsDialog
                        setDialogOpen={setDialogOpenRestaurantDetail}
                        restaurant={restaurantDetails}
                      />
                    )}
                  </Dialog>
                </Box>
                <InfoIcon onClick={toggleRestaurantDetail} />
              </FlexBox>
              <FlexBox
                mb={1}
                gap={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box sx={{ display: "flex" }}>
                  <AccessTimeIcon
                    fontSize="small"
                    sx={{ fontSize: 17, mt: "3px", mr: 0.5 }}
                  />
                  <Span color="gray">{`40 - 65 min`}</Span>
                </Box>
                <Box sx={{ display: "flex", ml: 2 }}>
                  <DirectionsBikeIcon
                    fontSize="small"
                    sx={{ fontSize: 17, mt: "3px", mr: 0.5 }}
                  />
                  <Span color="primary.main">{`Free`}</Span>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                  <LocalMallIcon
                    fontSize="small"
                    sx={{ fontSize: 15, mt: "3px", mr: 0.5 }}
                  />
                  <Span color="gray" sx={{ mr: { md: 3 } }}>
                    Min: €
                    {restaurantDetails?.minimumOrder ??
                      restaurantDetails?.minimum_order}
                  </Span>
                </Box>
              </FlexBox>

              <FlexBox color="grey.600" gap={1} mb={1} maxWidth={270}>
                <Place fontSize="small" sx={{ fontSize: 18, mt: "3px" }} />
                <Span color="grey.600">{restaurantDetails?.streetAddress}</Span>
              </FlexBox>

              <FlexBox color="grey.600" gap={1} mb={1}>
                <Call fontSize="small" sx={{ fontSize: 18, mt: "2px" }} />
                <a href={`tel:${restaurantDetails?.phone}`}>
                  <Span color="grey.600">{restaurantDetails?.phone}</Span>
                </a>
              </FlexBox>
            </Box>

            {/* <a href="mailto:bibeshdhital@gmail.com">
              <Button variant="outlined" color="primary" sx={{ my: 1.5 }}>
                {t("contact-vendor")}
              </Button>
            </a> */}

            <Typography
              style={{ color: "grey.100",backgroundColor:'secondary.main' }}
              sx={{
                fontSize: { md: "16px", sm: "16px", xs: "14px" },
                flexWrap: { xs: "wrap" },
                display: "inline-block",
                ml: { lg: "4rem", md: "3rem", sm: "2rem" },
                mr:2
              }}
              // component='button'
              onClick={toggleDialogContactUs}
            >
              <StyledLink>{t("contact-restaurant")}</StyledLink>
            </Typography>
            <Dialog
              open={dialogOpenContactus}
              fullWidth={isMobile}
              scroll="body"
              onClose={toggleDialogContactUs}
            >
              <RestaurantContactModal setDialogOpen={setDialogOpenContactus} />
            </Dialog>

            {/* <a href="mailto:info@lowisy.com">
              <Button variant="outlined" color="primary" sx={{ my: 1.5 }}>
                {t("contact-restaurant")}
              </Button>
            </a> */}
          </FlexBetween>
        </Box>
      </FlexBox>
    </Card>
  );
};

export default ShopIntroCard;
