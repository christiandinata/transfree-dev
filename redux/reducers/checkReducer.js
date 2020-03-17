import {
    ORDER_DATA,
    ORDER_DATA_ARRAY,
    ORDER_DATA_ARRAY_IN_PROGRESS
  } from '../types';
  
  const initialState = {
    order: null,
    orders: null,
    inProgress: false
  };
  
  export default (state = initialState, action) => {
    switch(action.type) {
      case ORDER_DATA:
        return { order: action.payload };
      case ORDER_DATA_ARRAY:
        return { orders: action.payload };
      case ORDER_DATA_ARRAY_IN_PROGRESS:
        return { inProgress: action.payload};
      default:
        return state;
    }
  };
  