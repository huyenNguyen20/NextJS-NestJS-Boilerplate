import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeleteForm(props) {
  return (
    <Dialog open={props.openDelete} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle color="secondary" id="form-dialog-title">
        Delete Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to delete this user account?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          No
        </Button>
        <Button onClick={props.handleDelete} color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteForm;