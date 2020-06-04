import {
  PHOTO_UPLOAD_PROGRESS,
  PHOTO_UPLOAD_SUCCESS,
  PHOTO_UPLOAD_ERROR,
  GET_PHOTO_PROGRESS,
  GET_PHOTO_SUCCESS,
  GET_PHOTO_ERROR,
} from '../types';

const initialState = {
  successMessage: '',
  errorMessage: '',
  inProgress: false,
  getProgress: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case PHOTO_UPLOAD_PROGRESS:
      return { inProgress: action.payload };
    case PHOTO_UPLOAD_SUCCESS:
      return { successMessage: action.payload };
    case PHOTO_UPLOAD_ERROR:
      return { errorMessage: action.payload };
    case GET_PHOTO_PROGRESS:
      return { getProgress: action.payload };
    case GET_PHOTO_SUCCESS:
      return { successMessage: action.payload};
    case GET_PHOTO_ERROR:
      return { errorMessage : action.payload};
    default:
      return state;
  }
};
