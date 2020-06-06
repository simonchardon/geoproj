import React, {Component} from "react";
import PersonCard from "./person-card";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {setPersons} from "../actions/persons";



type Props = {
    persons: {
        id: number,
        name: string
    }[],
    setPersons: any
}

class PersonIndex extends Component<Props>{

    componentDidMount(): void {
        this.props.setPersons();
    }


    render(): React.ReactNode {
        if (this.props.persons){
            return(
                <div className="personList">
                    {this.props.persons.map((person :any) => <PersonCard key={person.id} person={person} />)}
                </div>
            );
        } else {
            return (
                <div>

                </div>
            )
        }
    }


}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {setPersons: setPersons},
        dispatch
    )
}

const mapStateToProps = (state :any) => {
    return {
        persons: state.persons
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(PersonIndex);