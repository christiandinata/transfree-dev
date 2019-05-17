import {
  EXCHANGE_RATE,
} from '../types';

const initialState = {
  rates: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case EXCHANGE_RATE:
      return { rates: action.payload };
    default:
      return state;
  }
};
