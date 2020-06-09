import { combineReducers } from 'redux';
import authReducer from './authReducer';
import verifyReducer from './verifyReducer';
import userReducer from './userReducer';
import idReducer from  './idReducer';
import rateReducer from './rateReducer';
import orderReducer from './orderReducer';
import summaryReducer from './summaryReducer';
import vaReducer from './vaReducer';
import photoReducer from './photoReducer';
import fxMarginReducer from './fxMarginReducer';
import checkReducer from './checkReducer';
import complaintReducer from './complaintReducer';
const rootReducer = combineReducers({
  authentication: authReducer,
  verify: verifyReducer,
  user: userReducer,
  id: idReducer,
  rate: rateReducer,
  order: orderReducer,
  summary: summaryReducer,
  va: vaReducer,
  photo: photoReducer,
  fx: fxMarginReducer,
  ck: checkReducer,
  complaint : complaintReducer
});

export default rootReducer;
