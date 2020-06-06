import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import { logger } from 'redux-logger'
import reduxPromise from "redux-promise";
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux';



// import stylesheet
import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


//import components
import Person from './components/person';
import PersonPosition from "./containers/person-position";
import PersonPositionHistory from "./containers/person-position-history";

//import reducer
import { reducer as formReducer } from 'redux-form';
import personsReducer from "./reducers/persons";
import positionReducer from "./reducers/position";
import activeIdReducer from "./reducers/active-id";


//reducer
const reducers = combineReducers({
    form: formReducer,
    routing: routerReducer,
    persons: personsReducer,
    activeId: activeIdReducer,
    position: positionReducer
});

//middleware
const history = createBrowserHistory();
const middleware = applyMiddleware(logger,reduxPromise,routerMiddleware(history));



ReactDOM.render(
    <Provider store={createStore(reducers, {}, middleware)}>
        <Router history={history} >
            <Switch>
                <Route path="/" exact component={Person} />
                <Route path="/:id/position" exact component={PersonPosition } />
                <Route path="/:id/position/history" exact component={PersonPositionHistory} />
            </Switch>
        </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
