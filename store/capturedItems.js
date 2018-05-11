// ACTION TYPES
const INCREMENT_ITEMS = 'INCREMENT_ITEMS';
const RESET_ITEMS = 'RESET_ITEMS';

// INITIAL STATE
const defaultItems = 0;

// ACTION CREATORS
export const incrementItems = capturedItems => ({ type: INCREMENT_ITEMS, capturedItems });
export const resetItems = () => ({ type: RESET_ITEMS, capturedItems: 0 });

// REDUCER
export default function (state = defaultItems, action) {
  switch (action.type) {
    case INCREMENT_ITEMS:
      return action.capturedItems;
    case RESET_ITEMS:
      return action.capturedItems;
    default:
      return state
  }
}
