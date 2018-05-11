import axios from 'axios';

// ACTION TYPES
const FETCH_RESULTS = 'FETCH_RESULTS';

// ACTION CREATORS
export const fetchResults = results => ({
  type: FETCH_RESULTS,
  results
});

// THUNK CREATORS
export const fetchResultsThunk = () => dispatch => {
  return axios
    .get(`http://scavengar-hunt.herokuapp.com/api/results`)
    .then(res => dispatch(fetchResults(res.data)))
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
