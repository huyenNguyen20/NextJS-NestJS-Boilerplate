import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputLabel } from '@material-ui/core';

class UploadImageForm extends React.Component {
  state = {
    file: '',
    fileName: '',
    error: '',
  };

  handleOnChange = (e) => {
    const fileName = e.target.value;
    const file = e.target.files[0];
    this.setState({ fileName, file });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.props.uploadImage(this.state.file, this.state.fileName);
      this.setState({
        file: '',
        fileName: '',
        error: '',
      });
      this.props.handleClose();
    }
  };

  isValid = () => {
    if (!this.state.fileName) {
      this.setState({ error: 'File is Required' });
      return false;
    }
    const { fileName } = this.state;
    if (!['jpg', 'jpeg', 'png', 'gif'].includes(fileName.split('.')[1])) {
      this.setState({ error: 'jpg/jpeg/gif/png file is required. ' });
      return false;
    }
    this.setState({ error: '' });
    return true;
  };

  render() {
    return (
      <Dialog
        open={this.props.openImage}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle color="secondary" id="form-dialog-title">
          Upload Image
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your profile avatar, please upload image and press Submit.
          </DialogContentText>
          <InputLabel>File</InputLabel>
          <input
            type="file"
            name="imageFile"
            style={{ margin: '20px 0' }}
            onChange={this.handleOnChange}
            value={this.state.fileName}
          />
          {this.state.error ? <span style={{ color: 'red' }}>{this.state.error}</span> : <span />}
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

export default UploadImageForm;