import {
  GENERATE_VA_NUMBER
} from '../types';
// initial state for generate VA number
const initialState = {
  vaNumber: '',
};
//state for generate VA number
export default (state = initialState, action) => {
  switch(action.type) {
    case GENERATE_VA_NUMBER:
      return { vaNumber: action.payload };
    default:
      return state;
  }
};
