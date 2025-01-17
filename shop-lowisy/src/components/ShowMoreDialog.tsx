import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import {
  Typography,
  styled,
  IconButton,
  Paper,
  ListItem,
  Chip,
  Grid,
} from "@mui/material";
import { H1, H2, H3, H5 } from "./Typography";
import { FlexBetween } from "./flex-box";
import CloseIcon from "@mui/icons-material/Close";
import { PrivacyPolicy_EN } from "./privacy-policy/PrivacyPolicy_EN";
import { Router, useRouter } from "next/router";
import { PrivacyPolicy_DE } from "./privacy-policy/PrivacyPolicy_DE";
import { Imprint_EN } from "./Imprint/Imprint_EN";

import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

import { Imprint_DE } from "./Imprint/Imprint_DE";
import { getCategories } from "utils/api/categories";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

export default function ShowMoreDialog({
  setDialogOpen,
  categories,
  filterValues,
  setFilterValues,
  selected,
  setSelected
}) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [hover, setHover] = React.useState("outlined");
  const router = useRouter();
  const { t } = useTranslation("common");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setDialogOpen(true);

    setScroll(scrollType);
  };

  const handleClick = (id: string, name: string) => {
    setSelected(id )
    setFilterValues({ ...filterValues, ["category"]: id });
    setDialogOpen(false);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  const StyledH2 = styled(H2)(() => ({
    marginBottom: "1rem",
    textAlign: "center",
    fontWeight: "normal",
  }));
  const StyledH3 = styled(H3)(() => ({
    padding: "2rem",
    paddingTop: "5rem",
    textAlign: "center",
    fontWeight: "normal",
  }));

  const StyledChip = styled(Chip)(() => ({
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#111d4d",
      color: "grey",
    },
  }));

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <DialogContent
        dividers={scroll === "paper"}
        sx={{
          height: "500px",
          width: { lg: "600px", md: "600px", sm: "600px" },
        }}
      >
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          {/* <PrivacyEN /> */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 6,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <StyledH2>{t("all-categories")}</StyledH2>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              mb: "20px",
            }}
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={t("search-in-categories")}
              inputProps={{ "aria-label": "Search in categories" }}
            />
          </Paper>
          <Grid container spacing={2}>
            {categories.length !== 0 ? (
              categories?.map((item: any, ind: any) => (
                <Grid item xs={6} lg={4} md={4} key={item.name}>
                  <StyledChip
                    label={item.name}
                    variant="outlined"
                    onClick={() => handleClick(item.id, item.name)}
                  />
                </Grid>
              ))
            ) : (
              <StyledH3>{t("no-categeory-available")}</StyledH3>
            )}
          </Grid>
        </DialogContentText>
      </DialogContent>
      {/* </Dialog> */}
    </div>
  );
}
