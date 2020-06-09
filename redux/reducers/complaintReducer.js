import {
    FEEDBACK_SUCCESS
} from '../types';

const initialState = {
    successMessage : null
};

export default (state = initialState, action) => {
    switch(action.type){
        case FEEDBACK_SUCCESS :
            return {successMessage : action.payload};
        default :
            return state;
    }
};