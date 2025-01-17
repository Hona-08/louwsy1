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
import useLocales from 'src/hooks/useLocales';

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

export const klarnaHtml = (snippet: any) => {
  return `
       <html>
       <head> </head>
    
       <body>
       <textarea style="display: none" id="KCO">
                ${snippet}
        </textarea
          >
    
          <div id="my-checkout-container"></div>
    
          <!-- START - Dont edit -->
          <script type="text/javascript">
             var checkoutContainer = document.getElementById(
                "my-checkout-container"
             );
             checkoutContainer.innerHTML = document
                .getElementById("KCO")
                .value.replace(/\\"/g, '"')
                .replace(/\\n/g, "");
             var scriptsTags = checkoutContainer.getElementsByTagName("script");
             for (var i = 0; i < scriptsTags.length; i++) {
                var parentNode = scriptsTags[i].parentNode;
                var newScriptTag = document.createElement("script");
                newScriptTag.type = "text/javascript";
                newScriptTag.text = scriptsTags[i].text;
                parentNode.removeChild(scriptsTags[i]);
                parentNode.appendChild(newScriptTag);
             }
          </script>
          <!-- END -->
       </body>
    </html>
    
       `;
};

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

export default function CustomizedDialogs({ open, setOpen, htmlSnippet }: any) {
 
  const handleClose = () => {
    setOpen(false);
  };
  const { translate } = useLocales();

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '700px', // Set your width here
            },
          },
        }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {translate('pay_via')} (klarna)
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <iframe
            height={'800px'}
            width="100%"
            title="klarnaCheckout"
            className="iframe"
            srcDoc={klarnaHtml(htmlSnippet)}
            frameBorder="0"
          />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
