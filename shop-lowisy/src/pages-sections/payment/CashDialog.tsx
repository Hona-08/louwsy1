import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import LazyImage from 'components/LazyImage';
import { H1, Paragraph } from 'components/Typography';
import { Link } from 'react-scroll';
import BazaarCard from 'components/BazaarCard';
import BazaarButton from 'components/BazaarButton';
import { useTranslation } from 'next-i18next';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

// custom styled components
const Wrapper = styled(BazaarCard)(() => ({
    margin: "auto",
    padding: "3rem",
    maxWidth: "630px",
    textAlign: "center",
  }));
  
  const StyledButton = styled(BazaarButton)(() => ({
    marginTop: "2rem",
    padding: "11px 24px",
  }));


function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CashDialog({open,setOpen}: any) {
    const { t } = useTranslation("common");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "700px",  // Set your width here
              },
            },
          }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Paid Via (Cash)
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Container sx={{ mt: 4, mb: 20,   margin: "auto",
    padding: "3rem",
    maxWidth: "630px",
    textAlign: "center", }}>
          <LazyImage
            src="/assets/images/illustrations/party-popper.svg"
            width={116}
            height={116}
          />
          <H1 lineHeight={1.1} mt="1.5rem">
            {t("Your-order-is-completed")}
          </H1>

          <Paragraph color="grey.800" mt="0.3rem">
            {t("You-will-be-receiving-confirmation-email-with-order-details")}
          </Paragraph>

      </Container>

        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}