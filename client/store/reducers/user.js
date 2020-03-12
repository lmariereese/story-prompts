import axios from 'axios';
import history from '../../history';
import {GET_USER, REMOVE_USER, UPDATE_USER, UPDATE_ERROR} from './index';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});
const update = user => ({type: UPDATE_USER, user});
const updateError = (error, property) => ({
  type: UPDATE_ERROR,
  error,
  property
});

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, {email, password});
  } catch (authError) {
    return dispatch(getUser({error: authError}));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/prompts');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = (property, newVal) => async dispatch => {
  let res;
  try {
    res = await axios.put(`/auth/update/${property}`, {newEmail: newVal});
  } catch (err) {
    return dispatch(updateError(err.response, property));
  }

  try {
    dispatch(update(res.data, property));
  } catch (dispatchErr) {
    console.error(dispatchErr);
  }
};

export const updateUserPassword = (
  property,
  newVal,
  oldVal
) => async dispatch => {
  let res;
  try {
    res = await axios.put(`/auth/update/${property}`, {
      newPassword: newVal,
      password: oldVal
    });
  } catch (err) {
    dispatch(updateError(err.response, property));
  }

  try {
    dispatch(update(res.data, property));
    // history.push('/prompts');
  } catch (dispatchErr) {
    console.error(dispatchErr);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER:
      return {...action.user};
    case UPDATE_ERROR:
      return {...state, error: action.error, errorProperty: action.property};
    default:
      return state;
  }
}
