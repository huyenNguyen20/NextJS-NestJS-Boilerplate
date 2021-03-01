import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as classes from '../lib/styles/styles';

class EditProfileForm extends React.Component {
  state = {
    user: {
      firstName: this.props.user.firstName || '',
      lastName: this.props.user.lastName || '',
      email: this.props.user.email || '',
    },
    error: {},
  };

  handleOnChange = (e) => {
    const { name } = e.target;
    const user = { ...this.state.user };
    user[name] = e.target.value;
    this.setState({ user, error: {} });
  };

  isValid = () => {
    if (!this.state.user.email) {
      this.setState({ error: { email: 'Email is Required.' } });
      return false;
    }
    if (!this.state.user.email.trim().match(/.+@.+\..+/)) {
      this.setState({ error: { email: 'Invalid Email. Please try agains!' } });
      return false;
    }
    this.setState({ error: {} });
    return true;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.props.handleUpdate(this.state.user);
      this.setState({
        user: {
          firstName: this.props.user.firstName || '',
          lastName: this.props.user.lastName || '',
          email: this.props.user.email || '',
        },
      });
      this.props.handleClose();
    }
  };

  render() {
    return (
      <Dialog
        open={this.props.openEdit}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle color="secondary" id="form-dialog-title">
          Edit Form
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your profile information, please fill in the form below and press Submit.
          </DialogContentText>
          <TextField
            name="firstName"
            value={this.state.user.firstName}
            onChange={this.handleOnChange}
            label="First Name"
            margin="normal"
            style={classes.textField}
          />
          <TextField
            name="lastName"
            value={this.state.user.lastName}
            onChange={this.handleOnChange}
            label="Last Name"
            margin="normal"
            style={classes.textField}
          />
          <TextField
            name="email"
            value={this.state.user.email}
            onChange={this.handleOnChange}
            label="Email"
            margin="normal"
            style={classes.textField}
            helperText={
              this.state.error.email
                ? this.state.error.email
                : 'Email is Required. Email should be like abc@example.com'
            }
            error={!!this.state.error.email}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditProfileForm;