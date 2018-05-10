import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import results from './results';
import time from './time';
import capturedItems from './capturedItems';

const reducer = combineReducers({ results, time, capturedItems, user });
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  // createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './results';
export * from './time';
export * from './capturedItems';
