import authActions from './authActions';
import verifyActions from './verifyActions';
import idActions from './idActions';
import rateActions from './rateActions';
import orderActions from './orderActions';
import userActions from './userActions';
export default {
  ...authActions,
  ...verifyActions,
  ...idActions,
  ...rateActions,
  ...orderActions,
  ...userActions
}