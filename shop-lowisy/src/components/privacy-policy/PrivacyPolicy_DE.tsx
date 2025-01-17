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
import { H1, H5 } from "components/Typography";

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

export const PrivacyPolicy_DE = () => {
  return (
    <Box>
      <StyledH1>Datenschutzerklärung</StyledH1>

      <StyledTypography>
        Diese Datenschutzerklärung gilt für die Verarbeitung personenbezogener
        Daten von Kunden, die Lowisy.com nutzen, um bei einem teilnehmenden
        Restaurant zu bestellen. Der Verantwortliche für die Verarbeitung
        personenbezogener Daten ist Lowisy e.U., Matthias Primetzhofer.
        Sämtliche personenbezogenen Daten dienen dem Betrieb der Plattform
        Lowisy.com und werden nicht an Dritte weitergegeben.
      </StyledTypography>

      <H5>Personenbezogenen Daten</H5>
      <StyledTypography>
        Ab der Nutzung des Bestellsystems werden personenbezogene Daten erhoben,
        welche ausschließlich dem ordnungsgemäßen Betrieb der Plattform
        Lowisy.com dienen.
      </StyledTypography>

      <H5>Bestellen bei Lowisy.com</H5>
      <StyledTypography>
        Hier werden Daten an das jeweilige Restaurant, bzw. Zahlungsdaten an den
        Zahlungsanbieter übermittelt, sobald eine Bestellung auf Lowisy.com
        aufgegeben wird. Diese personenbezogenen Daten sind erforderlich, um
        Ihre Bestellung durchführen zu können. Wir verarbeiten die folgenden
        personenbezogenen Daten im Bestellprozess:{" "}
        <span style={{ fontWeight: "bold" }}>
          Name - Adressdaten - Kontaktdaten - Bestellungsdaten - Transaktions- &
          Zahlungsdaten
        </span>
      </StyledTypography>

      <H5>Bewertungen</H5>
      <StyledTypography>
        Nach dem Bestellprozess werden Sie gebeten, das jeweilige Restaurant zu
        bewerten. Lowisy.com verarbeitet diese dann weiter und aktualisiert die
        Restaurantbewertungen dann automatisiert auf der Plattform. Die
        Einwilligung zum Versand dieser E-Mails kann jederzeit widerrufen
        werden, hierfür ist der Link “Schreib uns” auf Lowisy.com zu nutzen. Wir
        verarbeiten die folgenden personenbezogenen Daten, wenn eine
        Restaurantbewertung abgeben wird:
        <span style={{ fontWeight: "bold" }}>
          {" "}
          Name (optional) - Kontaktdaten - Bewertung
        </span>
      </StyledTypography>

      <H5>Kundenkonten</H5>
      <StyledTypography>
        Bei der Nutzung von Lowisy.com erhalten Kunden, basierend auf der
        Einwilligung, die Möglichkeit, Benutzerkonten anzulegen. Die
        Einwilligung zur Speicherung der Kundendaten kann jederzeit widerrufen
        werden, hierfür ist der Link “Schreib uns” auf Lowisy.com zu nutzen. Die
        folgenden personenbezogenen Daten werden in Verbindung mit einem
        Kundenkonto erfasst:{" "}
        <span style={{ fontWeight: "bold" }}>
          Name - Adressdaten - Kontaktdaten
        </span>
      </StyledTypography>

      <H5>Support</H5>
      <StyledTypography>
        Wenn Sie sich mit unserem Support Verbindung setzen, werden folgende
        personenbezogenen Daten verarbeitet, um ein optimales Kundenerlebnis
        bieten zu können:{" "}
        <span style={{ fontWeight: "bold" }}>
          Name - Adressdaten - Kontaktdaten - Bestellungsdaten - Transaktions- &
          Zahlungsdaten{" "}
        </span>
      </StyledTypography>

      <H5>Cookies</H5>
      <StyledTypography>
        Lowisy.com verwendet Cookies für Funktions- und Analysezwecke. Diese
        Daten werden nicht an Dritte weitergegeben.
      </StyledTypography>

      <H5>Analysis</H5>
      <StyledTypography>
        Lowisy.com verwendet anonymisierte Daten bezüglich der Nutzung der
        Plattform, um das Kundenerlebnis permanent optimieren zu können.
      </StyledTypography>

      <H5>Alter</H5>
      <StyledTypography>
        Lowisy.com kann das Alter der Besucher nicht verifizieren. Sollten wir
        personenbezogene Daten eines Minderjährigen oder einer
        geschäftsunfähigen Person ohne Einwilligung erfasst haben, so ist diese
        Information via “Schreib uns” Link an Lowisy.com zu senden. Die
        entsprechenden Daten werden dann umgehend gelöscht.
      </StyledTypography>

      <H5>Weitere Zwecke</H5>
      <StyledTypography>
        Wir werden Ihre personenbezogenen Daten ausschließlich für die oben
        beschriebenen Zwecke verwenden.
      </StyledTypography>
    </Box>
  );
};
