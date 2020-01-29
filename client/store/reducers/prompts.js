import axios from 'axios';
import {
  SAVE_PROMPT,
  GET_ALL_SAVED_PROMPTS,
  GET_ONE_SAVED_PROMPT
} from './actions';
import {DISPLAY_ONE_PROMPT} from '../index';

// Action Creators
export const displayOnePrompt = id => ({
  type: DISPLAY_ONE_PROMPT,
  id
});

const savedPrompt = prompt => ({
  type: SAVE_PROMPT,
  prompt
});

const gotAllSavedPrompts = prompts => ({
  type: GET_ALL_SAVED_PROMPTS,
  prompts
});

const gotOneSavedPrompt = prompt => ({
  type: GET_ONE_SAVED_PROMPT,
  prompt
});

// Thunks
export const savePrompt = els => async dispatch => {
  try {
    const {data} = await axios.post('/api/prompts/', els);
    dispatch(savedPrompt(data));
  } catch (err) {
    console.error(err);
  }
};

export const getAllSavedPrompts = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/prompts/`);
    dispatch(gotAllSavedPrompts(data));
  } catch (err) {
    console.error(err);
  }
};

export const getOnePrompt = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/prompts/prompt/${id}`);
    dispatch(gotOneSavedPrompt(data));
  } catch (err) {
    console.error(err);
  }
};

const initialState = {
  all: [],
  current: {},
  currentContent: {}
};

// Reducer
const prompts = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PROMPT: {
      const allPrompts = [...state.all, action.prompt];
      return {...state, all: allPrompts};
    }
    case GET_ALL_SAVED_PROMPTS: {
      return {...state, all: action.prompts};
    }
    case GET_ONE_SAVED_PROMPT: {
      const promptContent = action.prompt.content;
      return {...state, current: action.prompt, currentContent: promptContent};
      // return { ...state, current: action.prompt };
    }
    case DISPLAY_ONE_PROMPT: {
      // TODO
      const singlePrompt = state.all.filter(el => el.id === action.id);
      return state;
    }
    default:
      return state;
  }
};

export default prompts;
