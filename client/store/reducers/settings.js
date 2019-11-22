// import axios from 'axios';
// import { GET_ALL_SETTINGS, GET_ONE_SETTING } from './actions';
// import { randomNumber } from '../helperFuncs';

// // Action Creators
// const gotAllSettings = allSettings => ({
//   type: GET_ALL_SETTINGS,
//   allSettings
// });

// const gotOneSetting = setting => ({
//   type: GET_ONE_SETTING,
//   setting
// });

// // Thunks
// export const getAllSettings = () => async dispatch => {
//   try {
//     const { data } = await axios.get(`/api/story-elements/setting`);
//     dispatch(gotAllSettings(data));
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const randomElement = state => {
//   console.log(state);
//   let availableArray = state.settings.available;
//   let copy = [...availableArray];
//   let number = Math.floor(Math.random() * copy.length);
//   return copy[number];
// };

// export const getOneSetting = () => {
//   return (dispatch, getState) => {
//     const setting = randomElement(getState());
//     dispatch(gotOneSetting(setting));
//   };
// };

// const initialState = {
//   all: [],
//   current: {},
//   available: []
// };

// // Settings Reducer
// const settings = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_ALL_SETTINGS: {
//       const copy = [...action.allSettings];
//       return { ...state, all: action.allSettings, available: copy };
//     }
//     case GET_ONE_SETTING: {
//       const availableCopy = [...state.available];
//       const setting = action.setting;
//       const newAvailable = availableCopy.filter(item => item.id !== setting.id);
//       return { ...state, available: newAvailable, current: setting };
//     }
//     default:
//       return state;
//   }
// };

// export default settings;
