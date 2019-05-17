import axios from 'axios';
import {
  EXCHANGE_RATE,
} from '../types';

const getRates = (from, to) => {
  return async (dispatch) => {
    await axios.get('https://api.exchangeratesapi.io/latest?base='+from.toUpperCase()+'&symbols='+to.toUpperCase())
      .then((response) => {
        let rate = response.data.rates[to.toUpperCase()];
        dispatch({type: EXCHANGE_RATE, payload: rate});
      }).catch((err) => {
        throw new Error(err);
      });
  };
};

export default {
  getRates
};
