import {
    DONASI_SUCCESS
} from '../types';

const initialState = {
    successDonasi : null
};

export default (state = initialState, action) => {
    switch(action.type){
        case DONASI_SUCCESS :
            return {successDonasi : action.payload};
        default :
            return state;
    }
};