import {
  PROFILE_CREATE,
  PROFILE_CREATE_PROGRESS,
  PROFILE_CREATE_ERROR
} from '../types';
//initial state for create profile
const initialState = {
  response: null,
  inProgress: false,
  errorMessage: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    // state for create profile
    case PROFILE_CREATE:
      return { response: action.payload };
    // state for proccessing creating profile
    case PROFILE_CREATE_PROGRESS:
      return { inProgress: action.payload };
    // state for showing error message in creating profile
    case PROFILE_CREATE_ERROR:
      return { errorMessage: action.payload };
    default:
      return state;
  }
}
