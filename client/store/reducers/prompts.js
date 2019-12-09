import axios from 'axios';
import { SAVE_PROMPT, GET_ALL_SAVED_PROMPTS } from './actions';

// Action Creators
const savedPrompt = prompt => ({
  type: SAVE_PROMPT,
  prompt
});

const gotAllSavedPrompts = prompts => ({
  type: GET_ALL_SAVED_PROMPTS,
  prompts
});

// Thunks
export const savePrompt = els => async dispatch => {
  try {
    const { data } = await axios.post('/api/prompts/', els);
    dispatch(savedPrompt(data));
  } catch (err) {
    console.error(err);
  }
};

export const getAllSavedPrompts = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/prompts/`);
    dispatch(gotAllSavedPrompts(data));
  } catch (err) {
    console.error(err);
  }
};

// Reducer
const prompts = (state = [], action) => {
  switch (action.type) {
    case SAVE_PROMPT: {
      return [...state, action.prompt];
    }
    case GET_ALL_SAVED_PROMPTS: {
      return action.prompts;
    }
    default:
      return state;
  }
};

export default prompts;
