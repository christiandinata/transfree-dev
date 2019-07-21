import {
  USER_DATA,
  USER_DATA_ARRAY
} from '../types';

const initialState = {
  user_data: null,
  user_data_array: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case USER_DATA:
      return { user_data: action.payload};
    case USER_DATA_ARRAY:
      return { user_data_array: action.payload};
    default:
      return state;
  }
};
