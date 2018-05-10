import axios from 'axios';

// ACTION TYPES
const FETCH_LEADERBAORD = 'FETCH_LEADERBAORD';

// ACTION CREATORS
export const fetchLeaderboard = leaderboard => ({
  type: FETCH_LEADERBAORD,
  leaderboard
});

// THUNK CREATORS
export const leaderboardThunk = () => dispatch => {
  return axios
    .get(`http://scavengar-hunt.herokuapp.com/api/results`)
    .then(res => dispatch(fetchLeaderboard(res.data)))
    .catch(err => console.error(err));
};

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_LEADERBAORD:
      return action.leaderboard;
    default:
      return state;
  }
}
