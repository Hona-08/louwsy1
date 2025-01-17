import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export const DeleteDialog = ({ open, handleClose, handleDelete, data }: any) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Delete Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete the selected {data}? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleDelete} color="error">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);
