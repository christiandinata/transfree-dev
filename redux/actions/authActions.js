import Router from 'next/router';
import axios from 'axios';
import {
  REGISTER,
  REGISTER_PROGRESS,
  AUTHENTICATE,
  AUTHENTICATE_PROGRESS,
  AUTHENTICATE_ERROR,
  DEAUTHENTICATE,
  USER_DATA,
  FORGOT_PROGRESS,
  FORGOT_SUCCESS,
  FORGOT_ERROR,
  RESET_PASSWORD_PROGRESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from '../types';
import { API } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';

// register user
const register = ({ fullname, email, password }, type) => {
  if (type !== 'register') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: REGISTER_PROGRESS, payload: true});
    axios.post(`${API}/${type}`, {fullname, email, password})
      .then((response) => {
        setCookie('token', response.data.token);
        const userData = response.data.user_data;
        setCookie('_id', userData._id)
        if (userData.role == 'admin') {
          Router.replace('/dashboard/home')
        } else {
          Router.replace('/phone');
        }
        dispatch({type: REGISTER, payload: response.data.token});
        dispatch({type: USER_DATA, payload: response.data.user_data});
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.response.status) {
          case 422:
            errorMessage = 'Email has been registered. Please choose different email address.';
            break;
          case 420:
            errorMessage = 'Email and password must be provided.';
            break;
          case 500:
            errorMessage = 'Interval server error! Try again!';
            break;
          default:
            errorMessage = 'Zzzzz. Something is wrong.';
            break;
        }

        dispatch({type: AUTHENTICATE_ERROR, payload: errorMessage});
      });
  };
};
// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ email, password }, type) => {
  if (type !== 'login') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: AUTHENTICATE_PROGRESS, payload: true});
    axios.post(`${API}/${type}`, { email, password })
      .then((response) => {
        setCookie('token', response.data.token);
        const userData = response.data.user_data;
        setCookie('_id', userData._id)
        if (userData.role == 'admin') {
          Router.replace('/dashboard/home')
        } else {
          if (userData.isApproved) {
            Router.replace('/account');
          } else {
            switch(userData.registrationStep) {
              case 1:
                Router.replace('/phone');
                break;
              case 2:
                Router.replace('/id-verification');
                break;
              case 3:
                Router.replace('/photo-verification');
                break;
              case 4:
                Router.replace('/account');
                break;
            }
          }
        }

        dispatch({type: AUTHENTICATE, payload: response.data.token});
        dispatch({type: USER_DATA, payload: response.data.user_data});
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.response.status) {
          case 401:
            errorMessage = 'Incorrect password. Please try again or you can reset your password.';
            break;
          case 500:
            errorMessage = 'Interval server error! Try again!';
            break;
          default:
            errorMessage = 'Zzzzz. Something is wrong.';
            break;
        }

        dispatch({type: AUTHENTICATE_ERROR, payload: errorMessage});


      });
  };
};

// gets the token from the cookie and saves it in the store
export const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({type: AUTHENTICATE, payload: token});
  };
};

// removing the token
export const deauthenticate = () => {
  return (dispatch) => {
    removeCookie('token');
    Router.replace('/');
    dispatch({type: DEAUTHENTICATE});
  };
};

export const forgot = ({ email }, type) => {
  if (type !== 'forgot') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: FORGOT_PROGRESS, payload: true});
    axios.post(`${API}/${type}`, { email })
      .then((response) => {
        if (response.status == 200)
        dispatch({type: FORGOT_SUCCESS, payload: response.data.message});
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        dispatch({type: FORGOT_ERROR, payload: errorMessage});


      });
  };
};

export const resetPassword = ({ newPassword, verifyPassword, token }, type) => {
  if (type !== 'resetPassword') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: RESET_PASSWORD_PROGRESS, payload: true});
    axios.post(`${API}/${type}`, { newPassword, verifyPassword, token })
      .then((response) => {
        if (response.status == 200)
        dispatch({type: RESET_PASSWORD_SUCCESS, payload: response.data.message});
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        dispatch({type: RESET_PASSWORD_ERROR, payload: errorMessage});


      });
  };
};

export default {
  register,
  authenticate,
  reauthenticate,
  deauthenticate,
  forgot,
  resetPassword
};
