import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import UserReducer from './User/UserReducer';
import AdminReducer from './Admin/AdminReducer';

const ConfigStore = () => {
  const store = createStore(
    combineReducers({
      userProfile: UserReducer,
      admin: AdminReducer,
    }),
    applyMiddleware(thunk, logger),
  );
  return store;
};

export default ConfigStore;