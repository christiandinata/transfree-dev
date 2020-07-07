import {
  UPDATE_FX_SUCCESS,
  UPDATE_FX_PROGRESS,
  UPDATE_FX_FAIL
} from '../types';

const initialState = {
  adjustedRates: null,
  inProgress: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_FX_SUCCESS:
      return { adjustedRates: action.payload };
    case UPDATE_FX_PROGRESS:
      return { inProgress: action.payload };
    case UPDATE_FX_FAIL:
      return { errorMessage: action.payload };
    default:
      return state;
  }
};
