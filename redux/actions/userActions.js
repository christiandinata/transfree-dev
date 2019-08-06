import Router from 'next/router';
import axios from 'axios';
import {
  USER_DATA,
  USER_DATA_ARRAY
} from '../types';
import { API } from '../../config';

const getUser = (uid, type) => {
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

const getAllUsers = (page, type) => {
  if (type !== 'getAllUsers') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.get(`${API}/${type}?page=`+page)
      .then((response) => {
        dispatch({type: USER_DATA_ARRAY, payload: response.data.user_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

const approveUser = ({uid} , type) => {
  if (type !== 'approveUser') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.post(`${API}/${type}`, {uid})
      .then((response) => {
        Router.push('/dashboard/users');
        console.log(response);
        //dispatch({type: USER_DATA_ARRAY, payload: response.data.user_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export default {
  getUser,
  getAllUsers,
  approveUser
};
