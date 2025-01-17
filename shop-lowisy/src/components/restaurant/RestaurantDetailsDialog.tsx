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
  Link,
  MenuItem,
  Menu,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { Router, useRouter } from "next/router";
import { H2, H6 } from "components/Typography";

export default function RestaurantDetailsDialog({ setDialogOpen, restaurant }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [hover, setHover] = React.useState("outlined");
  const router = useRouter();
  const { name } = restaurant;

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setDialogOpen(true);

    setScroll(scrollType);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  const StyledH2 = styled(H2)(() => ({
    marginBottom: "2rem",
  }));

  const StyledChip = styled(Chip)(() => ({
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#111d4d",
      color: "white",
    },
  }));

  const StyledMenuItem = styled(MenuItem)(() => ({
    padding: "1rem 1rem",
    marginTop: "1rem",
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
    <Box>
      <DialogContent
        dividers={scroll === "paper"}
        sx={
          {
            // width: { lg: "500px", sm: "500px", md: "500px" },
            // height: { lg: "500px", md: "100%", sm: "100%", xs: "100vh" },
            // mt: "20px",
            // border: "8",
          }
        }
      >
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
          sx={{ padding: { lg: "1rem", xs: "1rem" } }}
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
          <StyledH2>More Information </StyledH2>

          <Box sx={{ display: "flex-row" }}>
            <H6>{name}</H6>
          </Box>
        </DialogContentText>
      </DialogContent>
      {/* </Dialog> */}
    </Box>
  );
}
