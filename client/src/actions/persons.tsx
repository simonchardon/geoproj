
export const setPersons = () => {
    const promise = fetch('/api/persons', {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    })
        .then(response => response.json());

    return {
        type: 'PERSONS_SET',
        payload: promise
    };
};


export const newPerson = (name: string) => {
    const promise = fetch(`/api/persons/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: name})
    }).then(response => response.json())

    return {
        type: 'PERSON_CREATED',
        payload: promise
    };
}

export const setActiveId = (id:number) => {
    return {
        type: 'ACTIVEID_SET',
        payload: id
    };
}