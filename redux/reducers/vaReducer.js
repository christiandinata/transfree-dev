import {
  GENERATE_VA_TOKEN
} from '../types';

const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GENERATE_VA_TOKEN:
      return { token: action.payload };
    default:
      return state;
  }
};
