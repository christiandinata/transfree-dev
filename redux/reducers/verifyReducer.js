import {
  VERIFY_PHONE,
  VERIFY_PHONE_CHECK
} from '../types';

const initialState = {
  serviceSid: null,
  status: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case VERIFY_PHONE:
      return { serviceSid: action.payload };
    case VERIFY_PHONE_CHECK:
      return { status: action.payload };
    default:
      return state;
  }
};
