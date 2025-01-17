import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Box } from "@mui/system";
import { Typography, styled, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { H1, H5, Span } from "components/Typography";

const StyledTypography = styled(Typography)(() => ({
  marginBottom: "1.5rem",
}));
const StyledH1 = styled(H1)(() => ({
  marginBottom: "0.5rem",
}));

const StyledCloseIcon = styled(CloseIcon)(() => ({
  marginBottom: "0.5rem",
  cursor: "pointer",
}));

export const PrivacyPolicy_EN = () => {
  return (
    <Box>
      <StyledH1>Privacy Policy</StyledH1>

      <StyledTypography>
        Policy This privacy policy applies to the processing of personal data of
        customers who use Lowisy.com to order from a participating restaurant.
        The person responsible for the processing of personal data is Lowisy eU,
        Matthias Primetzhofer. All personal data are used to operate the
        Lowisy.com platform and are not passed on to third parties.
      </StyledTypography>

      <H5>Personal data</H5>
      <StyledTypography>
        From the moment the ordering system is used, personal data is collected,
        which is used exclusively for the proper operation of the Lowisy.com
        platform.
      </StyledTypography>

      <H5>Ordering at Lowisy.com</H5>
      <StyledTypography>
        Here, data is transmitted to the respective restaurant or payment data
        to the payment provider as soon as an order is placed on Lowisy.com.
        This personal data is required in order to be able to carry out your
        order. We process the following personal data in the ordering process:{" "}
        <span style={{ fontWeight: "bold" }}>
          Name - address data - contact details - order data - transaction and
          payment
        </span>
      </StyledTypography>

      <H5>Afterdata Ratings</H5>
      <StyledTypography>
        The ordering process, you will be asked to rate the respective
        restaurant. Lowisy.com then processes them further and automatically
        updates the restaurant ratings on the platform. Consent to the sending
        of these e-mails can be revoked at any time by using the “Write to us”
        link on Lowisy.com. We process the following personal data when a
        restaurant rating is submitted:{" "}
        <span style={{ fontWeight: "bold" }}>
          Name (optional) - contact details - rating
        </span>
      </StyledTypography>

      <H5>Customer accounts</H5>
      <StyledTypography>
        When using Lowisy.com, customers are given the opportunity to create
        user accounts based on their consent. The consent to the storage of
        customer data can be revoked at any time. To do this, use the “Write to
        us” link on Lowisy.com. The following personal data is collected in
        connection with a customer account:{" "}
        <span style={{ fontWeight: "bold" }}>
          Name - address data - contact data
        </span>
      </StyledTypography>

      <H5>Support</H5>
      <StyledTypography>
        If you contact our support, the following personal data will be
        processed in order to offer an optimal customer experience:
        <span style={{ fontWeight: "bold" }}>
          {" "}
          Name - address data - contact data - order data - transaction - &
          payment
        </span>
      </StyledTypography>

      <H5>Cookies</H5>
      <StyledTypography>
        Lowisy.com uses cookies for functional and analytical purposes. This
        data will not be disclosed to third parties.
      </StyledTypography>

      <H5>Analysis</H5>
      <StyledTypography>
        Lowisy.com uses anonymous data regarding the use of the platform in
        order to be able to continuously optimize the customer experience.
      </StyledTypography>

      <H5>Age</H5>
      <StyledTypography>
        Lowisy.com cannot verify the age of visitors. If we have collected the
        personal data of a minor or a legally incompetent person without
        consent, this information must be sent to Lowisy.com via the{" "}
        {`"Write to
        us"`}{" "}
        link. The corresponding data will then be deleted immediately.
      </StyledTypography>

      <H5>Additional purposes</H5>
      <StyledTypography>
        We will only use your personal data for the purposes described above.
      </StyledTypography>
    </Box>
  );
};
