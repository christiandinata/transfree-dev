import {
  VERIFY_PHONE,
  VERIFY_PHONE_PROGRESS,
  VERIFY_PHONE_CHECK,
  VERIFY_PHONE_ERROR,
} from '../types';

const initialState = {
  serviceSid: null,
  status: null,
  errorMessage: '',
  inProgress: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case VERIFY_PHONE:
      return { serviceSid: action.payload };
    case VERIFY_PHONE_PROGRESS:
      return { inProgress: action.payload };
    case VERIFY_PHONE_CHECK:
      return { status: action.payload };
    case VERIFY_PHONE_ERROR:
      return { errorMessage: action.payload };
    default:
      return state;
  }
};
