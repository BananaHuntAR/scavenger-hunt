import axios from 'axios';
import domain from '../domain.js';

// ACTION TYPES
const ADD_ITEM = 'ADD_ITEM';
const RESET_ITEM = 'RESET_ITEM';

// ACTION CREATORS
export const addItem = items => ({ type: ADD_ITEM, items });
export const resetCustomItems = () => ({ type: RESET_ITEM });

// THUNK CREATORS
export const postMap = map => dispatch => {
  return axios
    .post(`${domain}/api/customMaps`, map)
    .then(() => dispatch(resetCustomItems()))
    .catch(err => console.error(err));
};

// REDUCER
export default function reducer (state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return action.items;
    case RESET_ITEM:
      return [];
    default:
      return state;
  }
}
