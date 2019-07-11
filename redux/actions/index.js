import authActions from './authActions';
import verifyActions from './verifyActions';
import idActions from './idActions';
import rateActions from './rateActions';
import orderActions from './orderActions';
import userActions from './userActions';
import vaActions from './vaActions';
export default {
  ...authActions,
  ...verifyActions,
  ...idActions,
  ...rateActions,
  ...orderActions,
  ...userActions,
  ...vaActions
}
