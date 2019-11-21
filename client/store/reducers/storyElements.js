// import axios from 'axios';
// import {GET_ALL_ELEMENTS} from './actions';

// // Action Creators
// const gotAllElements = (allElements) => ({
//   type: GET_ALL_ELEMENTS,
//   allElements
// })

// // Thunks

// export const getAllSettings = () => async (dispatch) => {
//   try {
//     const {data} = await axios.get('/api/story-elements');
//     dispatch(gotAllElements(data));
//   } catch (error) {
//     console.error(error);
//   }
// }

// const initialState = {
//   settings: [],
//   adjectives: [],
//   characters: [],
//   details: [],
//   actions: [],
//   climaxes: []
// }

// // Elements Reducer
// const elements = (state = initialState, action) => {
//   switch(action.type) {
//     case GET_ALL_ELEMENTS:
//       return {settings: action.settings, adjectives: action.adjectives};
//     default:
//       return state;
//   }
// }

// export default elements;
