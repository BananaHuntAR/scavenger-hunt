// ACTION TYPES
const INCREMENT_ITEMS = 'INCREMENT_ITEMS';

// INITIAL STATE
const defaultItems = 0;

// ACTION CREATORS
export const incrementItems = capturedItems => ({ type: INCREMENT_ITEMS, capturedItems });

// REDUCER
export default function (state = defaultItems, action) {
  switch (action.type) {
    case INCREMENT_ITEMS:
      return action.capturedItems;
    default:
      return state
  }
}
