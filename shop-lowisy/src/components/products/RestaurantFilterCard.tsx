import {
  Box,
  Card,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Rating,
  Switch,
  TextField,
} from "@mui/material";
import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";
import { FlexBetween, FlexBox } from "components/flex-box";
import LoadingScreen from "components/loading-screen";
import { H1, H2, H4, H5, H6, Paragraph, Span } from "components/Typography";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getCategories, getCategoriesInTreeFormat } from "utils/api/categories";

type ProductFilterCarProps = {
  filterValues?: any;
  setFilterValues?: any;
  noOfRestaurants: number;
  checked?: any;
  setChecked?: any;
  selected?: any;
  setSelected?: any;
};

const RestaurantFilterCard = ({
  filterValues,
  setFilterValues,
  noOfRestaurants,
  checked,
  setChecked,
  selected,
  setSelected
}: ProductFilterCarProps) => {
  const [viewFilter, setViewFilter] = useState(false);
  const [minOrder, setMinOrder] = useState("0");
  const { t } = useTranslation("common");

  const handleMinimumOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinOrder((event.target as HTMLInputElement).value);
    setFilterValues({ ...filterValues, ["minimumOrder"]: +event.target.value });
    setViewFilter(true);
  };
  const {
    data: categories,
    isFetching,
    refetch,
  } = useQuery<any>(["get_categories_tree"], getCategoriesInTreeFormat);

  if (isFetching) {
    return <LoadingScreen />;
  }

  const handleChange = (e: any) => {
    setFilterValues({ ...filterValues, [e.target.name]: +e.target.value });
    setViewFilter(true);
  };

  const handleDelivery = (e: any) => {
    setChecked({
      ...checked,
      isFreeDelivery: +e.target.checked
    })
    setViewFilter(true);
    setFilterValues({ ...filterValues, ["isFreeDelivery"]: +e.target.checked });
  };

  const handleOpenNow = (e: any) => {
    setChecked({
      ...checked,
      isOpenNow: +e.target.checked,

    });
    setViewFilter(true);
    setFilterValues({ ...filterValues, ["isOpen"]: +e.target.checked });
  };

  const handleDelete = () => {
    setChecked({
      isOpenNow: false,
      isFreeDelivery: false
    })
    setFilterValues({ shippingType: "DELIVERY" });
    setViewFilter(false);
    setMinOrder('0');
    setSelected("");
  };

  const getClearChip = () => {

    if (filterValues.isOpen ||
      filterValues.isFreeDelivery ||
      filterValues.category ||
      filterValues.minimumOrder)
      return (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Chip label="clear filters" onDelete={handleDelete} />
        </Box>
      )
  }


  const handleClick = (id: string, name: string) => {
    setFilterValues({ ...filterValues, ["category"]: id });
  };

  return (
    <Card sx={{ p: "18px 27px", overflow: "auto" }} elevation={1}>
      {getClearChip()}

      <H5 mb={2}>{noOfRestaurants} Restaurants</H5>
      <FlexBetween mb={2}>
        <H5>{t("Open-now")}</H5>

        <Switch onClick={handleOpenNow} inputProps={{ 'aria-label': 'controlled' }} checked={checked.isOpenNow} />
      </FlexBetween>
      <FlexBetween mb={2}>
        <H5>{t("Free-delivery")}</H5>

        <Switch onClick={handleDelivery} inputProps={{ 'aria-label': 'controlled' }} checked={checked.isFreeDelivery} />
      </FlexBetween>
      <FlexBox sx={{ display: "flex-row", mb: 2 }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            <H5>{t("Minimum-order-amount")}</H5>
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="0"
            name="radio-buttons-group"
            value={minOrder}
            onChange={handleMinimumOrder}
          >
            <FormControlLabel
              value="0"
              control={<Radio />}
              // label={t("Show-all")}
              label={t("Show-all")}
            />
            <FormControlLabel
              value="50"
              control={<Radio />}
              label={
                "50 €" + " " + t("or") + " " + t("less")
              }
            />
            <FormControlLabel
              value="100"
              control={<Radio />}
              label={
                "100 €" + " " + t("or") + " " + t("less")
              }
            />
            <FormControlLabel
              value="500"
              control={<Radio />}
              label={
                "500 €" + " " + t("or") + " " + t("less")
              }
            />
          </RadioGroup>
        </FormControl>
      </FlexBox>

      {/* <H5 mb={2}>Restaurant ratings</H5> */}

      {/* <FlexBox sx={{ display: "flex-row" }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            <H5>Offers and savings</H5>
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="gilad" />}
              label="Offers (30)"
            />
            <FormControlLabel
              control={<Checkbox name="jason" />}
              label="StampCards (159)"
            />
          </FormGroup>
        </FormControl>
      </FlexBox> */}

      {/* <Divider sx={{ my: 3 }} /> */}

      {/* <H6 mb={2}>Brands</H6>
      {brandList.map((item) => (
        <FormControlLabel
          key={item}
          sx={{ display: "flex" }}
          label={<Span color="inherit">{item}</Span>}
          control={<Checkbox size="small" color="secondary" />}
        />
      ))} */}

      {/* <Divider sx={{ my: 3 }} /> */}

      {/* {otherOptions.map((item) => (
        <FormControlLabel
          key={item}
          sx={{ display: "flex" }}
          label={<Span color="inherit">{item}</Span>}
          control={<Checkbox size="small" color="secondary" />}
        />
      ))} */}

      {/* <Divider sx={{ my: 3 }} /> */}

      {/* <H6 mb={2}>Ratings</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <FormControlLabel
          control={<Checkbox size="small" color="secondary" />}
          label={<Rating size="small" value={item} color="warn" readOnly />}
          sx={{ display: "flex" }}
          key={item}
        />
      ))} */}

      {/* <Divider sx={{ my: 3 }} /> */}

      {/* <H6 mb={2}>Colors</H6>
      <FlexBox mb={2} flexWrap="wrap" gap={1}>
        {colorList.map((item) => (
          <Box
            flexShrink={0}
            sx={{
              width: 25,
              height: 25,
              bgcolor: item,
              cursor: "pointer",
              borderRadius: "50%",
            }}
            key={item}
          />
        ))}
      </FlexBox> */}
    </Card>
  );
};



export default RestaurantFilterCard;
