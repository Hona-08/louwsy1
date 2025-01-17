import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { Typography, IconButton } from "@mui/material";
import { H1, H3, H5 } from "./Typography";
import { FlexBetween } from "./flex-box";
import CloseIcon from "@mui/icons-material/Close";
import { PrivacyPolicy_EN } from "./privacy-policy/PrivacyPolicy_EN";
import { Router, useRouter } from "next/router";
import { PrivacyPolicy_DE } from "./privacy-policy/PrivacyPolicy_DE";

export default function PrivacyPolicyDialog({ setDialogOpen }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const router = useRouter();


  const handleClose = () => {
    setDialogOpen(false);
  };

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
      {/* <Button onClick={handleClickOpen("paper")}>scroll=paper</Button> */}

      {/* <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ overflowX: "hidden" }}
      > */}

      <DialogContent dividers={scroll === "paper"}>
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

          {router.locale === "en" ? <PrivacyPolicy_EN /> : <PrivacyPolicy_DE />}
        </DialogContentText>
      </DialogContent>
      {/* </Dialog> */}
    </div>
  );
}
