import {
  REGISTER,
  REGISTER_PROGRESS,
  AUTHENTICATE,
  AUTHENTICATE_PROGRESS,
  AUTHENTICATE_ERROR,
  DEAUTHENTICATE
} from '../types';

const initialState = {
  token: null,
  errorMessage: '',
  inProgress: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case REGISTER:
      return { token: action.payload };
    case REGISTER_PROGRESS:
      return { inProgress: action.payload };
    case AUTHENTICATE:
      return { token: action.payload };
    case AUTHENTICATE_PROGRESS:
      return { inProgress: action.payload };
    case AUTHENTICATE_ERROR:
      return { errorMessage: action.payload };
    case DEAUTHENTICATE:
      return { token: null };
    default:
      return state;
  }
};
