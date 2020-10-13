import {
  USER_DATA,
  USER_DATA_ARRAY,
  USER_DATA_ARRAY_IN_PROGRESS
} from '../types';

//initial state for user data
const initialState = {
  user_data: null,
  user_data_array: null,
  inProgress: false
};
//for user
export default (state = initialState, action) => {
  switch(action.type) {
    //state for user data
    case USER_DATA:
      return { user_data: action.payload};
    // state for getting some user data
    case USER_DATA_ARRAY:
      return { user_data_array: action.payload};
    // state for getting some user data in progress
    case USER_DATA_ARRAY_IN_PROGRESS:
      return { inProgress: action.payload};
    default:
      return state;
  }
};
