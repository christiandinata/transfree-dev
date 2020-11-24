import {
    DONASI_SUCCESS
} from '../types';

// initial state for donasi
const initialState = {
    successMessage : null,
    successDonasi : null
};

export default (state = initialState, action) => {
    switch(action.type){
        // state for Donasi success and showing success message
        case DONASI_SUCCESS :
            return {successMessage : action.payload};
            return {successDonasi : action.payload};
        default :
            return state;
    }
};