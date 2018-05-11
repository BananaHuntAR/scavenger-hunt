import axios from 'axios';
import { fetchResultsThunk } from './results';

// ACTION TYPES
const INCREMENT_TIME = 'INCREMENT_TIME';
const RESET_TIME = 'RESET_TIME';

// INITIAL STATE
const defaultTime = 0;

// ACTION CREATORS
export const incrementTime = time => ({ type: INCREMENT_TIME, time });
export const resetTime = () => ({ type: RESET_TIME });

// THUNK CREATORS
export const postResult = (name, time) => dispatch => {
  return axios
    .post(`http://scavengar-hunt.herokuapp.com/api/results`, { name, time })
    .then(res => dispatch(resetTime()))
    .then(() => dispatch(fetchResultsThunk()))
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
