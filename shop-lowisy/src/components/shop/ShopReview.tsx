import { Rating } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H2, H5 } from "components/Typography";
import { useFormik } from "formik";
import { t } from "i18next";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { createRating } from "utils/api/rating";
import * as yup from "yup";

export interface ShopReviewProps {
  shopId: string;
  setDialogOpen: any;
}

const ShopReview: React.FC<ShopReviewProps> = ({ shopId, setDialogOpen }) => {
  const mutation = useMutation((values: any) => createRating(values), {
    onSuccess(data) {
      toast.success(data.message);
      setDialogOpen(false);
    },
    onError(err: any) {
      toast.error(err.response.data.message ?? err.response);
    },
  });
  const { t } = useTranslation("common");

  const handleFormSubmit = async (values: any) => {
    const { rating } = values;
    mutation.mutate({ rate: rating, shopId });
  };

  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues: initialValues,
    validationSchema: reviewSchema,
  });

  return (
    <Box>
      <H2 fontWeight="600" mt={3} mb={2.5}>
        {t("write-a-review-for-this-restaurant")}
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb={2.5}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">{t("your-rating")}</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            color="warn"
            size="medium"
            value={values.rating}
            onChange={(_, value: any) => setFieldValue("rating", value)}
          />
        </Box>

        <Box mb={3}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">{t("your-review")}</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextField
            rows={8}
            multiline
            fullWidth
            name="comment"
            variant="outlined"
            onBlur={handleBlur}
            value={values.comment}
            onChange={handleChange}
            placeholder={t("write-a-review-here") + "..."}
            error={!!touched.comment && !!errors.comment}
            helperText={touched.comment && errors.comment}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!(dirty && isValid)}
        >
          {t("submit")}
        </Button>
      </form>
    </Box>
  );
};

const commentList = [
  {
    name: "Jannie Schumm",
    imgUrl: "/assets/images/faces/7.png",
    rating: 4.7,
    date: "2021-02-14",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
  },
  {
    name: "Joe Kenan",
    imgUrl: "/assets/images/faces/6.png",
    rating: 4.7,
    date: "2019-08-10",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
  },
  {
    name: "Jenifer Tulio",
    imgUrl: "/assets/images/faces/8.png",
    rating: 4.7,
    date: "2021-02-05",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
  },
];

const initialValues = {
  rating: 0,
  comment: "",
  date: new Date().toISOString(),
};

const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
  comment: yup.string().required("required"),
});

export default ShopReview;
