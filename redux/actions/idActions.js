import Router from 'next/router';
import axios from 'axios';
import {
  USER_DATA
} from '../types';
import { API } from '../../config';

// verify id details
const verifyId = ({ idType, idNumber, idName, dob, address, email }, type) => {
  if (type !== 'verifyId') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios.post(`${API}/${type}`, {idType, idNumber, idName, dob, address, email})
      .then((response) => {
        Router.push('/account');
        dispatch({type: USER_DATA, payload: response.data.user_data});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export default {
  verifyId,
};
