import {
    FEEDBACK_SUCCESS
} from '../types';

// initial state for user complaint
const initialState = {
    successMessage : null
};

export default (state = initialState, action) => {
    switch(action.type){
    	// state for showing success message after customer give some feedback
        case FEEDBACK_SUCCESS :
            return {successMessage : action.payload};
        default :
            return state;
    }
};