import {
  ID_VERIFY_CHECK,
  ID_VERIFY_CHECK_PROGRESS
} from '../types';

const initialState = {
  status: null,
  inProgress: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ID_VERIFY_CHECK:
      return { status: action.payload };
    case ID_VERIFY_CHECK_PROGRESS:
      return { inProgress: action.payload };
    default:
      return state;
  }
};
