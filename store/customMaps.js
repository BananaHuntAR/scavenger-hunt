import axios from 'axios';
import domain from '../domain.js';

// ACTION TYPES
const FETCH_CUSTOM_MAPS = 'FETCH_CUSTOM_MAPS';

// ACTION CREATORS
export const fetchCustomMaps = customMaps => ({
  type: FETCH_CUSTOM_MAPS,
  customMaps
});

// THUNK CREATORS
export const fetchCustomMapsThunk = () => dispatch => {
  return axios
    .get(`${domain}/api/customMaps`)
    .then(res => dispatch(fetchCustomMaps(res.data)))
    .then(() => console.log('fetched custom maps'))
    .catch(err => console.error(err));
};

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CUSTOM_MAPS:
      return action.customMaps;
    default:
      return state;
  }
}
