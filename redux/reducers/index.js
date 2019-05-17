import { combineReducers } from 'redux';
import authReducer from './authReducer';
import verifyReducer from './verifyReducer';
import userReducer from './userReducer';
import idReducer from  './idReducer';
import rateReducer from './rateReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  authentication: authReducer,
  verify: verifyReducer,
  user: userReducer,
  id: idReducer,
  rate: rateReducer,
  order: orderReducer
});

export default rootReducer;
