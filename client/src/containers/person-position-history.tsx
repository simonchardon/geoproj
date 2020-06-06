import React, { Component} from "react";
import Header from "../components/header";
import {bindActionCreators} from "redux";
import {setActiveId} from "../actions/persons";
import {connect} from "react-redux";
import PositionIndex from "./position-index";
import {setPositions} from "../actions/position";
import Map from "./map";



type Props = {
    setActiveId: any,
    setPositions: any,
    match: any,
    position: {
        geom: string,
        st_asgeojson: string
    }[]

}

class PersonPositionHistory extends Component<Props> {

    componentDidMount(): void {
        this.props.setActiveId(this.props.match.params.id)
        this.props.setPositions(this.props.match.params.id)
    }

    render(): React.ReactNode {
        if (this.props.position && this.props.position.length >= 1 ){
            const coor = JSON.parse(this.props.position[0].st_asgeojson).coordinates;
            return(
                <div>
                    <Header  />
                    <PositionIndex person_id={this.props.match.params.id}  />
                    <Map longitude={coor[0]} latitude={coor[1]} position={this.props.position} comp="index"  />
                </div>
            );
        } else {
            return (
                <div>

                </div>
            );
        }
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {setActiveId: setActiveId,
        setPositions: setPositions},
        dispatch
    )
}

const mapStateToProps = (state: any) => {
    return {
        position: state.position
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PersonPositionHistory);