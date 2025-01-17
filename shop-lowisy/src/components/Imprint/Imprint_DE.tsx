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

export const Imprint_DE = () => {
  return (
    <Box>
      <StyledH1>Impressum</StyledH1>
      <StyledH3>Informationen gemäß § 5 (1) E-Commerce-Gesetz</StyledH3>
      <StyledH4>Lowisy e.U.</StyledH4>

      <H5>Inhaber: </H5>
      <StyledTypography>Matthias Primetzhofer</StyledTypography>

      <H5>IT Dienstleistung: </H5>
      <StyledTypography>
        Softwareentwicklung <br />
        Lizenzvertrieb
      </StyledTypography>

      <H5>Kontakt: </H5>
      <StyledTypography>
        Bogensbergergasse 11/2 <br />
        2560 Berndorf - Austria
        <br />
        Tel.: +43 676 470 3540
        <br />
        Email: info[at]lowisy. com
      </StyledTypography>

      <H5>Gewerbeordnung: </H5>
      <StyledTypography>http://www.ris.bka.gv.at/</StyledTypography>

      <H5>Gewerbebehörde:</H5>
      <StyledTypography>Bezirkshauptmannschaft Baden</StyledTypography>

      <H5>Haftungsausschluss und Urheberrecht:</H5>
      <StyledTypography>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
        für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
        sind ausschließlich deren Betreiber verantwortlich. Die Urheberrechte
        Dritter werden vom Betreiber mit größter Sorgfalt beachtet. Sollten Sie
        trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir
        um einen entsprechenden Hinweis an obige Emailadresse. Bei Bekanntwerden
        solcher Rechtsverletzungen werden wir den betroffenen Inhalt umgehend
        entfernen.
      </StyledTypography>

      <H5>EU-Streitschlichtung:</H5>
      <StyledTypography>
        Verbraucher haben die Möglichkeit, Beschwerden an die
        OnlineStreitbeilegungsplattform der EU zu richten:
        http://ec.europa.eu/odr. Sie können allfällige Beschwerde auch an die
        oben im Impressum angegebene E-Mail-Adresse richten.
      </StyledTypography>
    </Box>
  );
};
