import axios from 'axios';
import { GET_ALL_ELEMENTS } from './actions';

// Action Creators
const gotAllElements = allElements => ({
  type: GET_ALL_ELEMENTS,
  allElements
});

// Thunks

export const getAllElements = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/story-elements');
    // data is an array of objects
    dispatch(gotAllElements(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  settings: [],
  adjectives: [],
  characters: [],
  details: [],
  actions: [],
  climaxes: []
};

// Elements Reducer
const elements = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ELEMENTS: {
      const all = { ...state };
      action.allElements.forEach(item => {
        let element =
          item.element === 'climax' ? `${item.element}es` : `${item.element}s`;
        all[element].push(item);
      });
      return {
        settings: all.settings,
        adjectives: all.adjectives,
        characters: all.characters,
        details: all.details,
        actions: all.actions,
        climaxes: all.climaxes
      };
    }
    default:
      return state;
  }
};

export default elements;
