import { connect } from 'react-redux';
import { loadProfile, updateProfile, uploadImage } from '../../lib/redux/User/ActionCreators';
import UserDashBoard from './UserDashBoard';

const mapStateToProps = (state) => {
  return {
    user: state.userProfile.user,
    message: state.userProfile.message,
    error: state.userProfile.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProfile: () => {
      dispatch(loadProfile());
    },
    updateProfile: (profile) => {
      dispatch(updateProfile(profile));
    },
    uploadImage: (file) => {
      dispatch(uploadImage(file));
    },
  };
};

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserDashBoard);

export default UserProfile;