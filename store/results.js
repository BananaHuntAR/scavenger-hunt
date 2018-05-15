import axios from 'axios';
import domain from '../domain.js';

// ACTION TYPES
const FETCH_RESULTS = 'FETCH_RESULTS';
const FETCH_RESULTS_BY_USER = 'FETCH_RESULTS_BY_USER';

// ACTION CREATORS
export const fetchResults = results => ({
  type: FETCH_RESULTS,
  results
});

export const fetchResultsByUser = userResults => ({
  type: FETCH_RESULTS_BY_USER,
  userResults
});

// THUNK CREATORS
export const fetchResultsThunk = () => dispatch => {
  return axios
    .get(`${domain}/api/results`)
    .then(res => dispatch(fetchResults(res.data)))
    .catch(err => console.error(err));
};

export const fetchResultsByUserThunk = userId => dispatch => {
  return axios
    .get(`${domain}/api/users/${userId}/results`)
    .then(res => res.data)
    .then(userResults => dispatch(fetchResultsByUser(userResults)))
    .catch(err => console.error(err));
};

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_RESULTS:
      return action.results;
    case FETCH_RESULTS_BY_USER:
      return action.userResults;
    default:
      return state;
  }
}
