import axios from 'axios';

// ACTION TYPES
const SELECT_MAP = 'SELECT_MAP';
const CLEAR_SELECTED_MAP = 'CLEAR_SELECTED_MAP'

// ACTION CREATORS
export const selectMap = customMap => ({ type: SELECT_MAP, customMap });
export const clearSelectedMap = () => ({ type: CLEAR_SELECTED_MAP });

// REDUCER
export default function reducer (state = {}, action) {
  switch (action.type) {
    case SELECT_MAP:
      return action.customMap;
    case CLEAR_SELECTED_MAP:
      return {};
    default:
      return state;
  }
}
