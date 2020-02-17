import Router from 'next/router';
import axios from 'axios';
import {
  GENERATE_VA_NUMBER
} from '../types';
import { API } from '../../config';

const generateVA = (merchantId, merchantRefCode, secretWord, custName, custEmail, totalAmount) => {
  return (dispatch) => {
    axios.post(`${API}/generateVA`, {
      'merchantId': merchantId,
      'merchantRefCode': merchantRefCode,
      'secretWord': secretWord,
      'custName': custName,
      'custEmail': custEmail,
      'totalAmount': totalAmount
    }).then((response) => {
        //console.log(response);
        if(response.status == 200) {
            dispatch({type: GENERATE_VA_NUMBER, payload: response.data.vaNumber});
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };
};


export default {
  generateVA,
};
