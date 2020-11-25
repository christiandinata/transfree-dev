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
//initial state for authentication 
const initialState = {
  token: null,
  errorMessage: '',
  successMessage: '',
  inProgress: false
};
//state for authenitcation while register
export default (state = initialState, action) => {
  switch(action.type) {
    // State for register user
    case REGISTER:
      return { token: action.payload };
    //  state for register user in progress
    case REGISTER_PROGRESS:
      return { inProgress: action.payload };
    // state for authenticate user
    case AUTHENTICATE:
      return { token: action.payload };
    //  state for processing authenticate user 
    case AUTHENTICATE_PROGRESS:
      return { inProgress: action.payload };
    // state for showing error message while authenticate user
    case AUTHENTICATE_ERROR:
      return { errorMessage: action.payload };
    // state for deauthenticate user
    case DEAUTHENTICATE:
      return { token: null };
    // state for forgot password
    case FORGOT_PROGRESS:
      return { inProgress: action.payload };
    // state for forgot password success
    case FORGOT_SUCCESS:
      return { successMessage: action.payload };
    // state for forgot password error 
    case FORGOT_ERROR:
      return { errorMessage: action.payload };
    // state for processing reset password
    case RESET_PASSWORD_PROGRESS:
      return { inProgress: action.payload };
    // state for reset password success
    case RESET_PASSWORD_SUCCESS:
      return { successMessage: action.payload };
    // state for reset password error 
    case RESET_PASSWORD_ERROR:
      return { errorMessage: action.payload };
    default:
      return state;
  }
};
