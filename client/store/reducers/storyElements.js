import axios from 'axios';
import {GET_ALL_ELEMENTS, SET_CURRENT_PROMPT} from './index';
import {randomNumber} from '../../components/helperFuncs';

// Action Creators
const gotAllElements = allElements => ({
  type: GET_ALL_ELEMENTS,
  allElements
});

const setCurrentPrompt = () => ({
  type: SET_CURRENT_PROMPT
});

// Thunks
export const getAllElements = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/story-elements');
    // data is an array of objects
    dispatch(gotAllElements(data));
  } catch (error) {
    console.error(error);
  }
};

export const setCurrent = () => dispatch => {
  dispatch(setCurrentPrompt());
};

const initialState = {
  setting: [],
  adjective: [],
  character: [],
  detail: [],
  action: [],
  climax: [],
  current: {
    setting: {},
    adjective: {},
    character: {},
    detail: {},
    action: {},
    climax: {}
  }
};

// Elements Reducer
const elements = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ELEMENTS: {
      const all = {...state};
      const currentCopy = Object.assign(state.current, {});
      action.allElements.forEach(item => {
        let element = item.element;
        all[element].push(item);
      });
      return {
        setting: all.setting,
        adjective: all.adjective,
        character: all.character,
        detail: all.detail,
        action: all.action,
        climax: all.climax,
        current: currentCopy
      };
    }
    case SET_CURRENT_PROMPT: {
      // Object.assign(target, ...sources)
      // Object.assign({}, state.current)
      let currentCopy = Object.assign(state.current, {});
      for (let key in state) {
        if (key !== 'current') {
          let len = state[key].length;
          let idx = randomNumber(len);
          currentCopy[key] = Object.assign(state[key][idx], {});
        }
      }
      return {
        setting: Object.assign(state.setting, []),
        adjective: Object.assign(state.adjective, []),
        character: Object.assign(state.character, []),
        detail: Object.assign(state.detail, []),
        action: Object.assign(state.action, []),
        climax: Object.assign(state.climax, []),
        current: currentCopy
      };
    }
    default:
      return state;
  }
};

export default elements;
