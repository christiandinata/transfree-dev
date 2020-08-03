import {
  INITIAL_DATA_USER
} from '../types';

const initialState = {
  email:'',
  fullname:'',
  password:'',
  phonenumber:''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case INITIAL_DATA_USER:
      return ({ data_user: action.payload });
    default:
      return state;
  }
};