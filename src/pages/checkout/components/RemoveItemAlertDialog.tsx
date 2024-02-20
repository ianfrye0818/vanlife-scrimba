import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

type RemoveItemDialogProps = {
  removeItem: (itemId: string) => void;
  itemId: string;
};

export default function RemoveItemDialog({ removeItem, itemId }: RemoveItemDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <span
        className='text-sm text-gray-500 cursor-pointer underline'
        onClick={handleClickOpen}
      >
        Remove
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Remove Item from Cart?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to remove this item from your cart? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => removeItem(itemId)}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
