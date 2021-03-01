// import Client from "../api/Client";
import * as ActionTypes from './ActionTypes';
import adminApi from '../../api/adminApi';

const loadUsersRequest = () => {
  return {
    type: ActionTypes.LOAD_USERS_REQUEST,
  };
};

const loadUsersSuccess = (resp) => {
  return {
    type: ActionTypes.LOAD_USERS_SUCCESS,
    users: resp.response.users,
  };
};

const loadUsersFailure = (err) => {
  return {
    type: ActionTypes.LOAD_USERS_FAILURE,
    error: true,
    message: err.message || err.response.message,
  };
};
const loadProfileRequest = () => {
  return {
    type: ActionTypes.LOAD_PROFILE_REQUEST,
  };
};

const loadProfileSuccess = (resp) => {
  return {
    type: ActionTypes.LOAD_PROFILE_SUCCESS,
    user: resp.response.user,
  };
};

const loadProfileFailure = (err) => {
  return {
    type: ActionTypes.LOAD_PROFILE_FAILURE,
    error: true,
    message: err.message || err.response.message,
  };
};

const updateProfileRequest = () => {
  return {
    type: ActionTypes.UPDATE_PROFILE_REQUEST,
  };
};

const updateProfileSuccess = (resp) => {
  return {
    type: ActionTypes.UPDATE_PROFILE_SUCCESS,
    message: resp.message || resp.response.message,
  };
};

const updateProfileFailure = (err) => {
  return {
    type: ActionTypes.UPDATE_PROFILE_FAILURE,
    error: true,
    message: err.message || err.response.message,
  };
};

const deleteProfileRequest = () => {
  return {
    type: ActionTypes.DELETE_PROFILE_REQUEST,
  };
};

const deleteProfileSuccess = (resp) => {
  return {
    type: ActionTypes.DELETE_PROFILE_SUCCESS,
    message: resp.message || resp.response.message,
  };
};

const deleteProfileFailure = (err) => {
  return {
    type: ActionTypes.DELETE_PROFILE_FAILURE,
    error: true,
    message: err.message || err.response.message,
  };
};
const uploadImageRequest = () => {
  return {
    type: ActionTypes.UPLOAD_IMAGE_REQUEST,
  };
};

const uploadImageSuccess = (resp) => {
  return {
    type: ActionTypes.UPLOAD_IMAGE_SUCCESS,
    message: resp.message || resp.response.message,
  };
};

const uploadImageFailure = (err) => {
  return {
    type: ActionTypes.UPLOAD_IMAGE_FAILURE,
    error: true,
    message: err.message || err.response.message,
  };
};

export const loadUsers = () => (dispatch) => {
  dispatch(loadUsersRequest());
  adminApi
    .fetchUsers()
    .then((resp) => {
      if (resp.success) dispatch(loadUsersSuccess(resp));
      else throw resp;
    })
    .catch((err) => dispatch(loadUsersFailure(err)));
};

export const loadProfile = (userId) => (dispatch) => {
  dispatch(loadProfileRequest());
  adminApi
    .fetchUser(userId)
    .then((resp) => {
      if (resp.success) dispatch(loadProfileSuccess(resp));
      else throw resp;
    })
    .catch((err) => dispatch(loadProfileFailure(err)));
};

export const updateProfile = (profile, userId) => (dispatch) => {
  dispatch(updateProfileRequest());
  adminApi
    .updateUser(profile, userId)
    .then((resp) => {
      if (resp.success) dispatch(updateProfileSuccess(resp));
      else throw resp;
    })
    .catch((err) => dispatch(updateProfileFailure(err)));
};

export const deleteProfile = (userId) => (dispatch) => {
  dispatch(deleteProfileRequest());
  adminApi
    .deleteUser(userId)
    .then((resp) => {
      if (resp.success) dispatch(deleteProfileSuccess(resp));
      else throw resp;
    })
    .catch((err) => dispatch(deleteProfileFailure(err)));
};

export const uploadImage = (file, userId) => (dispatch) => {
  console.log('userId in uploadImage', userId);
  dispatch(uploadImageRequest());
  adminApi
    .uploadProfileImage(file, userId)
    .then((resp) => {
      if (resp.success) dispatch(uploadImageSuccess(resp));
      else throw resp;
    })
    .catch((err) => dispatch(uploadImageFailure(err)));
};