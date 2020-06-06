import React from "react";


// pop up for the map

type Props = {
    datetime: string
    coor: number[]
}

const Popup = (props: Props) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(props.datetime).toLocaleDateString('fr',options)
    const hour = new Date(props.datetime).toLocaleTimeString('fr', {hour: 'numeric', minute: 'numeric'})
    return (
        <div className="popup">
            <p>lng:{props.coor[0]} lat:{props.coor[1]}</p>
            <p>{date} à {hour}</p>
        </div>
    );
};

export default Popup;