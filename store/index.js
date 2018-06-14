import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import currentUser from './auth';
import results from './results';
import time from './time';
import capturedItems from './capturedItems';
import userResults from './userResults';
import userMaps from './userMaps';
import customMaps from './customMaps';
import customItems from './customItems';
import selectedMap from './selectedMap';
import mapId from './mapId';

const reducer = combineReducers({
  results, // intial value: []
  time, // intial value: 0
  capturedItems, // intial value: 0
  currentUser, // intial value: {}
  userResults, // intial value: []
  userMaps, // intial value: []
  customMaps, // intial value: []
  customItems, // intial value: []
  selectedMap, // intial value: {}
  mapId // initial value: 0
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
export * from './userResults';
export * from './userMaps';
export * from './customMaps';
export * from './customItems';
export * from './selectedMap';
export * from './mapId';
