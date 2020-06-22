import {
    DONASI_SUCCESS
} from '../types';

const initialState = {

    successMessage : null

    successDonasi : null

};

export default (state = initialState, action) => {
    switch(action.type){
        case DONASI_SUCCESS :

            return {successMessage : action.payload};

            return {successDonasi : action.payload};

        default :
            return state;
    }
};