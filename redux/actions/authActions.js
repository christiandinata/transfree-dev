import Router from 'next/router';
import axios from 'axios';
import {
  REGISTER,
  AUTHENTICATE,
  AUTHENTICATE_ERROR,
  DEAUTHENTICATE,
  USER_DATA,
} from '../types';
import { API } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';

// register user
const register = ({ fullname, email, password }, type) => {
  if (type !== 'register') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios.post(`${API}/${type}`, {fullname, email, password})
      .then((response) => {
        setCookie('token', response.data.token);
        const userData = JSON.parse(response.data.user_data);
        setCookie('_id', userData._id)
        Router.push('/phone');
        // const userData = JSON.stringify()
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
    axios.post(`${API}/${type}`, { email, password })
      .then((response) => {
        setCookie('token', response.data.token);
        const userData = JSON.parse(response.data.user_data);
        setCookie('_id', userData._id)
        if (userData.isApproved) {
          Router.push('/account');
        } else {
          switch(userData.registrationStep) {
            case 1:
              Router.push('/phone');
              break;
            case 2:
              Router.push('/id-verification');
              break;
            case 3:
              Router.push('/account');
              break;
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
    Router.push('/');
    dispatch({type: DEAUTHENTICATE});
  };
};

export default {
  register,
  authenticate,
  reauthenticate,
  deauthenticate,
};
