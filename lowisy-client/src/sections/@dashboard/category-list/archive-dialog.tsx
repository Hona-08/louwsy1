import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export const ArchiveDialog = ({ open, handleClose, handleArchive, title, data }: any) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{title} Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to {title} the selected {data}? This action can be done again.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleArchive} color="error">
        {title}
      </Button>
    </DialogActions>
  </Dialog>
);
