import axios from 'axios'
import {
  PROFILE_CREATE,
  PROFILE_CREATE_PROGRESS,
  PROFILE_CREATE_ERROR,
  USER_DATA
} from '../types';
import { API } from '../../config'
import { getCookie } from '../../utils/cookie'
//creating profile
const createProfile = ({ idType, idNumber, gender, pob, dob, address, email }, type) => {
  if (type !== 'createProfile') {
    throw new Error('Wrong API call!')
  }
  return (dispatch) => {
    dispatch({type: PROFILE_CREATE_PROGRESS, payload: true});
    axios.post(`${API}/v1/user/createProfile`, { idType, idNumber, gender, pob, dob, address, email }, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
      .then((response) => {
        dispatch({type: PROFILE_CREATE, payload: response.data})
        dispatch({type: USER_DATA, payload: response.data.data});
      })
      .catch((error) => {
        dispatch({type: PROFILE_CREATE_ERROR, payload: error.message})
        throw new Error(error)
      })
      .finally(() => {
        dispatch({type: PROFILE_CREATE_PROGRESS, payload: false})
      })
  }
}

export default {
  createProfile
}
