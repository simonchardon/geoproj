import React, {Component} from "react";
import {reduxForm, Field, reset} from "redux-form";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {newPosition, setPosition} from "../actions/position";



class PositionNew extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            form: " form-person hide"
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
        this.props.newPosition(parseInt(this.props.activeId,10), values.lat, values.long).then(this.props.setPosition(parseInt(this.props.activeId,10)))
        dispatch(reset('newPositionForm'));
        this.onClick()
    }


    onClick = () => {
        if (this.state.form === " form-person hide" ){
            this.setState({form: " form-person active-person"})
        } else {
            this.setState({form: " form-person hide"})
        }
    }


   render(): React.ReactNode {
       return(
           <div className="new-person jumbotron">
               <button className="btn btn-primary btn-person" onClick={this.onClick}>Entrer une nouvelle position</button>
               <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={this.state.form}>
                   <Field
                       label="Latitude"
                       name="lat"
                       type="text"
                       component={this.renderField}
                   />
                   <Field
                       label="Longitude"
                       name="long"
                       type="text"
                       component={this.renderField}
                   />

                   <button className="btn btn-primary ml-2" type="submit"
                           disabled={this.props.pristine || this.props.submitting}>
                       Envoyer
                   </button>
               </form>
           </div>
       );
   }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {newPosition: newPosition,
        setPosition: setPosition},
        dispatch
    )
}

const mapStateToProps = (state: any) => {
    return {
        activeId: state.activeId
    }
}

export default reduxForm({form: 'newPositionForm'})(connect(mapStateToProps,mapDispatchToProps)(PositionNew));