import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import { authEpic, autoLogoutEpic } from './actions/auth';
import { initIngredientsEpic } from './actions/burgerBuilder';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// Create the epicMiddleware and rootEpic
const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics(authEpic, autoLogoutEpic, initIngredientsEpic);

const rootReducers = combineReducers({...reducers});
const store = createStore(rootReducers, composeEnhancers(
    // Apply the epicMiddleware
    applyMiddleware(epicMiddleware),
    applyMiddleware(thunk),
));

// Tell redux-observable to run the epics
epicMiddleware.run(rootEpic);

export default store;
