import {
  GENERATE_VA_NUMBER
} from '../types';

const initialState = {
  vaNumber: '',
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GENERATE_VA_NUMBER:
      return { vaNumber: action.payload };
    default:
      return state;
  }
};
