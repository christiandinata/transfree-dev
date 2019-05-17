import Router from 'next/router';
import axios from 'axios';
import {
  VERIFY_PHONE,
  VERIFY_PHONE_CHECK,
  USER_DATA
} from '../types';
import { API } from '../../config';

// verify phone number
const verify = ({ phone, email }, type) => {
  if (type !== 'verify') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios.post(`${API}/${type}`, {phone, email})
      .then((response) => {
        Router.push('/phone-verification');
        dispatch({type: VERIFY_PHONE, payload: response.data.serviceSid});
        dispatch({type: USER_DATA, payload: response.data.user_data});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

// check phone number verification
const check = ({ serviceSid, phone, code, email }, type) => {
  if (type !== 'check') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios.post(`${API}/${type}`, {serviceSid, phone, code, email})
      .then((response) => {
        if(response.data.status == 'approved') {
          Router.push('/id-verification');
          dispatch({type: VERIFY_PHONE_CHECK, payload: response.data.status});
          dispatch({type: USER_DATA, payload: response.data.user_data});
        } else {
          alert('Code is invalid');
        }

      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};



export default {
  verify,
  check
};
