import {
  ID_VERIFY_CHECK,
  ID_VERIFY_CHECK_PROGRESS
} from '../types';

// initial state for ID Verify
const initialState = {
  status: null,
  inProgress: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    // state for ID Verify check
    case ID_VERIFY_CHECK:
      return { status: action.payload };
    // state for ID verify check in process
    case ID_VERIFY_CHECK_PROGRESS:
      return { inProgress: action.payload };
    default:
      return state;
  }
};
