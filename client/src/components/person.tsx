import React from 'react';
import '../assets/css/App.css';

//import component
import Header from '../components/header';
import PersonIndex from "../containers/person-index";
import PersonsNew from "../containers/persons-new";

//home page

const Person = () => {
    return (
        <div className="App">
          <Header/>
          <PersonsNew/>
          <PersonIndex/>
        </div>
    );

}

export default Person;
