import Router from 'next/router';
import axios from 'axios';
import {
  PHOTO_UPLOAD_PROGRESS,
  PHOTO_UPLOAD_SUCCESS,
  PHOTO_UPLOAD_ERROR,
  USER_DATA
} from '../types';
import { API } from '../../config';

// upload photos to server
const uploadPhoto = ({ photoId, photoFace, email }, type) => {
  if (type !== 'uploadPhoto') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: PHOTO_UPLOAD_PROGRESS, payload: true});
    axios.post(`${API}/${type}`, {photoId, photoFace, email})
      .then((response) => {
        Router.push('/account');
        dispatch({type: PHOTO_UPLOAD_SUCCESS, payload: response.data.successMessage});
        dispatch({type: USER_DATA, payload: response.data.user_data});
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
      });
  };
};



export default {
  uploadPhoto
};
