import {
    SUMMARY_DATA,
    SUMMARY_DATA_ARRAY,
    SUMMARY_DATA_ARRAY_IN_PROGRESS
} from '../types';

const initialState = {
    summary: null,
    users: null,
    inProgress: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SUMMARY_DATA:
            return {users: action.payload};
        case SUMMARY_DATA_ARRAY:
            return {summary: action.payload};
        case SUMMARY_DATA_ARRAY_IN_PROGRESS:
            return {inProgress: action.payload};
        default:
            return state;
    }
};
