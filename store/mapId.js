const SET_ID = 'SET_ID';
const CLEAR_ID = 'CLEAR_ID';

export const setMapId = id => ({ type: SET_ID, id });
export const clearMapId = () => ({ type: CLEAR_ID });

export default function reducer(state = 0, action) {
  switch (action.type) {
    case SET_ID:
      return action.id;
    case CLEAR_ID:
      return 0;
    default:
      return state;
  }
}
