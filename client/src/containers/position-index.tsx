import React, {useEffect} from "react";
import {bindActionCreators} from "redux";
import {setPositions} from "../actions/position";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {setPersons} from "../actions/persons";
import PositionCard from "../components/position-card";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:9000";

type Props = {
    setPersons: any,
    setPositions: any,
    person_id: string,
    persons : any,
    position: {
        geom: string,
        st_asgeojson: string
    }[]

}


const PositionIndex = (props: Props) => {

    useEffect(() => {
         props.setPersons()
    },[]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.once("update", (data: any) => {
            props.setPositions(props.person_id)
        });
    }, [props] )

    if (props.persons && props.position){
        const person = props.persons.find( (person: any) =>  person.id === parseInt(props.person_id, 10))
        const position = props.position

        return (
            <div className="position-index container">
                <Link to={`/${person.id}/position`} className="btn btn-primary">Dernière Position</Link>
                <h3>{person.name}</h3>
                <div className="position-list">
                {position.map((posi: any) => {
                    const coor = JSON.parse(posi.st_asgeojson).coordinates
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const date = new Date(posi.datetime).toLocaleDateString('fr',options)
                    const hour = new Date(posi.datetime).toLocaleTimeString('fr', {hour: 'numeric', minute: 'numeric'})

                    return <PositionCard key={posi.datetime} geom={posi.geom} coor={coor} date={date} hour={hour}/>

                })}
                </div>
            </div>

        );
    } else {
        return (
            <div>

            </div>
        );
    }


}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            setPersons:setPersons,
            setPositions:setPositions,
        },
        dispatch
    )
}

const mapStateToProps = (state: any) => {
    return {
        persons: state.persons,
        position: state.position
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionIndex);