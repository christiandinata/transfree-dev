import {
    ORDER_DATA,
    ORDER_DATA_ARRAY,
    ORDER_DATA_ARRAY_IN_PROGRESS
  } from '../types';

  //initial state for check order
  const initialState = {
    order: null,
    orders: null,
    inProgress: false
  };
 // for admin
  export default (state = initialState, action) => {
    switch(action.type) {
       //Check Order data State
      case ORDER_DATA:
        return { order: action.payload };
      // state for some check order data 
      case ORDER_DATA_ARRAY:
        return { orders: action.payload };
      // state for order data in progress 
      case ORDER_DATA_ARRAY_IN_PROGRESS:
        return { inProgress: action.payload};
      default:
        return state;
    }
  };
  