// ACTION TYPES
const INCREMENT_ITEMS = 'INCREMENT_ITEMS';
const RESET_ITEMS = 'RESET_ITEMS';

// ACTION CREATORS
export const incrementItems = capturedItems => ({
  type: INCREMENT_ITEMS,
  capturedItems
});
export const resetItems = () => ({ type: RESET_ITEMS });

// REDUCER
export default function(state = 0, action) {
  switch (action.type) {
    case INCREMENT_ITEMS:
      return action.capturedItems;
    case RESET_ITEMS:
      return 0;
    default:
      return state;
  }
}
