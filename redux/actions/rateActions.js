import axios from 'axios';
import {
  EXCHANGE_RATE
} from '../types';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';

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

const getMultipleRates = (base, currencies) => {
  let curQuery = '';
  if(currencies.length == 1){
    curQuery += currencies[0].toUpperCase();
  }
  else{
    for(var i=0; i<currencies.length-1; i++){
      curQuery += currencies[i].toUpperCase() + ",";
    }

    curQuery += currencies[currencies.length-1].toUpperCase();
  }

  return async (dispatch) => {
    await axios.get('https://data.fixer.io/latest?access_key=1c2c1df7d16f7d0e30bb25aebd730a22&base='+
                                                      base.toUpperCase()+'&symbols='+curQuery)
      .then((response) => {
        let rates = response.data.rates;
        let ratesMap = new Map();
        Object.keys(rates).forEach(k => {
          ratesMap.set(k, rates[k])
        })
        dispatch({type: EXCHANGE_RATE, payload: ratesMap});
      }).catch((err) => {
        throw new Error(err);
      });
  };
};

export default {
  getRates,
  getMultipleRates
};
