import {
  VERIFY_PHONE,
  VERIFY_PHONE_PROGRESS,
  VERIFY_PHONE_CHECK,
  VERIFY_PHONE_ERROR,
} from '../types';

//initial state for verify
const initialState = {
  serviceSid: null,
  status: null,
  errorMessage: '',
  inProgress: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    //state for verifying phone number
    case VERIFY_PHONE:
      return { serviceSid: action.payload };
    //state for processing verify phone number
    case VERIFY_PHONE_PROGRESS:
      return { inProgress: action.payload };
    // state for check phone number status
    case VERIFY_PHONE_CHECK:
      return { status: action.payload };
    // state for showing error message while verifying phone number
    case VERIFY_PHONE_ERROR:
      return { errorMessage: action.payload };
    default:
      return state;
  }
};
