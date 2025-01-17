import {
  Box,
  Button,
  Dialog,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Theme,
  Container,
} from "@mui/material";
import BazaarButton from "components/BazaarButton";
import { H1, H3 } from "components/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import RecommendRestaurant from "./RecommendRestaurant";

const NoRestaurant = () => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const StyledContainer = styled(Container)(({ theme }) => ({
    width: "95%",
    marginLeft: "1.3rem",
    backgroundColor: "white",
    height: "100%",
    borderRadius: "1rem",
    padding: "8rem",
    marginTop: "3rem",
    position: "relative",
    overflow: "hidden",

    [theme.breakpoints.down("sm")]: {
      padding: "7rem",
    },
  }));

  const StyledH3 = styled(H3)(({ theme }) => ({
    textAlign: "center",
    marginBottom: "1rem",
  }));
  const StyledBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    top: "5rem",
    [theme.breakpoints.down("sm")]: {
      top: "4rem",
    },
  }));

  const StyledBtn = styled(BazaarButton)(({ theme }) => ({
    // height: "3rem",

    height: 48,
    textAlign: "center",
    width: "13.9375rem",
    fontSize: "1rem",
    marginX: "auto",

    // marginX: "auto",
    // textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "12rem",
      fontSize: "0.8rem",
      paddingY: "0.2rem",
      paddingX: "0.5rem",
    },
  }));

  return (
    <StyledContainer>
      <StyledBox>
        <StyledH3>{t("No-restaurant-available")}</StyledH3>
        <Box textAlign="center">
          <StyledBtn color="primary" variant="contained" onClick={toggleDialog}>
            {t("landing-slider1-button")}
          </StyledBtn>
        </Box>
      </StyledBox>

      <Dialog
        open={dialogOpen}
        fullWidth={isMobile}
        scroll="body"
        onClose={toggleDialog}
      >
        <RecommendRestaurant setDialogOpen={setDialogOpen} />
      </Dialog>
    </StyledContainer>
  );
};

export default NoRestaurant;
