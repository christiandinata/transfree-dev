import Router from 'next/router';
import axios from 'axios';
import {
  USER_DATA,
  USER_DATA_ARRAY,
  USER_DATA_ARRAY_IN_PROGRESS
} from '../types';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';
//admin actions
//get user
const getUser = (uid, type, req) => {
  if (type !== 'user') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.get(`${API}/${type}?uid=`+uid, {
      headers: {
        Authorization: `Bearer ${getCookie('token', req)}`
      }
    })
      .then((response) => {
        dispatch({type: USER_DATA, payload: response.data.user_data});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

//by query
const getUsersByQuery = (page, query, type) => {
  if (type !== 'getUsersByQuery') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    dispatch({type: USER_DATA_ARRAY_IN_PROGRESS, payload: true});

    await axios.get(`${API}/${type}?page=`+page+`&q=`+query, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })

      .then((response) => {
        dispatch({type: USER_DATA_ARRAY, payload: response.data.user_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

const getAllUsers = (page, type, req) => {

  if (type !== 'getAllUsers') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    dispatch({type: USER_DATA_ARRAY_IN_PROGRESS, payload: true});
    await axios.get(`${API}/${type}?page=`+page, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        dispatch({type: USER_DATA_ARRAY, payload: response.data.user_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
//get all user that usign fill by admin feature
const getAllUsersFilledByAdmin = (page, type, req) => {

  if (type !== 'getAllUsersFilledByAdmin') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    dispatch({type: USER_DATA_ARRAY_IN_PROGRESS, payload: true});
    await axios.get(`${API}/${type}?page=`+page, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        dispatch({type: USER_DATA_ARRAY, payload: response.data.user_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
//approving new user
const approveUser = ({uid} , type, req) => {
  if (type !== 'approveUser') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.post(`${API}/${type}`, {uid}, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
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
//deleting user
const deleteUser = ({uid} , type,req) => {
  if (type !== 'deleteUser') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.post(`${API}/${type}`, {uid}, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
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
//updating user
const updateUser = (id, { fullname, email, idType, idNumber, idName, gender, dob, pob, address }, type, req) => {
  if (type !== 'user') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.put(`${API}/${id}/${type}`, { fullname, email, idType, idNumber, idName, gender, dob, pob, address }, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        Router.push('/dashboard/userfill');
        console.log(response);
        //dispatch({type: USER_DATA_ARRAY, payload: response.data.user_data_array});
      })
      .catch((error) => {
        console.log(error.response);
        throw new Error(error);
      });
  };
};

export default {
  getUser,
  getUsersByQuery,
  getAllUsers,
  getAllUsersFilledByAdmin,
  approveUser,
  deleteUser,
  updateUser,
};
