import {
  Box,
  Card,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  Rating,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";
import { FlexBetween, FlexBox } from "components/flex-box";
import LoadingScreen from "components/loading-screen";
import { H5, H6, Paragraph, Span } from "components/Typography";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getCategories, getCategoriesInTreeFormat } from "utils/api/categories";

type ProductFilterCarProps = {
  filterValues?: any;
  setFilterValues?: any;
};

const ProductFilterCard = ({
  filterValues,
  setFilterValues,
}: ProductFilterCarProps) => {
  const [viewFilter, setViewFilter] = useState(false);
  const { t } = useTranslation("common");
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

  const handleDelete = () => {
    setFilterValues({ shippingType: "DELIVERY" });
    setViewFilter(false);
  };

  const handleClick = (id: string, name: string) => {
    setFilterValues({ ...filterValues, ["category"]: id });
  };
  return (
    <Card sx={{ p: "18px 27px", overflow: "auto" }} elevation={1}>
      {/* <FormGroup sx={{ my: 2 }}>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label="Open Now"
          labelPlacement="start"
        />
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label="Free Delivert"
          labelPlacement="start"
        />
      </FormGroup> */}
      {(filterValues.category ||
        filterValues.lowPrice ||
        filterValues.highPrice) && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Chip label="clear filters" onDelete={handleDelete} />
        </Box>
      )}

      <H6 mb={1.25}>{t("categories")}</H6>

      {categories?.length > 0 ? (
        <>
          {categories.map((item) =>
            item.subCategories ? (
              <Accordion key={item.id}>
                <AccordionHeader px={0} py={0.75} color="grey.600">
                  <Span sx={{ cursor: "pointer", mr: "9px" }}>{item.name}</Span>
                </AccordionHeader>

                {item.subCategories.map(({ name, id }) => (
                  <Paragraph
                    pl="22px"
                    py={0.75}
                    key={name}
                    fontSize="14px"
                    color="grey.600"
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleClick(id, name)}
                  >
                    {name}
                  </Paragraph>
                ))}
              </Accordion>
            ) : (
              <Paragraph
                py={0.75}
                fontSize="14px"
                color="grey.600"
                key={item.title}
                className="cursor-pointer"
              >
                {item.name}
              </Paragraph>
            )
          )}
        </>
      ) : (
        <Typography sx={{fontVariant:'common-ligatures', mr: "9px"}}>No categories found.</Typography>
      )}

      <Divider sx={{ mt: 2, mb: 3 }} />

      {/* <H6 mb={2}>{t("price-range")}</H6> */}
      {/* <FlexBetween>
        <TextField
          placeholder={t("low")}
          type="number"
          name="lowPrice"
          onChange={handleChange}
          defaultValue={filterValues?.lowPrice}
          size="small"
          fullWidth
        />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField
          placeholder={t("high")}
          type="number"
          name="highPrice"
          onChange={handleChange}
          defaultValue={filterValues?.highPrice}
          size="small"
          fullWidth
        />
      </FlexBetween> */}

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

export default ProductFilterCard;
