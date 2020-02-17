import Router from 'next/router';
import axios from 'axios';
import {
  USER_DATA,
  ID_VERIFY_CHECK_PROGRESS
} from '../types';
import { API } from '../../config';

// verify id details
const verifyId = ({ idType, idNumber, idName, dob, address, email, pob, gender }, type) => {
  if (type !== 'verifyId') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: ID_VERIFY_CHECK_PROGRESS, payload: true});
    axios.post(`${API}/${type}`, {idType, idNumber, idName, dob, address, email, pob, gender})
      .then((response) => {
        Router.push('/photo-verification');
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
