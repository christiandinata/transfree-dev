import {
  PROFILE_CREATE,
  PROFILE_CREATE_PROGRESS,
  PROFILE_CREATE_ERROR
} from '../types';

const initialState = {
  response: null,
  inProgress: false,
  errorMessage: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case PROFILE_CREATE:
      return { response: action.payload };
    case PROFILE_CREATE_PROGRESS:
      return { inProgress: action.payload };
    case PROFILE_CREATE_ERROR:
      return { errorMessage: action.payload };
    default:
      return state;
  }
}
