import axios from 'axios';
import { LOAD_CONTENT, SAVE_CONTENT } from './actions';
import { EditorState } from 'draft-js';

// Action creators
const loadContent = content => ({
  type: LOAD_CONTENT,
  content
});

const saveContent = content => ({
  type: SAVE_CONTENT,
  content
});

// Thunks
export const loadCurrentContent = promptId => async dispatch => {
  console.log('load current content thunk!');
  try {
    const { data } = await axios.get(`/api/content/${promptId}`);
    console.log(data);
    dispatch(loadContent(data));
  } catch (err) {
    console.error(err);
  }
};

export const saveCurrentContent = (content, promptId) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/content/${promptId}`, { content });
    dispatch(saveContent(data));
  } catch (err) {
    console.error(err);
  }
};

const initialState = {
  id: null,
  data: {},
  editorState: EditorState.createEmpty()
};

// REDUCER
const content = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CONTENT: {
      // spread operator might not work for data here
      return { ...state, id: action.content.id };
    }
    case LOAD_CONTENT: {
      if (action.content === 'no content') {
        return { id: null, data: {} };
      } else {
        return { id: action.content.id, data: action.content.data };
      }
    }
    default:
      return state;
  }
};

export default content;
