import axios from 'axios';
import domain from '../domain.js';

// ACTION TYPES
const FETCH_CUSTOM_MAPS = 'FETCH_CUSTOM_MAPS';
const FETCH_CUSTOM_MAPS_BY_USER = 'FETCH_CUSTOM_MAPS_BY_USER';

// ACTION CREATORS
export const fetchCustomMaps = customMaps => ({
  type: FETCH_CUSTOM_MAPS,
  customMaps
});

export const fetchCustomMapsByUser = userMaps => ({
  type: FETCH_CUSTOM_MAPS_BY_USER,
  userMaps
});

// THUNK CREATORS
export const fetchCustomMapsThunk = () => dispatch => {
  return axios
    .get(`${domain}/api/customMaps`)
    .then(res => dispatch(fetchCustomMaps(res.data)))
    .then(() => console.log('fetched custom maps'))
    .catch(err => console.error(err));
};

export const fetchCustomMapsByUserThunk = userId => dispatch => {
  return axios
    .get(`${domain}/api/users/${userId}/customMaps`)
    .then(res => res.data)
    .then(userMaps => dispatch(fetchCustomMapsByUser(userMaps)));
};

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CUSTOM_MAPS:
      return action.customMaps;
    case FETCH_CUSTOM_MAPS_BY_USER:
      return action.userMaps;
    default:
      return state;
  }
}
