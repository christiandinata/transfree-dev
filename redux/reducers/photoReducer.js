import {
  PHOTO_UPLOAD_PROGRESS,
  PHOTO_UPLOAD_SUCCESS,
  PHOTO_UPLOAD_ERROR,
  GET_PHOTO_PROGRESS,
  GET_PHOTO_SUCCESS,
  GET_PHOTO_ERROR,
  PHOTO_DATA,
} from '../types';
//initial state for upload photo
const initialState = {
  successMessage: '',
  errorMessage: '',
  inProgress: false,
  getProgress: false,
  photoData: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    // state for upload a photo
    case PHOTO_UPLOAD_PROGRESS:
      return { inProgress: action.payload };
    // showing success message state for upload photo 
    case PHOTO_UPLOAD_SUCCESS:
      return { successMessage: action.payload };
    // showing error message state while uploading photo
    case PHOTO_UPLOAD_ERROR:
      return { errorMessage: action.payload };
    // state for get photo progress
    case GET_PHOTO_PROGRESS:
      return { getProgress: action.payload };
    // state for showing success message while getting photo
    case GET_PHOTO_SUCCESS:
      return { successMessage: action.payload};
    // state for showing error message while getting photo
    case GET_PHOTO_ERROR:
      return { errorMessage : action.payload};
    //  state for getting photo data
    case PHOTO_DATA:
      return { photoData: action.payload};
    default:
      return state;
  }
};
