import axios from 'axios';
import {
  SAVE_PROMPT,
  GET_ALL_SAVED_PROMPTS,
  GET_ONE_SAVED_PROMPT,
  SAVE_CONTENT,
  REMOVE_USER,
  UPDATE_STARRED_TOGGLE
} from './index';

// Action Creators
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

const updateStarred = prompt => ({
  type: UPDATE_STARRED_TOGGLE,
  prompt
});

const saveContent = content => ({
  type: SAVE_CONTENT,
  content
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

export const toggleStarredPrompt = prompt => async dispatch => {
  try {
    const {data} = await axios.put(`/api/prompts/prompt/${prompt.id}`, {
      prompt
    });
    dispatch(updateStarred(data));
  } catch (err) {
    console.error(err);
  }
};

export const saveCurrentContent = (
  content,
  promptId,
  contentId
) => async dispatch => {
  try {
    console.log(
      'promptId inside thunk: ',
      promptId,
      'contentId inside thnk: ',
      contentId
    );
    if (contentId === null) {
      const {data} = await axios.post(`/api/content/${promptId}`, {
        content
      });
      dispatch(saveContent(data));
    } else {
      const {data} = await axios.put(`/api/content/${contentId}`, {content});
      dispatch(saveContent(data));
    }
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
      action.prompt.content = null;
      const allPrompts = [...state.all, action.prompt];
      return {...state, all: allPrompts};
    }
    case GET_ALL_SAVED_PROMPTS: {
      return {...state, all: action.prompts, current: {}, currentContent: {}};
    }
    case GET_ONE_SAVED_PROMPT: {
      const promptContent = action.prompt.content;
      return {...state, current: action.prompt, currentContent: promptContent};
    }
    case UPDATE_STARRED_TOGGLE: {
      let currentCopy = {...state.current};
      currentCopy.starred = action.prompt.starred;
      const allPrompts = state.all.map(prompt => {
        if (prompt.id === action.prompt.id) {
          prompt.starred = action.prompt.starred;
        }
        return prompt;
      });
      return {...state, all: allPrompts, current: currentCopy};
    }
    case SAVE_CONTENT: {
      return {...state, currentContent: action.content};
    }
    case REMOVE_USER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default prompts;
