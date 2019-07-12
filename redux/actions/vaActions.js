import Router from 'next/router';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import sha1 from 'crypto-js/sha1';
import {
  GENERATE_VA_TOKEN
} from '../types';
//import { INTRAJASA_API } from '../../config';
import { API } from '../../config';

const generateVA = (merchantId, merchantRefCode, secretWord, custName, custEmail, totalAmount) => {
  const secureCode = sha256(merchantId+merchantRefCode+sha1(secretWord).toString()).toString();
  return (dispatch) => {
    axios.post(`${API}/generateVA`, {
      'merchantId': merchantId,
      'merchantRefCode': merchantRefCode,
      'secureCode': secureCode,
      'custName': custName,
      'custEmail': custEmail,
      'totalAmount': totalAmount
    }).then((response) => {
        console.log(response);
        //dispatch({type: USER_DATA, payload: response.data.user_data});
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };
};

// const generateVa = (merchantId, merchantRefCode, secretWord, custName, custEmail, totalAmount, token) => {
//   const secure = sha256(merchantId+token+merchantRefCode+custName+totalAmount).toString();
//   const data = {
//     'vaType': '2',
//     'merchantRefCode': merchantRefCode,
//     'merchantId': merchantId,
//     'customerData': {
//         'custName': custName,
//         'custAddress1': '',
//         'custAddress2': '',
//         'custAddress3': '',
//         'custPhoneNumber': '',
//         'custEmail': custEmail,
//         'custCountryCode': ''
//     },
//     'productData': [],
//     'totalAmount': totalAmount,
//     'secureCode': secure
//   };
//   console.log(data);
//   return (dispatch) => {
//     axios.post(`${API}/generateva?t=`+sha256(token).toString(), data).then((response) => {
//         console.log(response)
//         //dispatch({type: USER_DATA, payload: response.data.user_data});
//       })
//       .catch((error) => {
//         console.log(error);
//         throw new Error(error);
//       });
//   };
// }

export default {
  generateVA,
};
