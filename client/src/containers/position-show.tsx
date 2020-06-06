import React ,{ useEffect }from "react";
import {bindActionCreators} from "redux";
import {setPosition} from "../actions/position";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {setPersons} from "../actions/persons";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:9000";

type Props = {
    setPersons: any,
    setPosition: any,
    person_id: string,
    persons: any,
    position: {
        geom: string,
        datetime: string,
        st_asgeojson: string
    }[]
}


const PositionShow = (props: Props) =>  {

    useEffect(() => {
        props.setPersons()
    }, [])

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.once("update", (data: any) => {
            props.setPosition(props.person_id)
        });
    }, [props])



        if (props.persons && props.position){
            const person = props.persons.find( (person: any) =>  person.id === parseInt(props.person_id, 10))
            const position = props.position[0]
            const coor = JSON.parse(props.position[0].st_asgeojson).coordinates
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(position.datetime).toLocaleDateString('fr',options)
            const hour = new Date(position.datetime).toLocaleTimeString('fr', {hour: 'numeric', minute: 'numeric'})
            return (
                <div className="position-show">
                    <h3>{person.name}</h3>
                    <p>point geom: {position.geom}</p>
                    <p>latitude: {coor[1]}, longitude: {coor[0]} </p>
                    <p>date: {date} à {hour}</p>
                    <Link to={`/${person.id}/position/history`} className="btn btn-primary">historique</Link>
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
            setPosition:setPosition,
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

export default connect(mapStateToProps, mapDispatchToProps)(PositionShow);