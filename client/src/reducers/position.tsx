const positionReducer = (state = null, action: any) => {

    switch (action.type) {
        case 'POSITION_SET':
            return action.payload;
        default:
            return state;
    }
}

export default positionReducer;
