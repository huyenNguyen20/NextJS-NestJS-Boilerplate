import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  List,
  Typography,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  IconButton,
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { notify } from '../Notifier';
import UserProfile from '../UserProfile';
import * as classes from '../../lib/styles/styles';
import auth from '../../lib/api/adminApi';

class AdminDashBoard extends React.Component {
  static propsTypes = {
    users: PropTypes.array,
    user: PropTypes.object.isRequired,
    message: PropTypes.string,
    loadUsers: PropTypes.func.isRequired,
    loadProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
  };

  state = {
    showUserProfile: false,
    shouldRerender: false,
    openEditForm: false,
    openImageForm: false,
    openDeleteForm: false,
    openConfirmEmailForm: false,
    userId: '',
  };

  componentDidMount() {
    this.props.loadUsers();
    if (this.props.message) notify({ message: this.props.message });
  }

  componentDidUpdate() {
    if (this.state.shouldRerender) {
      this.setState({shouldRerender : false})
      this.props.loadUsers();
      if (this.props.message) notify({ message: this.props.message });
      
    }
  }

  showUserProfile = (userId) => {
    this.props.loadProfile(userId);
    this.setState({ showUserProfile: true, userId });
  };

  handleUpdateProfile = (profile) => {
    this.props.updateProfile(profile, this.state.userId);
    this.setState({ shouldRerender: true });
  };

  handleDeleteProfile = () => {
    this.props.deleteProfile(this.state.userId);
    this.setState({ shouldRerender: true });
  };

  handleUploadImage = (file) => {
    this.props.uploadImage(file, this.state.userId);
    this.setState({ shouldRerender: true });
  };

  handleSendEmail = async () => {
    this.toggleConfirmEmailForm();
    const resp = await auth.sendConfirmEmail(this.state.userId);
    resp.message && notify({ message: resp.message });
  };

  toggleEditForm = () => {
    this.setState({ openEditForm: !this.state.openEditForm });
  };

  toggleImageForm = () => {
    this.setState({ openImageForm: !this.state.openImageForm });
  };

  toggleDeleteForm = () => {
    this.setState({ openDeleteForm: !this.state.openDeleteForm });
  };

  toggleConfirmEmailForm = () => {
    this.setState({ openConfirmEmailForm: !this.state.openConfirmEmailForm });
  };

  backToUserList = () => {
    this.setState({ showUserProfile: false, userId: '' });
  };

  render() {
    if (this.state.showUserProfile && this.props.user)
      return (
        <UserProfile
          toggleImageForm={this.toggleImageForm}
          toggleEditForm={this.toggleEditForm}
          toggleDeleteForm={this.toggleDeleteForm}
          toggleConfirmEmailForm={this.toggleConfirmEmailForm}
          backToUserList={this.backToUserList}
          user={this.props.user}
          openEditForm={this.state.openEditForm}
          openImageForm={this.state.openImageForm}
          openDeleteForm={this.state.openDeleteForm}
          openConfirmEmailForm={this.state.openConfirmEmailForm}
          handleUpdateProfile={this.handleUpdateProfile}
          handleDeleteProfile={this.handleDeleteProfile}
          handleUploadImage={this.handleUploadImage}
          handleSendEmail={this.handleSendEmail}
        />
      );
    return (
      <div>
        <Grid container spacing={3} justify="center" style={classes.container}>
          <Grid item sx={10} sm={8} md={4}>
            <Paper style={{ padding: '10px' }} elevation={4}>
              <Typography style={{ margin: '20px' }} color="secondary" variant="h6">
                Users List
              </Typography>
              <List>
                {this.props.users.length > 0 &&
                  this.props.users.map((user, idx) => {
                    return (
                      <ListItem key={idx}>
                        <ListItemAvatar style={{ marginRight: '20px' }}>
                          <Avatar
                            style={{ width: '50px', height: 'auto', borderRadius: '50%' }}
                            src={
                              user.avatarUrl ||
                              'https://cdn4.iconfinder.com/data/icons/green-shopper/1068/user.png'
                            }
                            alt="User Profile Image"
                          />
                        </ListItemAvatar>
                        <ListItemText primary={user.displayName} secondary={user.email} />
                        <IconButton onClick={() => this.showUserProfile(user._id)}>
                          <ArrowForward />
                        </IconButton>
                      </ListItem>
                    );
                  })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AdminDashBoard;