const initialState = {
    event: null,    
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'event':
            return { event: action.payload };        
        default:
            return state;
    }
};