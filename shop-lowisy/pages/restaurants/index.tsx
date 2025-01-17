import {
  Chip,
  Container,
  debounce,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import { FlexBox } from "components/flex-box";
import ShopLayout1 from "components/layouts/ShopLayout1";
import LoadingScreen from "components/loading-screen";
import RestaurantFilterCard from "components/products/RestaurantFilterCard";
import RestaurantCard1 from "components/restaurant/RestaurantCard1";
import RestaurantCardList from "components/restaurant/RestaurantCardList";
import { SearchOutlinedIcon } from "components/search-box/SearchBox";
import Sidenav from "components/sidenav/Sidenav";
import { Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Router, useRouter } from "next/router";
import NoRestaurant from "pages-sections/restaurant/NoRestaurant";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import DirectionsBikeRoundedIcon from "@mui/icons-material/DirectionsBikeRounded";
import TakeoutDiningRoundedIcon from "@mui/icons-material/TakeoutDiningRounded";
import { getRestaurantsByLatLng } from "utils/api/restaurants";
import { FilterList } from "@mui/icons-material";
import DeliveryPickup from "components/header/DeliveryPickup";
import useLocales from "hooks/useLocales";

const ShopList = () => {
  const [view, setView] = useState("list");
  const { t } = useTranslation("common");
  const { translate } = useLocales();
  const [viewFilter, setViewFilter] = useState(false);
  const [checked, setChecked] = useState({
    isOpenNow: false,
    isFreeDelivery: false,
    minimumOrder: 0,
  });
  const [selected, setSelected] = useState("");
  const [sortOption, setSortOption] = useState("reviews|desc");
  const [filterValues, setFilterValues] = useState<any>({
    shippingType: "DELIVERY",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { query } = useRouter();
  const router = useRouter();
  const width = useWindowSize();
  const isTablet = width < 960;
  const { lat, lng, radiusInKm } = query;
  const [alignment, setAlignment] = useState<string | null>("DELIVERY");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };
  const handleDeliveryAndPickup = (e: any) => {
    setFilterValues({ ...filterValues, ["shippingType"]: e.target.value });
  };
  const { data: restaurants, isFetching } = useQuery<any>(
    [
      "get_restaurants",
      sortOption,
      searchQuery,
      lat,
      lng,
      radiusInKm,
      filterValues.category,
      filterValues.isOpen,
      filterValues.isFreeDelivery,
      filterValues.shippingType,
      filterValues.minimumOrder,
    ],
    () =>
      getRestaurantsByLatLng({
        sortBy: sortOption,
        searchQuery,
        lat,
        lng,
        radiusInKm,
        filterValues,
      })
  );

  const toggleView = useCallback((v) => () => setView(v), []);

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) {
      setSearchQuery("");
    } else {
      setSearchQuery(value);
    }
  }, 1000);

  const handleSearch = useCallback((event) => {
    event.persist();
    search(event);
    setViewFilter(true);
  }, []);

  const handleChange = (value) => {
    setSortOption(value);
  };

  // if (isFetching) {
  //   return <LoadingScreen />;
  // }

  const handleDelete = () => {
    setSearchQuery("");
    setViewFilter(false);
  };

  return (
    <ShopLayout1
      filterValues={filterValues}
      setFilterValues={setFilterValues}
      selected={selected}
      setSelected={setSelected}
    >
      <Container sx={{ mt: 4, mb: 6 }}>
        {/* <CategoryListItem /> */}
        {/* <H2 mb={3}> {t('all-restaurants')}</H2> */}

        <Grid container spacing={3}>
          <Grid
            item
            md={3}
            xs={12}
            sx={{ display: { md: "block", xs: "none" } }}
          >
            <RestaurantFilterCard
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              noOfRestaurants={restaurants?.length ?? 0}
              checked={checked}
              setChecked={setChecked}
              selected={selected}
              setSelected={setSelected}
            />
          </Grid>

          <Grid item md={9} xs={12}>
            {isTablet && (
              <Sidenav
                position="left"
                handle={
                  <IconButton sx={{ float: "right" }}>
                    <FilterList fontSize="small" />
                  </IconButton>
                }
              >
                <Box sx={{ mx: router.locale === "en" ? 18 : 15.7, mt: 2 }}>
                  <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                    color="standard"
                    sx={{
                      height: 34,
                      paddingRight: 0,
                      color: "grey.700",
                      background: "#fff",
                      "& fieldset": { border: "none" },
                      ml: -15,
                    }}
                  >
                    <ToggleButton
                      value="DELIVERY"
                      aria-label="left aligned"
                      onClick={handleDeliveryAndPickup}
                    >
                      <span aria-disabled>
                        <DirectionsBikeRoundedIcon sx={{ mr: 1.5 }} />
                      </span>
                      {t("Delivery")}
                    </ToggleButton>
                    <ToggleButton
                      value="PICKUP"
                      aria-label="centered"
                      onClick={handleDeliveryAndPickup}
                    >
                      <span aria-disabled>
                        <TakeoutDiningRoundedIcon sx={{ mr: 1.5 }} />
                      </span>
                      {t("Pickup")}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <RestaurantFilterCard
                  filterValues={filterValues}
                  setFilterValues={setFilterValues}
                  noOfRestaurants={restaurants?.length ?? 0}
                  checked={checked}
                  setChecked={setChecked}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Sidenav>
            )}
            <FlexBox
              alignItems="center"
              columnGap={1}
              flexWrap="wrap"
              //mt="0.5rem"
              rowGap={1}
              sx={{ mr: 2 }}
            >
              <FlexBox alignItems="center" gap={1} flex="1 1 0">
                <TextField
                  placeholder={t("Restaurants-and-Dishes")}
                  sx={{
                    mb: 1.5,
                    width: {
                      sm: "20rem",
                      xs: "17rem",
                      md: "30rem",
                      lg: "40rem",
                      ml: "50rem",
                    },
                  }}
                  variant="outlined"
                  onChange={handleSearch}
                  InputProps={{
                    sx: {
                      height: 50,
                      paddingRight: 0,
                      color: "grey.700",
                      borderRadius: 300,
                      // background: "#fff",
                      // "& fieldset": { border: "none" },
                      overflow: "hidden",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                      },
                    },
                    endAdornment: viewFilter && searchQuery.length > 0 && (
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={searchQuery}
                          sx={{ mr: 2 }}
                          onDelete={handleDelete}
                        />
                        {/* <Chip label="Deletable" variant="outlined" onDelete={handleDelete} /> */}
                      </Stack>
                    ),
                    startAdornment: <SearchOutlinedIcon fontSize="small" />,
                  }}
                />
              </FlexBox>
              <FlexBox alignItems="center" gap={1} flex="1 1 1" sx={{}}>
                <Paragraph color="grey.600" whiteSpace="pre">
                  {t("sort-by")}:
                </Paragraph>

                <TextField
                  select
                  size="small"
                  variant="outlined"
                  placeholder={t("sort-by")}
                  defaultValue={sortOptions[0].value}
                  sx={{
                    width: 200,
                    flex: "1 1 0",
                    mb: 0.1,
                  }}
                >
                  {sortOptions.map((item) => (
                    <MenuItem
                      value={item.value}
                      key={item.value}
                      onClick={() => handleChange(item.value)}
                    >
                      {t(`${item.label}`)}
                    </MenuItem>
                  ))}
                </TextField>
              </FlexBox>
            </FlexBox>

            <Grid container spacing={3} sx={{ mt: { sm: 1, xs: 1 } }}>
              {restaurants?.length > 0 ? (
                restaurants?.map((item, ind) => (
                  <>
                    {view == "grid" ? (
                      <Grid item lg={4} sm={6} xs={12} key={ind}>
                        <RestaurantCard1 {...item} />
                      </Grid>
                    ) : (
                      <Grid item lg={12} sm={12} xs={12} key={ind}>
                        <RestaurantCardList {...item} />
                      </Grid>
                    )}
                  </>
                ))
              ) : (
                <NoRestaurant />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ShopLayout1>
  );
};

const sortOptions = [
  { label: "reviews", value: "reviews|desc" },
  { label: "distance", value: "distance|asc" },
  { label: "Estimated Delivery Time", value: "delivery_time|asc" },
  { label: "alphabetical", value: "name|asc" },
  { label: "capital_city", value: "city_name|asc" },
  { label: "state", value: "street_address|asc" },
];

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default ShopList;
