import axios from 'axios';
import domain from '../domain.js';
import { resetTime } from './time.js';

// ACTION TYPES
const FETCH_RESULTS = 'FETCH_RESULTS';

// ACTION CREATORS
export const fetchResults = results => ({
  type: FETCH_RESULTS,
  results
});

// THUNK CREATORS
export const fetchResultsThunk = mapId => dispatch => {
  if (mapId) {
    return axios
      .get(`${domain}/api/customMaps/${mapId}/results`)
      .then(res => dispatch(fetchResults(res.data)))
      .catch(err => console.error(err));
  } else {
    return axios
      .get(`${domain}/api/results/quickPlay`)
      .then(res => dispatch(fetchResults(res.data)))
      .catch(err => console.error(err));
  }
};

export const postResult = (name, time, userId, mapId) => dispatch => {
  return axios
    .post(`${domain}/api/results`, { name, time, userId, mapId })
    .then(() => {
      dispatch(resetTime());
      dispatch(fetchResultsThunk(mapId));
    })
    .catch(err => console.error(err));
};

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_RESULTS:
      return action.results;
    default:
      return state;
  }
}
