import {
    SUMMARY_DATA,
    SUMMARY_DATA_ARRAY,
    SUMMARY_DATA_ARRAY_IN_PROGRESS
} from '../types';

//initial state summary
const initialState = {
    summary: null,
    users: null,
    inProgress: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        //state for summary data
        case SUMMARY_DATA:
            return {users: action.payload};
        // state for getting summary for some action
        case SUMMARY_DATA_ARRAY:
            return {summary: action.payload};
        // state for getting some summary data in progress
        case SUMMARY_DATA_ARRAY_IN_PROGRESS:
            return {inProgress: action.payload};
        default:
            return state;
    }
};
