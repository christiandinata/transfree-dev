import axios from 'axios';
import Router from 'next/router';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';

const APINotificationEndpoint = 'v1/globalNotification';

const getAllNotifications = (page, type, req) => {
    if (type !== 'getAll') {
        throw new Error('Wrong API call!');
    }
    
    return async (dispatch) => {
        dispatch({
            type: 'notification_data_array_in_progress',
            payload: true,
        });

        await axios.get(`${API}/${APINotificationEndpoint}/${type}?page=` + page, {
            headers: {
                Authorization: `Bearer ${getCookie('token',req)}`,
            }
        })
        .then((response) => {
            dispatch({
                type: 'notification_data_array',
                payload: response.data,
            });
        })
        .catch((error) => {
            throw new Error(error);
        });
    };
};

const createNotification = ({title, content, icon, image, redirectLink}, type, req) => {
    if (type !== 'create') {
        throw new Error('Wrong API call!');
    }
    return (dispatch) => {
        axios.post(`${API}/${APINotificationEndpoint}/${type}`, {title, content, icon, image, redirectLink}, {
            headers: {
                Authorization: `Bearer ${getCookie('token',req)}`
            } 
        })
            .then((response) => {
                window.alert("Notification created!");
                Router.push('/dashboard/notification');
                console.log(response);
            })
            .catch((error) => {
                throw new Error(error);
            });
    };
};

export default {
    getAllNotifications,
    createNotification,
};