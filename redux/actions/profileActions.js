import axios from 'axios'
import {
  PROFILE_CREATE,
  PROFILE_CREATE_PROGRESS,
  PROFILE_CREATE_ERROR
} from '../types';
import { API } from '../../config'
import { getCookie } from '../../utils/cookie'

const createProfile = ({ idType, idNumber, gender, pob, dob, address, email }, type) => {
  if (type !== 'createProfile') {
    throw new Error('Wrong API call!')
  }
  return (dispatch) => {
    dispatch({type: PROFILE_CREATE_PROGRESS, payload: true});
    axios.post(`${API}/${type}`, { idType, idNumber, gender, pob, dob, address, email }, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
      .then((response) => {
        dispatch({type: PROFILE_CREATE, payload: response.data})
        dispatch({type: PROFILE_CREATE_PROGRESS, payload: false})
      })
      .catch((error) => {
        dispatch({type: PROFILE_CREATE_ERROR, payload: error.message})
        throw new Error(error)
      })
  }
}

export default {
  createProfile
}
