import {
  USER_DATA
} from '../types';

const initialState = {
  user_data: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case USER_DATA:
      return { user_data: action.payload};
    default:
      return state;
  }
};
