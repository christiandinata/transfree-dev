import Router from 'next/router';
import axios from 'axios';
import {
  PHOTO_UPLOAD_PROGRESS,
  PHOTO_UPLOAD_SUCCESS,
  PHOTO_UPLOAD_ERROR,
  USER_DATA,
  GET_PHOTO_PROGRESS,
  GET_PHOTO_SUCCESS,
  GET_PHOTO_ERROR,
  PHOTO_DATA
} from '../types';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';


// upload photos to server
const uploadPhoto = ({ photoId, photoFace, email }, type) => {
  if (type !== 'uploadPhoto') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: PHOTO_UPLOAD_PROGRESS, payload: true});
    axios.post(`${API}/${type}`, {photoId, photoFace, email}, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
      .then((response) => {
        dispatch({type: PHOTO_UPLOAD_SUCCESS, payload: response.data.successMessage});
        dispatch({type: USER_DATA, payload: response.data.user_data});
        Router.push('/account');
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.response.status) {
          case 501:
            errorMessage = 'Problem with uploading files to server.';
            break;
          default:
            errorMessage = 'Zzzzz. Something is wrong.';
            break;
        }
        dispatch({type: PHOTO_UPLOAD_ERROR, payload: errorMessage});
      })
      .finally(() => {
        dispatch({type: PHOTO_UPLOAD_PROGRESS, payload: false});
      })
  };
};

// upload photo without filling id data
const uploadPhotoFillAdmin = ({ photoId, photoFace, email }, type) => {
  if (type !== 'uploadPhotoFillAdmin') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: PHOTO_UPLOAD_PROGRESS, payload: true});
    axios.post(`${API}/v1/user/uploadPhotoFillAdmin`, {photoId, photoFace, email}, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
      .then((response) => {
        dispatch({type: PHOTO_UPLOAD_SUCCESS, payload: response.data.successMessage});
        dispatch({type: USER_DATA, payload: response.data.user_data});
        Router.push('/account');
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.response.status) {
          case 501:
            errorMessage = 'Problem with uploading files to server.';
            break;
          default:
            errorMessage = 'Zzzzz. Something is wrong.';
            break;
        }
        dispatch({type: PHOTO_UPLOAD_ERROR, payload: errorMessage});
      })
      .finally(() => {
        dispatch({type: PHOTO_UPLOAD_PROGRESS, payload: false});
      })
  };
};

const getPhoto = (_id, type) => {
  if(type !== 'getPhoto'){
    throw new Error('Wrong API Call!');
  }
  return (dispatch) => {
    dispatch({type: GET_PHOTO_PROGRESS, payload: true});
    axios.get(`${API}/getPhoto/${_id}`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
      .then((response) => {
        dispatch({type: GET_PHOTO_SUCCESS, payload: response.status});
        dispatch({type: PHOTO_DATA, payload: response.data});
      })
      .catch((error) => {
        dispatch({type: GET_PHOTO_ERROR, payload: error});
      });
  }
};

export default {
  uploadPhoto,
  uploadPhotoFillAdmin,
  getPhoto
};
