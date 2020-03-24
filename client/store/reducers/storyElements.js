import axios from 'axios';
import {
  GET_ALL_ELEMENTS,
  SET_CURRENT_PROMPT,
  REMOVE_USER,
  SHARE_PROMPT
} from './index';
import {getRandomNums} from '../../components/helperFuncs';

// Action Creators
const gotAllElements = allElements => ({
  type: GET_ALL_ELEMENTS,
  allElements
});

const setCurrentPrompt = current => ({
  type: SET_CURRENT_PROMPT,
  current
});

const sharedPrompt = prompt => ({
  type: SHARE_PROMPT,
  urlToken: prompt.urlToken
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

export const getByToken = urlToken => async dispatch => {
  try {
    const {data} = await axios.get(`/api/prompts/${urlToken}`);
    console.log('inside getByToken thunk', data);
    dispatch(setCurrentPrompt(data));
  } catch (err) {
    console.error(err);
  }
};

export const setCurrent = () => {
  return (dispatch, getState) => {
    const {elements} = getState();
    const {setting, adjective, character, detail, action, climax} = elements;
    const randomIdx = getRandomNums([
      setting.length,
      adjective.length,
      character.length,
      detail.length,
      action.length,
      climax.length
    ]);
    const current = {
      setting: elements.setting[randomIdx[0]],
      adjective: elements.adjective[randomIdx[1]],
      character: elements.character[randomIdx[2]],
      detail: elements.detail[randomIdx[3]],
      action: elements.action[randomIdx[4]],
      climax: elements.climax[randomIdx[5]]
    };
    dispatch(setCurrentPrompt(current));
  };
};

export const sharePrompt = els => async dispatch => {
  try {
    const {data} = await axios.post('/api/prompts/share', els);
    dispatch(sharedPrompt(data));
  } catch (err) {
    console.error(err);
  }
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
    climax: {},
    urlToken: null
  }
};

// Elements Reducer
const elements = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ELEMENTS: {
      const all = {...state};
      const currentCopy = Object.assign({}, state.current);
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
      const newCurrent = {...action.current};
      return {...state, current: {...newCurrent}};
    }
    case SHARE_PROMPT: {
      const withUrlToken = {...state.current};
      withUrlToken.urlToken = action.urlToken;
      return {...state, current: {...withUrlToken}};
    }
    case REMOVE_USER: {
      const emptyCurrent = {...initialState.current};
      return {...state, current: {...emptyCurrent}};
    }
    default:
      return state;
  }
};

export default elements;
