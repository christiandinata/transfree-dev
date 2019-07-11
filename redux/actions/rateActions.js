import axios from 'axios';
import {
  EXCHANGE_RATE,
} from '../types';

const getRates = (from, to) => {
  return async (dispatch) => {
    await axios.get('https://data.fixer.io/latest?access_key=1c2c1df7d16f7d0e30bb25aebd730a22&base='+from.toUpperCase()+'&symbols='+to.toUpperCase())
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
