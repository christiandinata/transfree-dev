import axios from 'axios';
import {
  UPDATE_FX_PROGRESS,
  UPDATE_FX_SUCCESS,
  UPDATE_FX_FAIL
} from '../types';
import { API } from '../../config';

const updateRates = ({base, upperMargin, lowerMargin, idrToGbpOos,gbpToIdrOos,idrToEurOos,eurToIdrOos}, type) => {
  if (type !== 'updateRates') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: UPDATE_FX_PROGRESS, payload: true});
    axios.post(`${API}/${type}`, {base, upperMargin, lowerMargin, idrToGbpOos,gbpToIdrOos,idrToEurOos,eurToIdrOos})
      .then((response) => {
        dispatch({type: UPDATE_FX_SUCCESS, payload: response.data.adjustedRates})
      })
      .catch((error) => {
        dispatch({type: UPDATE_FX_FAIL, payload: 'We cannot update the FX margin at the moment. Please try again later.'});
      });
  };
};

const getAdjustedRates = (base, type) => {
  if (type !== 'getAdjustedRates') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.get(`${API}/${type}?base=`+base)
      .then((response) => {
        dispatch({type: UPDATE_FX_SUCCESS, payload: response.data.adjustedRates})
      })
      .catch((error) => {
        dispatch({type: UPDATE_FX_FAIL, payload: 'We cannot update the FX margin at the moment. Please try again later.'});
      });
  };
};

export default {
  updateRates,
  getAdjustedRates
};
