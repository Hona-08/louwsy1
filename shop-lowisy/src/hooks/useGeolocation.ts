import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCvqBlmgrQH7Nbid5gCMdqrm-Q45fHOM9A");
const useGeoLocation = () => {
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
    place_id: "",
    description: "",
    components: {},
    structured_formatting: {
      main_text: "",
      secondary_text: "",
      main_text_matched_substrings: [""],
    },
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const onSuccess = (location) => {
    const { latitude, longitude } = location.coords;

    Geocode.fromLatLng(latitude, longitude).then(
      (res) => {
        const { formatted_address, place_id } = res.results[0];

        const address = formatted_address;
        const fullAddress = formatted_address.split(",");
        const description = fullAddress[1].trim() + "," + fullAddress[2];
        const address1 = fullAddress[1]?.trim();
        const address2 = fullAddress[2]?.trim();

        setLocation({
          lat: latitude.toString(),
          lng: longitude.toString(),
          place_id: place_id,
          description: description,
          components: {},
          structured_formatting: {
            main_text: address1,
            secondary_text: address2,
            main_text_matched_substrings: [""],
          },
        });
      },

      (error) => {
        // console.log(error);
      }
    );
  };

  const onError = (error) => {
    setLocation({
      lat: "",
      lng: "",

      place_id: "",
      description: "",
      components: {},
      structured_formatting: {
        main_text: "",
        secondary_text: "",
        main_text_matched_substrings: [""],
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeoLocation;
