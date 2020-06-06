import React, {Component} from "react";
import {connect} from "react-redux";
import {newPerson, setPersons} from "../actions/persons";
import {reduxForm, Field, reset} from "redux-form";
import {bindActionCreators} from "redux";


class PersonsNew extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            form: "form-inline form-person hide"
        }
    }

    renderField(field: any) {
        return (
            <div className="form-group ">
                <label className="my-1 mr-2">{field.label}</label>
                <input
                    className="form-control input-person"
                    type={field.type}
                    {...field.input}
                />
            </div>
        );
    }

    onSubmit = (values: any,dispatch: any) => {
        this.props.newPerson(values.name).then(this.props.setPersons())
        dispatch(reset('newPersonForm'));
    }


    onClick = () => {
        if (this.state.form === "form-inline form-person hide" ){
            this.setState({form: "form-inline form-person active"})
        } else {
            this.setState({form: "form-inline form-person hide"})
        }
    }

    render() {
        return(
            <div className="new-person jumbotron">
                <button className="btn btn-primary btn-person" onClick={this.onClick}>Ajouter une personne</button>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={this.state.form}>
                    <Field
                        label="Nom"
                        name="name"
                        type="text"
                        component={this.renderField}
                    />

                    <button className="btn btn-primary ml-2" type="submit"
                            disabled={this.props.pristine || this.props.submitting}>
                        Envoyer
                    </button>

                </form>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {setPersons: setPersons,
        newPerson: newPerson},
        dispatch
    )
}

export default reduxForm({form: 'newPersonForm'})(connect(null,mapDispatchToProps)(PersonsNew));