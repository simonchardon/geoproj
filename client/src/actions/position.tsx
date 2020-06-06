

// action for fetch position of a person

export const setPosition = (id: number) => {
    const promise = fetch(`/api/persons/${id}/position`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    })
        .then(response => response.json());

    return {
        type: 'POSITION_SET',
        payload: promise
    };
};


// action for fetch the history position
export const setPositions = (id: number) => {
    const promise = fetch(`/api/persons/${id}/history`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    })
        .then(response => response.json());

    return {
        type: 'POSITION_SET',
        payload: promise
    };
};

// action for send a new position to the api
export const newPosition = (id: number, lat:number, long:number) => {

    const promise = fetch(`/api/position/create`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: id,long: long,lat: lat})
    })
        .then(response => response.json());

    return {
        type: 'POSITION_NEW',
        payload: promise
    };
};