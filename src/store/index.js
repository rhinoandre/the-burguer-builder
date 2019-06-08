import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducers = combineReducers({...reducers});
const store = createStore(rootReducers, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;
