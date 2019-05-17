import {
  ORDER_DATA,
  ORDER_DATA_ARRAY
} from '../types';

const initialState = {
  order: null,
  orders: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ORDER_DATA:
      return { order: action.payload };
    case ORDER_DATA_ARRAY:
      return { orders: action.payload };
    default:
      return state;
  }
};
