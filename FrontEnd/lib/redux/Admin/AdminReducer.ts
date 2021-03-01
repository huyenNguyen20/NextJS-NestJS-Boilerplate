import * as ActionTypes from './ActionTypes';

const initialState = {
  users: [],
  user: {},
  message: '',
  error: false,
};

const AdminReducer = function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_USERS_REQUEST:
      return state;
    case ActionTypes.LOAD_USERS_SUCCESS:
      return { ...state, users: action.users };
    case ActionTypes.LOAD_USERS_FAILURE:
      return { ...state, error: action.error, message: action.message };
    case ActionTypes.LOAD_PROFILE_REQUEST:
      return state;
    case ActionTypes.LOAD_PROFILE_SUCCESS:
      return { ...state, user: action.user };
    case ActionTypes.LOAD_PROFILE_FAILURE:
      return { ...state, error: action.error, message: action.message };
    case ActionTypes.UPDATE_PROFILE_REQUEST:
      return state;
    case ActionTypes.UPDATE_PROFILE_SUCCESS:
      return { ...state, message: action.message };
    case ActionTypes.UPDATE_PROFILE_FAILURE:
      return { ...state, error: action.error, message: action.message };
    case ActionTypes.DELETE_PROFILE_REQUEST:
      return state;
    case ActionTypes.DELETE_PROFILE_SUCCESS:
      return { ...state, message: action.message };
    case ActionTypes.DELETE_PROFILE_FAILURE:
      return { ...state, error: action.error, message: action.message };
    case ActionTypes.UPLOAD_IMAGE_REQUEST:
      return state;
    case ActionTypes.UPLOAD_IMAGE_SUCCESS:
      return { ...state, message: action.message };
    case ActionTypes.UPLOAD_IMAGE_FAILURE:
      return { ...state, error: action.error, message: action.message };

    default:
      return state;
  }
};

export default AdminReducer;