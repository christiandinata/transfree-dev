import Router from 'next/router';
import axios from 'axios';
import {
  ORDER_DATA,
  ORDER_DATA_ARRAY,
  ORDER_DATA_ARRAY_IN_PROGRESS,
  RECIPIENT_DATA,
  SUMMARY_DATA_ARRAY,
  SUMMARY_DATA_ARRAY_IN_PROGRESS
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
      email, name, bankName, bankAccountNumber, accountNumber, sortcode, iban, swift, routingNumber, bsbCode, paymentMethod
    }, {
      headers: {
        'Authorization': 'Bearer ' + getCookie('token') 
      }
    })
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

const getOrderById = (oid, type, req) => {
  if (type !== 'getOrderById') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.get(`${API}/${type}?oid=`+oid, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        dispatch({type: ORDER_DATA, payload: response.data.order_data});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

const getOrderByUid = (uid , type, req) => {
  if (type !== 'getOrderByUid') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.get(`${API}/${type}?uid=`+uid, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        dispatch({type: ORDER_DATA_ARRAY, payload: response.data.order_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};



const getOrderByQuery = (page, query,type) => {

const getOrderByQuery = (page, query, type) => {

  if (type !== 'getOrderByQuery') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    dispatch({type: ORDER_DATA_ARRAY_IN_PROGRESS, payload: true});

    await axios.get(`${API}/${type}?page=`+page+`&q=`+query)

    await axios.get(`${API}/${type}?page=`+page+`&q=`+query, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })

      .then((response) => {
        dispatch({type: ORDER_DATA_ARRAY, payload: response.data.order_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};


const getAllOrders = (page,type) => {


const getAllOrders = (page,type,req) => {

  if (type !== 'getAllOrders') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    dispatch({type: ORDER_DATA_ARRAY_IN_PROGRESS, payload: true});
    await axios.get(`${API}/${type}?page=`+page, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        dispatch({type: ORDER_DATA_ARRAY, payload: response.data.order_data_array});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

const getCustomerSummary = (name, fromDate, toDate, type,req) => {
  if (type !== 'getOrderSummary') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    dispatch({type: SUMMARY_DATA_ARRAY_IN_PROGRESS, payload: true});
    await axios.get(`${API}/${type}?name=`+ name + "&from=" + fromDate + "&to=" + toDate, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        dispatch({type: SUMMARY_DATA_ARRAY, payload: response.data.summary});
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

const checkPayment = ({_id} , type,req) => {
  if (type !== 'checkPayment') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.post(`${API}/${type}`, {_id}, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
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

const paymentReceived = ({_id} , type,req) => {
  if (type !== 'paymentReceived') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.post(`${API}/${type}`, {_id}, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        Router.push('/dashboard/orders');
        console.log(response);
        //dispatch({type: USER_DATA_ARRAY, payload: response.data.user_data_array});
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };
};

const transferCompleted = ({_id} , type,req) => {
  if (type !== 'transferCompleted') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    await axios.post(`${API}/${type}`, {_id}, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
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

const changePaidOutRate = ({_id, paidOutRate, partnerPaidOutRate}, type, req) => {
  if (type !== 'changePaidOutRate') {
    throw new Error('Wrong API call!');
  }
  return async(dispatch) => {
    await axios.post(`${API}/${type}`, {_id, paidOutRate, partnerPaidOutRate}, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        Router.push('/dashboard/orders');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }
}

const cancelOrder = ({_id}, type, req) => {
  if (type !== 'cancelOrder'){
    throw new Error('Wrong API call!');
  }
  return async(dispatch) => {
    await axios.post(`${API}/${type}`, {_id}, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        Router.push('/dashboard/orders');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }
}

const reOpenOrder = ({_id}, type, req) => {
  if (type !== 'reOpenOrder'){
    throw new Error('Wrong API call!');
  }
  return async(dispatch) => {
    await axios.post(`${API}/${type}`, {_id}, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    })
      .then((response) => {
        Router.push('/dashboard/orders');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }
}

export default {
  addOrder,
  getOrderById,
  getOrderByUid,
  getOrderByQuery,
  getAllOrders,
  getCustomerSummary,
  checkPayment,
  paymentReceived,
  transferCompleted,
  changePaidOutRate,
  cancelOrder,
  reOpenOrder
};
