import {
  UPDATE_FX_SUCCESS,
  UPDATE_FX_PROGRESS,
  UPDATE_FX_FAIL
} from '../types';

// intial state for FX margin
const initialState = {
  adjustedRates: null,
  inProgress: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    // state for updating conversion rates
    case UPDATE_FX_SUCCESS:
      return { adjustedRates: action.payload };
    // state for processing updating conversion rates
    case UPDATE_FX_PROGRESS:
      return { inProgress: action.payload };
    // state for showing error message while updating conversion rates
    case UPDATE_FX_FAIL:
      return { errorMessage: action.payload };
    default:
      return state;
  }
};
