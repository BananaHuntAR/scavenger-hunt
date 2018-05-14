import axios from 'axios';

// ACTION TYPES
const ADD_ITEM = 'ADD_ITEM';
const RESET_ITEM = 'RESET_ITEM';

// ACTION CREATORS
export const addItem = item => ({ type: ADD_ITEM, item });
export const resetItems = () => ({ type: RESET_ITEM });

// THUNK CREATORS
export const postMap = map => dispatch => {
  return axios
    .post(`http://scavengar-hunt.herokuapp.com/api/customMaps`, map)
    .then(() => dispatch(resetItems()))
    .catch(err => console.error(err));
};

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item];
    case RESET_ITEM:
      return [];
    default:
      return state;
  }
}
