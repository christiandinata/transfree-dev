import Router from 'next/router';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import sha1 from 'crypto-js/sha1';
import {
  GENERATE_VA_TOKEN
} from '../types';
import { INTRAJASA_API } from '../../config';

const getToken = (merchantId, merchantRefCode, secretWord, custName, custEmail, totalAmount) => {
  const secureCode = sha256(merchantId+merchantRefCode+sha1(secretWord).toString()).toString();
  return (dispatch) => {
    axios.post(`${INTRAJASA_API}/gettoken`, {
      'merchantId': merchantId,
      'merchantRefCode': merchantRefCode,
      'secureCode': secureCode
    }).then((response) => {
        console.log(response.data);
        if (response.data.responseCode == "200") {
          dispatch(generateVa(merchantId, merchantRefCode, secretWord, custName, custEmail, totalAmount, response.data.token));
        };
        //dispatch({type: USER_DATA, payload: response.data.user_data});
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };
};

const generateVa = (merchantId, merchantRefCode, secretWord, custName, custEmail, totalAmount, token) => {
  const secure = sha256(merchantId+token+merchantRefCode+custName+totalAmount).toString();
  const data = {
    'vaType': '2',
    'merchantRefCode': merchantRefCode,
    'merchantId': merchantId,
    'customerData': {
        'custName': custName,
        'custAddress1': '',
        'custAddress2': '',
        'custAddress3': '',
        'custPhoneNumber': '',
        'custEmail': custEmail,
        'custCountryCode': ''
    },
    'productData': [],
    'totalAmount': totalAmount,
    'secureCode': secure
  };
  console.log(data);
  return (dispatch) => {
    axios.post(`${INTRAJASA_API}/generateva?t=`+sha256(token).toString(), data).then((response) => {
        console.log(response)
        //dispatch({type: USER_DATA, payload: response.data.user_data});
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };
}

export default {
  getToken,
  generateVa,
};
