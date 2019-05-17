import Router from 'next/router';
import axios from 'axios';
import {
  USER_DATA
} from '../types';
import { API } from '../../config';

const getUser = (uid, type) => {
  console.log(type);
  if (type !== 'user') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.get(`${API}/${type}?uid=`+uid)
      .then((response) => {
        dispatch({type: USER_DATA, payload: response.data.user_data});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export default {
  getUser,
};
