import {
  REGISTER,
  REGISTER_PROGRESS,
  AUTHENTICATE,
  AUTHENTICATE_PROGRESS,
  AUTHENTICATE_ERROR,
  DEAUTHENTICATE,
  FORGOT_PROGRESS,
  FORGOT_SUCCESS,
  FORGOT_ERROR,
  RESET_PASSWORD_PROGRESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from '../types';

const initialState = {
  token: null,
  errorMessage: '',
  successMessage: '',
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
    case FORGOT_PROGRESS:
      return { inProgress: action.payload };
    case FORGOT_SUCCESS:
      return { successMessage: action.payload };
    case FORGOT_ERROR:
      return { errorMessage: action.payload };
    case RESET_PASSWORD_PROGRESS:
      return { inProgress: action.payload };
    case RESET_PASSWORD_SUCCESS:
      return { successMessage: action.payload };
    case RESET_PASSWORD_ERROR:
      return { errorMessage: action.payload };
    default:
      return state;
  }
};
