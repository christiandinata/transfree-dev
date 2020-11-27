const initialState = {
    notification_data: null,
    notification_data_array: null,
    inProgress: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'notification_data':
            return { notification_data: action.payload };
        case 'notification_data_array':
            return { notification_data_array: action.payload };
        default:
            return state;
    }
};