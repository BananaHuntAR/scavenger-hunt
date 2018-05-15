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

const reducer = combineReducers({
  results,
  time,
  capturedItems,
  currentUser,
  userResults,
  userMaps,
  customMaps,
  customItems
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
