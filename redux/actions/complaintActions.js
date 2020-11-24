import Router from 'next/router';
import axios from 'axios';
import {
  FEEDBACK_SUCCESS
} from '../types';
import { API } from '../../config';
//Submit feedback
const submitFeedback = ({name, service, details, contact}, type) => {
    if(type !== 'submitFeedback'){
        throw new Error('Wrong API Call!!');
    }
    
    return(dispatch) => {
        axios.post(`${API}/${type}`, {name, service, details, contact})
        .then((response) => {
            dispatch({type: FEEDBACK_SUCCESS, payload: 'Your feedback has been sent to our email'});
            Router.push('/complaint_feedback');
        })
        .catch((error) => {
            console.log(error);
            throw new Error(error);
        })
    }
}

export default {
  submitFeedback
};
