import Router from 'next/router';
import axios from 'axios';
import {
  GENERATE_VA_TOKEN
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
        console.log(response);
        //dispatch({type: USER_DATA, payload: response.data.user_data});
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
