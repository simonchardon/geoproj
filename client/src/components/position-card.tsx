import React from "react";

type Props = {
    geom: string,
    coor: number[],
    date: string,
    hour: string
}

const PositionCard = (props: Props) => {
    return (
        <div  className="position-card">
            <div className="position-coor">
                <p>{props.geom}</p>
                <p>latitude: {props.coor[1]}, longitude: {props.coor[0]} </p>
            </div>
            <p>date: {props.date} à {props.hour}</p>
        </div>
    );
}

export default PositionCard;