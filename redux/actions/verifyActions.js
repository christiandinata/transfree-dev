import Router from 'next/router';
import axios from 'axios';
import {
  VERIFY_PHONE,
  VERIFY_PHONE_PROGRESS,
  VERIFY_PHONE_CHECK,
  INITIAL_DATA_USER,
  VERIFY_PHONE_ERROR,
  USER_DATA,
  AUTHENTICATE_ERROR,
  AUTHENTICATE_PROGRESS
} from '../types';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';


// verify phone number
const verify = ({ phone, email,fullname,password }, type) => {
  if (type !== 'verify') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: AUTHENTICATE_PROGRESS, payload: true});
    axios.post(`${API}/v1/${type}`, {email,phone}) 
    // axios.post(`${API}/login`, { email, password })
      .then((response) => {          
          console.log(response);
          dispatch({type: VERIFY_PHONE, payload:response.data.serviceSid});
          dispatch({type:INITIAL_DATA_USER,payload:({email,fullname,password,phone})});
          dispatch({type: AUTHENTICATE_PROGRESS, payload: false});
          Router.push('/phone-verification');
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.response.status) {
          case 422:
            errorMessage = error.response.data.message;
            break;
        }
        dispatch({type: AUTHENTICATE_ERROR, payload: errorMessage});
      });
  };
};

// check phone number verification
const check = ({ serviceSid, phone, code, email }, type,condition, req) => {
  if (type !== 'check') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: VERIFY_PHONE_PROGRESS, payload: true});
    axios.post(`${API}/${type}`, {serviceSid, phone, code, email}, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
         if(response.data.status == 'approved') {
           if (condition!='edit') {
            Router.push('/id-verification');
           }else{
             alert("Update Phone Number Success")
             Router.push('/profile')
           }
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
