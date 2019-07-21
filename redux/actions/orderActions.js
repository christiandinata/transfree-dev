import Router from 'next/router';
import axios from 'axios';
import {
  ORDER_DATA,
  ORDER_DATA_ARRAY
} from '../types';
import { API } from '../../config';

const addOrder = ({ uid, senderName, senderEmail, rate, fromCurrency, toCurrency, fromAmount, toAmount,
  email, name, bankName, bankAccountNumber, accountNumber, sortcode, iban, swift, paymentMethod }, type) => {
  if (type !== 'addOrder') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios.post(`${API}/${type}`, {uid, senderName, senderEmail, rate, fromCurrency, toCurrency, fromAmount, toAmount,
      email, name, bankName, bankAccountNumber, accountNumber, sortcode, iban, swift, paymentMethod})
      .then((response) => {
        dispatch({type: ORDER_DATA, payload: response.data.order_data});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

const getOrderById = ({ id }, type) => {
  if (type !== 'getOrderById') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios.get(`${API}/${type}`, {id})
      .then((response) => {
        dispatch({type: ORDER_DATA, payload: response.data.order_data});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

const getOrderByUid = (uid , type) => {
  if (type !== 'getOrderByUid') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.get(`${API}/${type}?uid=`+uid)
      .then((response) => {
        dispatch({type: ORDER_DATA_ARRAY, payload: response.data.order_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

const getAllOrders = (type) => {
  if (type !== 'getAllOrders') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.get(`${API}/${type}`)
      .then((response) => {
        dispatch({type: ORDER_DATA_ARRAY, payload: response.data.order_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export default {
  addOrder,
  getOrderById,
  getOrderByUid,
  getAllOrders
};
