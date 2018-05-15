import axios from 'axios';
import domain from '../domain.js';

//ACTION TYPE
const FETCH_RESULTS_BY_USER = 'FETCH_RESULTS_BY_USER';

//ACTION CREATOR
export const fetchResultsByUser = userResults => ({
  type: FETCH_RESULTS_BY_USER,
  userResults
});

//THUNK CREATOR
export const fetchResultsByUserThunk = userId => dispatch => {
  return axios
    .get(`${domain}/api/users/${userId}/results`)
    .then(res => res.data)
    .then(results => {
      return dispatch(fetchResultsByUser(results));
    })
    .catch(err => console.error(err));
};

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_RESULTS_BY_USER:
      return action.userResults;
    default:
      return state;
  }
}
