import axios from 'axios';
import {
  UPDATE_FX_PROGRESS,
  UPDATE_FX_SUCCESS,
  UPDATE_FX_FAIL
} from '../types';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';


const updateRates = ({base, upperMargin, lowerMargin, idrToGbpOos,gbpToIdrOos,idrToEurOos,eurToIdrOos}, type,req) => {
  if (type !== 'updateRates') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    dispatch({type: UPDATE_FX_PROGRESS, payload: true});
    axios.post(`${API}/${type}`, {base, upperMargin, lowerMargin, idrToGbpOos,gbpToIdrOos,idrToEurOos,eurToIdrOos}, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        dispatch({type: UPDATE_FX_SUCCESS, payload: response.data.adjustedRates})
      })
      .catch((error) => {
        dispatch({type: UPDATE_FX_FAIL, payload: 'We cannot update the FX margin at the moment. Please try again later.'});
      });
  };
};

const getAdjustedRates = (base, name, type, req) => {
  if (type !== 'getAdjustedRates') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.get(`${API}/${type}?base=`+base+`&name=`+name)
      .then((response) => {
        dispatch({type: UPDATE_FX_SUCCESS, payload: response.data.adjustedRates})
      })
      .catch((error) => {
        dispatch({type: UPDATE_FX_FAIL, payload: 'We cannot update the FX margin at the moment. Please try again later.'});
      });
  };
};

const getAllAdjustedRates = (base, type, req) => {
  if (type !== 'getAllAdjustedRates') {
    throw new Error('Wrong API call!');
  }
  console.log("All Adjusted Rates Called");
  return async (dispatch) => {
    await axios.get(`${API}/${type}?base=`+base, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        console.log(response.data);
        dispatch({type: UPDATE_FX_SUCCESS, payload: response.data.adjustedRates})
      })
      .catch((error) => {
        dispatch({type: UPDATE_FX_FAIL, payload: 'We cannot update the FX margin at the moment. Please try again later.'});
      });
  };
};

export default {
  updateRates,
  getAdjustedRates,
  getAllAdjustedRates
};
