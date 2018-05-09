// ACTION TYPES
const INCREMENT_TIME = 'INCREMENT_TIME';
const RESET_TIME = 'RESET_TIME';

// INITIAL STATE
const defaultTime = 0;

// ACTION CREATORS
export const incrementTime = time => ({ type: INCREMENT_TIME, time });
export const resetTime = () => ({ type: RESET_TIME, time: 0 });

// REDUCER
export default function (state = defaultTime, action) {
  switch (action.type) {
    case INCREMENT_TIME:
      return action.time;
    case RESET_TIME:
      return action.time;
    default:
      return state
  }
}
