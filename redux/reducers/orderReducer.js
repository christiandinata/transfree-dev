import {
  ORDER_DATA,
  ORDER_DATA_ARRAY,
  ORDER_DATA_ARRAY_IN_PROGRESS
} from '../types';

// initial state for order
const initialState = {
  order: null,
  orders: null,
  inProgress: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    //state for order data
    case ORDER_DATA:
      return { order: action.payload };
    //state for some order data
    case ORDER_DATA_ARRAY:
      return { orders: action.payload };
    //state for order data in progress
    case ORDER_DATA_ARRAY_IN_PROGRESS:
      return { inProgress: action.payload};
    default:
      return state;
  }
};
