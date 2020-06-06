const personsReducer = (state = null, action: any) => {

    switch (action.type) {
        case 'PERSONS_SET':
            return action.payload;
        default:
            return state;
    }
}

export default personsReducer;
