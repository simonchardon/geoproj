import React from "react";
import {Link} from "react-router-dom";
import arrow from '../assets/img/next.png';

type Props = {
    person: {
        id: number,
        name: string
    }
}

const PersonCard = (props: Props) =>{

    const person = props.person
    return (
        <Link to={`/${person.id}/position`} className="personCard">
            <p>{person.id}</p>
            <h3>{person.name}</h3>
            <img src={arrow} alt="arrow" width={20} height={20}/>
        </Link>
    );
}

export default PersonCard;