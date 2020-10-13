import {
  INITIAL_DATA_USER
} from '../types';

// initial data for data user
const initialState = {
  email:'',
  fullname:'',
  password:'',
  phonenumber:''
};

export default (state = initialState, action) => {
  switch(action.type) {
    // state for creating initial data user
    case INITIAL_DATA_USER:
      return ({ data_user: action.payload });
    default:
      return state;
  }
};