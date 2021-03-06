import authActions from './authActions';
import verifyActions from './verifyActions';
import idActions from './idActions';
import rateActions from './rateActions';
import orderActions from './orderActions';
import userActions from './userActions';
import vaActions from './vaActions';
import photoActions from './photoActions';
import fxMarginActions from './fxMarginActions';
import checkActions from './checkActions';
import complaintActions from './complaintActions';
import donasiActions from './donasiActions'
import profileActions from './profileActions'
import notificationActions from './notificationActions';
import eventActions from './eventActions'

//exporting all action
export default {
  ...authActions,
  ...verifyActions,
  ...idActions,
  ...rateActions,
  ...orderActions,
  ...userActions,
  ...vaActions,
  ...photoActions,
  ...fxMarginActions,
  ...checkActions,
  ...complaintActions,
  ...donasiActions,
  ...profileActions,
  ...notificationActions,
  ...eventActions
}
