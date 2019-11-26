import axios from 'axios';
import { SAVE_PROMPT } from './actions';
// import { runInNewContext } from 'vm';

// Action Creators
const savedPrompt = prompt => ({
  type: SAVE_PROMPT,
  prompt
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

// Reducer
const prompts = (state = [], action) => {
  switch (action.type) {
    case SAVE_PROMPT: {
      return [...state, action.prompt];
    }
    default:
      return state;
  }
};

export default prompts;
