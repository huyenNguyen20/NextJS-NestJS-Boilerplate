import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ConfirmEmailForm(props) {
  return (
    <Dialog
      open={props.openConfirm}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle color="secondary" id="form-dialog-title">
        Send Confirmation Email
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          By clicking Send, you will receive a confirmation email to activate your email at Mern
          Template. By doing this, you will able to receive our latest emails and promotions. Please
          check your email for further instructions. Thank you!{' '}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleSendEmail} color="secondary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmEmailForm;