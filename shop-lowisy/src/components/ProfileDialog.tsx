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
  Divider,
  ListItemIcon,
  ListItemText,
  MenuList,
} from "@mui/material";
import { H1, H2, H3, H5, H6 } from "./Typography";
import { FlexBetween } from "./flex-box";
import CloseIcon from "@mui/icons-material/Close";
import { PrivacyPolicy_EN } from "./privacy-policy/PrivacyPolicy_EN";
import { Router, useRouter } from "next/router";
import { PrivacyPolicy_DE } from "./privacy-policy/PrivacyPolicy_DE";
import { Imprint_EN } from "./Imprint/Imprint_EN";
import BazaarButton from "./BazaarButton";
import { useState } from "react";
import Login from "pages-sections/sessions/Login";
import useAuth from "hooks/useAuth";
import {
  ContentCut,
  ContentCopy,
  ContentPaste,
  Cloud,
} from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "utils/api/customer-auth";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { StyledNavLink } from "./mobile-navigation/styles";
import NavLink from "./nav-link/NavLink";
import { useTranslation } from "react-i18next";

// const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
//   width: "100%",
//   maxWidth: 450, // Set maximum width
//   margin: "0 auto", // Center horizontally
//   padding: theme.spacing(3),
//   [theme.breakpoints.down("sm")]: {
//     maxWidth: "90%", // Adjust width on small screens
//     padding: theme.spacing(2),
//   },
// }));

export default function ProfileDialog({ setDialogOpen }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [hover, setHover] = React.useState("outlined");
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const { isAuthenticated, logout, user } = useAuth();
  const [dialogOpenSignIn, setDialogOpenSignIn] = useState(false);
  const toggleDialogSignIn = () => setDialogOpenSignIn(!dialogOpenSignIn);

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
  }, [open, isAuthenticated]);

  const mutation = useMutation(() => logout(), {
    onSuccess(data) {
      toast.success("Successfully logged out");
    },
    onError(err: any) {
      toast.error(err.response.data.message ?? err.response);
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  const lang = i18n.language ?? 'en';
  const loginLink = lang == 'de' ? '/de/login' : '/login';
  const signupLink = lang == 'de' ? '/de/signup' : '/signup';
  const profileLink = lang == 'de' ? '/de/profile' : '/profile';

  return (
    <Box >
      <DialogContent
        dividers={scroll === "body"}
      // sx={
      //   {
      //     width: { lg: "500px", sm: "500px", md: "500px" },
      //     height: { lg: "250px", md: "60%", sm: "100%", xs: "100vh" },
      //     mt: "10px",
      //     border: "2",
      //   }
      // }
      >
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 12,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          {!isAuthenticated && <StyledH2>{t("My-account")}</StyledH2>}
          {isAuthenticated && (
            <>
              <H2 sx={{ my: 2 }}>{user?.name}</H2>
              <Link href={profileLink}>{t("View-profile-information")}</Link>
            </>
          )}
          {!isAuthenticated && (
            <Box sx={{ display: "flex", direction: 'row', mb: isAuthenticated ? 0 : 5 }}>
              <Button
                sx={{
                  mr: { xs: "2px" },
                  backgroundColor: "#F5F3F1",
                  color: "black",
                  mt: 1,
                  padding: {
                    lg: "0.5rem 4rem",
                    md: "0.5rem 4rem",
                    sm: "0.5rem 4rem",
                    xs: "0rem 1rem",
                  },
                  borderRadius: {
                    lg: "50px",
                    md: "50px",
                    sm: "50px",
                    xs: "10px",
                  },
                }}
                href={loginLink}
              >
                {t("Sign-In")}
              </Button>

              <Button
                sx={{
                  backgroundColor: "#111D4D",
                  color: "white",
                  padding: {
                    lg: "0.5rem 1.5rem",
                    md: "0.5rem 1.5rem",
                    sm: "0.5rem 1.5rem",
                    xs: "0.5rem 0.6rem",
                  },

                  mt: 1,
                  borderRadius: {
                    lg: "50px",
                    md: "50px",
                    sm: "50px",
                    xs: "10px",
                  },
                  "&:hover": {
                    backgroundColor: "#111D4D",
                  },
                }}
                href={signupLink}
              >
                {t("Create-Your-Account")}
              </Button>
            </Box>
          )}

          {isAuthenticated && (
            <>
              <Paper sx={{ width: 420, maxWidth: "100%" }}>
                <MenuList sx={{ width: "100%", mt: "1rem", mb: "1rem" }}>
                  <MenuItem
                    sx={{ width: "100%" }}
                    onClick={() => router.push("/orders")}
                  >
                    <ListItemIcon>
                      <LocalMallIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t("Orders")}</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText onClick={handleLogout}>
                      {t("Sign-Out")}
                    </ListItemText>
                  </MenuItem>
                </MenuList>
              </Paper>
            </>
          )}
        </DialogContentText>
      </DialogContent>
    </Box >
  );
}
