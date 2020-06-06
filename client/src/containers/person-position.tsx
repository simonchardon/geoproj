import React, { Component, useEffect} from "react";
import Header from "../components/header";
import PositionNew from "./position-new";
import Map from "./map";
import PositionShow from "./position-show";
import {bindActionCreators} from "redux";
import {setActiveId} from "../actions/persons";
import {connect} from "react-redux";
import {setPosition} from "../actions/position";

type Props = {
    setActiveId: any,
    setPosition: any,
    match: any,
    position: {
        geom: string,
        st_asgeojson: string
    }[]

}

class PersonPosition extends Component <Props>{

    componentDidMount(): void {
        this.props.setActiveId(this.props.match.params.id)
        this.props.setPosition(this.props.match.params.id)
    }


    render(): React.ReactNode {
        if (this.props.position && this.props.position.length === 1){
            const coor = JSON.parse(this.props.position[0].st_asgeojson).coordinates;
            return(
                <div>
                    <Header  />
                    <PositionNew />
                    <PositionShow person_id={this.props.match.params.id}  />
                    <Map longitude={coor[0]} latitude={coor[1]} position={this.props.position} comp={"show"} />
                </div>

            );
        } else {
            return (
                <div>
                    <Header  />
                    <PositionNew />
                </div>
            );
        }
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {setActiveId: setActiveId,
        useEffect: useEffect,
        setPosition: setPosition},
        dispatch
    )
}

const mapStateToProps = (state: any) => {
    return {
        position: state.position
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PersonPosition);