const activeIdReducer = (state = null, action: any) => {

    switch (action.type) {
        case 'ACTIVEID_SET':
            return action.payload;
        default:
            return state;
    }
}

export default activeIdReducer;
