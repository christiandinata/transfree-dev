import {
  ID_VERIFY_CHECK
} from '../types';

const initialState = {
  status: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ID_VERIFY_CHECK:
      return { status: action.payload };
    default:
      return state;
  }
};
