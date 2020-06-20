import Router from 'next/router';
import axios from 'axios';
import {
  DONASI_SUCCESS
} from '../types';
import { API } from '../../config';

const submitDonation = ({email, donatur, price}, type) => {
    if(type !== 'order'){
        throw new Error('Wrong API Call!!');
    }
    
    return(dispatch) => {
        axios.post(`${API}/qurban/${type}`, {email, donatur, price})
        .then((response) => {
            dispatch({type: DONASI_SUCCESS, payload: 'Your transaction has been sent to our email'});
            alert("Transaksi Anda berhasil silahkan cek email Anda")
            Router.push('/');
        })
        .catch((error) => {
            console.log(error);
            throw new Error(error);
        })
    }
}

export default {
  submitDonation
};
