import axios from 'axios';
import { GET_ALL_SETTINGS, GET_ONE_SETTING } from './actions';
import { randomNumber } from '../helperFuncs';

// Action Creators
const gotAllSettings = settings => ({
  type: GET_ALL_SETTINGS,
  settings
});

const gotOneSetting = setting => ({
  type: GET_ONE_SETTING,
  setting
});

// Thunks
export const getAllSettings = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/story-elements/setting`);
    dispatch(gotAllSettings(data));
  } catch (error) {
    console.error(error);
  }
};

export const getOneSetting = () => {
  return (dispatch, getState) => {
    dispatch(gotOneSetting());
  };
};

const initialState = {
  all: [],
  current: {},
  available: []
};

// Settings Reducer
const settings = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SETTINGS: {
      return { ...state, all: action.settings, available: action.available };
    }
    case GET_ONE_SETTING: {
      const availableCopy = [...state.available];
      const idx = randomNumber(state.all.length);
      const setting = availableCopy[idx];
      const newAvailable = availableCopy.filter(item => item.id !== setting.id);
      return { ...state, available: newAvailable, current: setting };
    }
    default:
      return state;
  }
};

export default settings;
