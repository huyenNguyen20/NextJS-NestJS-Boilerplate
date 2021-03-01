import { connect } from 'react-redux';
import {
  loadUsers,
  loadProfile,
  updateProfile,
  deleteProfile,
  uploadImage,
} from '../../lib/redux/Admin/ActionCreators';
import AdminDashBoard from './AdminDashboard';

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
    user: state.admin.user,
    message: state.admin.message,
    error: state.admin.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => {
      dispatch(loadUsers());
    },
    loadProfile: (userId) => {
      dispatch(loadProfile(userId));
    },
    updateProfile: (profile, userId) => {
      dispatch(updateProfile(profile, userId));
    },
    deleteProfile: (userId) => {
      dispatch(deleteProfile(userId));
    },
    uploadImage: (file, userId) => {
      dispatch(uploadImage(file, userId));
    },
  };
};

const Admin = connect(mapStateToProps, mapDispatchToProps)(AdminDashBoard);

export default Admin;