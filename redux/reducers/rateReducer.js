import {
  EXCHANGE_RATE
} from '../types';

//intial state for rates
const initialState = {
  rates: null
};

//states for rates exchange
export default (state = initialState, action) => {
  switch(action.type) {
    case EXCHANGE_RATE:
      return { rates: action.payload };
    default:
      return state;
  }
};
