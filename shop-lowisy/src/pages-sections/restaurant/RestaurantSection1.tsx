import { Box, Link, styled, TextField } from "@mui/material";
import BazaarButton from "components/BazaarButton";
import { SearchOutlinedIcon } from "components/search-box/SearchBox";
import { H1 } from "components/Typography";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { AddressAutocompleteValue } from "mui-address-autocomplete";

import dynamic from "next/dynamic";
import { useMutation, useQuery } from "react-query";
import { getRestaurantsByLatLng } from "utils/api/restaurants";
import { useTranslation } from "next-i18next";
import { validateYupSchema } from "formik";
import useGeoLocation from "hooks/useGeolocation";

const AddressAutocomplete = dynamic(() => import("mui-address-autocomplete"), {
  ssr: false,
});

export const S3_HEADERS_URL =
  "https://lowisy-dev.s3.eu-central-1.amazonaws.com/lowisy-restaurant/headers";

const leftImg = `assets/images/headers/Header-BG1.png`;
const rightImg = `assets/images/headers/Header-BG2.png`;

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 650,
  padding: 20,
  paddingTop: 160,
  backgroundColor: theme.palette.grey[100],
  backgroundSize: "40%, 40%",
  backgroundPosition: "left bottom, right bottom",
  backgroundRepeat: "no-repeat, no-repeat",
  transition: "all .3s",
  backgroundImage:
    theme.direction === "ltr"
      ? `url('${leftImg}'), url('${rightImg}')`
      : `url('${rightImg}'), url('${leftImg}')`,

  "& h1": {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.3,
  },
  "& .searchBox": {
    margin: "auto",
    maxWidth: "600px",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: theme.shadows[2],
  },
  [theme.breakpoints.up("md")]: {
    backgroundSize: "450px, 450px",
  },
  [theme.breakpoints.down("md")]: {
    height: 550,
    paddingTop: 130,
    "& h1": { fontSize: 38, textAlign: "center" },
  },
  [theme.breakpoints.down("sm")]: {
    height: 480,
    paddingTop: 100,
    "& h1": { fontSize: 30 },
    "& .searchBox": { margin: 0 },
  },
}));

const RestaurantSection1: FC = () => {
  const location = useGeoLocation();

  const router = useRouter();
  const { t } = useTranslation("footer");

  // const [value, setValue] = useState<AddressAutocompleteValue | any>({
  //   place_id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
  //   description: "Salzburg, Austria",
  //   components: {},
  //   lat: "47.80949",
  //   lng: "13.05501",
  //   structured_formatting: {
  //     main_text: "Salzburg",
  //     secondary_text: "Austria",
  //     main_text_matched_substrings: [""],
  //   },
  // });

  const defaultLocation = {
    loaded: "true",
    lat: "47.80949",
    lng: "13.05501",
    place_id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
    description: "Salzburg, Austria",
    components: {},

    structured_formatting: {
      main_text: "Salzburg",
      secondary_text: "Austria",
      main_text_matched_substrings: [""],
    },
  };
  const [value, setValue] = useState<AddressAutocompleteValue | any>(
    defaultLocation
  );

  useEffect(() => {
    setValue(location);
  }, [location]);
  return (
    <Container>
      <H1 maxWidth={600} mx="auto">
        {t("description")}
      </H1>

      {/* <div>
        <button onClick={() => onToggleLanguageClick(changeTo)}>
          {t('change-locale', { changeTo })}
        </button>
      </div> */}

      <Box className="searchBox" sx={{ display: "flex" }}>
        <AddressAutocomplete
          placeholder="Search by address"
          apiKey="AIzaSyCvqBlmgrQH7Nbid5gCMdqrm-Q45fHOM9A"
          fields={["geometry"]}
          label=""
          onChange={(_, value: any) => {
            if (!value) return;
            setValue({
              ...value,
              lat: value?.geometry.location.lat(),
              lng: value?.geometry.location.lng(),
            });
          }}
          value={value}
          sx={{
            height: 50,
            paddingTop: 0.5,
            paddingRight: 0,

            color: "grey.700",
            background: "#fff",
            "& fieldset": { border: "none" },
          }}
        />

        <BazaarButton
          color="primary"
          disableElevation
          variant="contained"
          sx={{ px: "2rem", borderRadius: "0 8px 8px 0" }}
          //disabled={Boolean(value?.lat && value?.lng)}
          onClick={() =>
            router.push(
              `/restaurants?lat=${value?.lat}&lng=${
                value.lng
              }&radiusInKm=10&address=${
                value.formatted_address ?? value.description
              }`
            )
          }
        >
          {t("Search")}
        </BazaarButton>
        {/* <TextField
          placeholder="Search by address"
          fullWidth
          InputProps={{
            sx: {
              height: 50,
              paddingRight: 0,
              color: "grey.700",
              background: "#fff",
              "& fieldset": { border: "none" },
            },
            endAdornment: (
              
            ),
            startAdornment: <SearchOutlinedIcon fontSize="small" />,
          }} */}
        {/* /> */}
      </Box>
    </Container>
  );
};

export default RestaurantSection1;
