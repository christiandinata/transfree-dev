import {
  PHOTO_UPLOAD_PROGRESS,
  PHOTO_UPLOAD_SUCCESS,
  PHOTO_UPLOAD_ERROR,
} from '../types';

const initialState = {
  successMessage: '',
  errorMessage: '',
  inProgress: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case PHOTO_UPLOAD_PROGRESS:
      return { inProgress: action.payload };
    case PHOTO_UPLOAD_SUCCESS:
      return { successMessage: action.payload };
    case PHOTO_UPLOAD_ERROR:
      return { errorMessage: action.payload };
    default:
      return state;
  }
};
