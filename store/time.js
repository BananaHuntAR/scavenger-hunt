// ACTION TYPES
const INCREMENT_TIME = 'INCREMENT_TIME';
const RESET_TIME = 'RESET_TIME';

// ACTION CREATORS
export const incrementTime = time => ({ type: INCREMENT_TIME, time });
export const resetTime = () => ({ type: RESET_TIME });

// REDUCER
export default function(state = 0, action) {
  switch (action.type) {
    case INCREMENT_TIME:
      return action.time;
    case RESET_TIME:
      return 0;
    default:
      return state;
  }
}
