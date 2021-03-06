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

//adding new order
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

const getOrderById = (oid, type,req) => {
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
      },{
        headers:{
          'Authorization' : 'Bearer' + getCookie('token')
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};


const getOrderByQuery = ({page, query},type) => {
  if (type !== 'getAllOrders') {
    throw new Error('Wrong API call!');
  }
  return async (dispatch) => {
    dispatch({type: ORDER_DATA_ARRAY_IN_PROGRESS, payload: true});

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

const getAllOrders = (page,type, req) => {

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

const checkPayment = ({_id} , type, req) => {
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

const paymentReceived = ({_id} , type, req) => {
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
        throw new Error(error);
      });
  };
};

const transferCompleted = ({_id} , type, req) => {
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

const exportOrders = (startDate,endDate,type, req) =>{
  if (type !== 'download') {
    throw new Error('Wrong API call!');
  }
  return async(dispatch)=>{
    await axios({
       url: `${API}/${type}/orders?startDate=${startDate}&endDate=${endDate}`, //your url
      method: 'GET',
      responseType: 'blob', // important
    }, {
      headers: {
        Authorization: `Bearer ${getCookie('token',req)}`
      }
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href =url;
       link.setAttribute('download', `orders_${startDate}_${endDate}.xlsx`); //or any other extension
       document.body.appendChild(link);
       link.click();
    }).catch(
      function (error) {
        alert("Please check the time range")
      }
    )
  }  
}


const changePaidOutRate = ({_id, paidOutRate, partnerPaidOutRate}, type,req) => {
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

const cancelOrder = ({_id}, type,req) => {
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

const reOpenOrder = ({_id}, type,req) => {
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
  checkPayment,
  paymentReceived,
  transferCompleted,
  changePaidOutRate,
  cancelOrder,
  reOpenOrder,
  exportOrders,
};
