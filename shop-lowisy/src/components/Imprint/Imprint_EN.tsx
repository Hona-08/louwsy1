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
import { H1, H3, H4, H5, Span } from "components/Typography";

const StyledTypography = styled(Typography)(() => ({
  marginBottom: "1.5rem",
}));
const StyledH1 = styled(H1)(() => ({
  marginBottom: "0.5rem",
}));
const StyledH3 = styled(H3)(() => ({
  marginBottom: "0.5rem",
}));
const StyledH4 = styled(H4)(() => ({
  marginBottom: "0.5rem",
}));

export const Imprint_EN = () => {
  return (
    <Box>
      <StyledH1>Imprint</StyledH1>
      <StyledH3>Information according to § 5 (1) E-Commerce-Law</StyledH3>
      <StyledH4>Lowisy e.U.</StyledH4>

      <H5>Owner:</H5>
      <StyledTypography>Matthias Primetzhofer</StyledTypography>

      <H5>IT service: </H5>
      <StyledTypography>
        Software development <br />
        License distribution
      </StyledTypography>

      <H5>Registered office: </H5>
      <StyledTypography>
        Bogensbergergasse 11/2 <br />
        2560 Berndorf - Austria
        <br />
        Tel.: +43 676 470 3540
        <br />
        Email: info[at]lowisy. com
      </StyledTypography>

      <H5>Trade regulations: </H5>
      <StyledTypography>http://www.ris.bka.gv.at/</StyledTypography>

      <H5>Trade authority:</H5>
      <StyledTypography>Baden District Authority</StyledTypography>

      <H5>Liability and copyright:</H5>
      <StyledTypography>
        Despite careful control of the content, we assume no liability for the
        content of external links. The operators of the linked pages are solely
        responsible for their content. The copyrights of third parties are
        observed by the operator with the utmost care. Should you nevertheless
        become aware of a copyright infringement, we ask that you send us a
        corresponding note to the above email address. As soon as we become
        aware of such legal violations, we will remove the affected content
        immediately.
      </StyledTypography>

      <H5>EU dispute resolution:</H5>
      <StyledTypography>
        Consumers have the option of submitting complaints to the {`EU's`} online
        dispute resolution platform: http://ec.europa.eu/odr. You can also
        address any complaints to the e-mail address given above in the imprint.
      </StyledTypography>
    </Box>
  );
};
