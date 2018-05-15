import axios from 'axios';
import { fetchResultsThunk } from './results';
import domain from '../domain.js';

// ACTION TYPES
const INCREMENT_TIME = 'INCREMENT_TIME';
const RESET_TIME = 'RESET_TIME';

// INITIAL STATE
const defaultTime = 0;

// ACTION CREATORS
export const incrementTime = time => ({ type: INCREMENT_TIME, time });
export const resetTime = () => ({ type: RESET_TIME });

// THUNK CREATORS
export const postResult = (name, time, userId) => dispatch => {
  return axios
    .post(`${domain}/api/results`, { name, time, userId })
    .then(() => {
      dispatch(resetTime());
      dispatch(fetchResultsThunk());
    })
    .catch(err => console.error(err));
};

// REDUCER
export default function(state = defaultTime, action) {
  switch (action.type) {
    case INCREMENT_TIME:
      return action.time;
    case RESET_TIME:
      return 0;
    default:
      return state;
  }
}
