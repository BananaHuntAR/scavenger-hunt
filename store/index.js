import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import currentUser from './auth';
import results from './results';
import time from './time';
import capturedItems from './capturedItems';
import users from './users';
import customMaps from './customMaps';
import customItems from './customItems';
import selectedMap from './selectedMap';

const reducer = combineReducers({
  results, //[]
  time, //0
  capturedItems, //0
  currentUser, //{}
  users, //
  customMaps, //[]
  customItems, // []
  selectedMap //{}
});
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware
    // createLogger({collapsed: true})
  )
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './results';
export * from './time';
export * from './capturedItems';
export * from './users';
export * from './customMaps';
export * from './customItems';
export * from './selectedMap';
