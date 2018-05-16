import axios from 'axios';
import domain from '../domain.js';
import { onSignIn, setStorage } from '../auth';

/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

/* ------------     ACTION CREATORS      ------------------ */

const setCurrentUser = user => ({ type: SET_CURRENT_USER, user });
export const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER });

/* ------------          REDUCER         ------------------ */

export default function reducer(currentUser = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user;

    case REMOVE_CURRENT_USER:
      return {};

    default:
      return currentUser;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const login = (credentials, navigation) => dispatch => {
  return axios
    .put(`${domain}/auth/login`, credentials)
    .then(res => setUserAndRedirect(res.data, navigation, dispatch))
    .catch(() => navigation.navigate('Login', { error: 'Login failed.' }));
};

export const signup = (credentials, navigation) => dispatch => {
  return axios
    .post(`${domain}/auth/signup`, credentials)
    .then(res => setUserAndRedirect(res.data, navigation, dispatch))
    .catch(() => navigation.navigate('Home', { error: 'Signup failed.' }));
};

export const logout = navigation => dispatch => {
  return axios
    .delete(`${domain}/auth/logout`)
    .then(() => {
      dispatch(removeCurrentUser());
      navigation.navigate('Home', { error: 'Logout successful.' });
    })
    .catch(error => console.error('Logout unsuccessful:  ', error));
};

/* ------------      HELPER FUNCTIONS     ------------------ */

export function setUserAndRedirect(user, navigation, dispatch) {
  dispatch(setCurrentUser(user));
  navigation.navigate('UserProfile', { currentUser: user });
}
