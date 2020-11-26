import axios from 'axios';
import Router from 'next/router';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';

const APIInfoAndSpecialEvent = 'v1/info';

const createSpecialeventform = ({title, image}, type, req) => {    
    console.log(`Bearer ${getCookie('token',req)}`)
    if (type !== 'create') {
        throw new Error('Wrong API call!');
    }
    return (dispatch) => {
        axios.post(`${API}/${APIInfoAndSpecialEvent}/${type}`, {title, image}, {
            headers: {
                Authorization: `Bearer ${getCookie('token',req)}`
            } 
        })
            .then((response) => {
                window.alert("Event created!");
                Router.push('/dashboard/home');
                console.log(response);
            })
            .catch((error) => {                
                throw new Error(error);
            });
    };
};

export default {    
    createSpecialeventform,
};