import Router from 'next/router';
import axios from 'axios';
import {
  ORDER_DATA,
  ORDER_DATA_ARRAY,
  ORDER_DATA_ARRAY_IN_PROGRESS,
  RECIPIENT_DATA
} from '../types';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';


const addOrder = ({ uid, senderName, senderEmail, senderPhone, rate, fromCurrency, toCurrency, fromAmount, toAmount,
  email, name, bankName, bankAccountNumber, accountNumber, sortcode, iban, swift, routingNumber, bsbCode, paymentMethod, isSaveRecipient }, type) => {
  if (type !== 'addOrder') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios.post(`${API}/${type}`, {uid, senderName, senderEmail, senderPhone, rate, fromCurrency, toCurrency, fromAmount, toAmount,
      email, name, bankName, bankAccountNumber, accountNumber, sortcode, iban, swift, routingNumber, bsbCode, paymentMethod})
      .then((response) => {
        dispatch({type: ORDER_DATA, payload: response.data.order_data});

        if (isSaveRecipient) {
          axios.post(`${API}/recipient`, {
            uid: getCookie('_id'),
            email: email,
            name: name,
            bankName: bankName,
            bankAccountNumber: bankAccountNumber,
            sortcode: sortcode ? sortcode : null,
            accountNumber: accountNumber ? accountNumber : null,
            routingNumber: routingNumber ? routingNumber : null,
            bsbCode: bsbCode ? bsbCode : null,
            iban: iban ? iban : null,
            currency: toCurrency.toUpperCase()
          }, {
            headers: {
              'Authorization': 'Bearer ' + getCookie('token') 
            }
          })
          .then((response) => {
            //
          })
          .catch((error) => {
            throw new Error(error);
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

const getOrderById = (oid, type) => {
  if (type !== 'getOrderById') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.get(`${API}/${type}?oid=`+oid)
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

const getAllOrders = (page,type) => {
  if (type !== 'getAllOrders') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    dispatch({type: ORDER_DATA_ARRAY_IN_PROGRESS, payload: true});
    await axios.get(`${API}/${type}?page=`+page)
      .then((response) => {
        dispatch({type: ORDER_DATA_ARRAY, payload: response.data.order_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

const paymentReceived = ({_id} , type) => {
  if (type !== 'paymentReceived') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.post(`${API}/${type}`, {_id})
      .then((response) => {
        Router.push('/dashboard/orders');
        console.log(response);
        //dispatch({type: USER_DATA_ARRAY, payload: response.data.user_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

const transferCompleted = ({_id} , type) => {
  if (type !== 'transferCompleted') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.post(`${API}/${type}`, {_id})
      .then((response) => {
        Router.push('/dashboard/orders');
        console.log(response);
        //dispatch({type: USER_DATA_ARRAY, payload: response.data.user_data_array});
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
  getAllOrders,
  paymentReceived,
  transferCompleted
};