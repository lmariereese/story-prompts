import axios from 'axios';
import {LOAD_CONTENT, SAVE_CONTENT} from './actions';

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
  try {
    const {data} = await axios.get(`/api/content/${promptId}`);
    dispatch(loadContent(data));
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
  id: null,
  data: {},
  promptId: null
};

// REDUCER
const content = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CONTENT: {
      const {id, data, promptId} = action.content;
      return {...state, id, data, promptId};
      // return { id: action.content.id, data: action.content.data, promptId: action.content.promptId };
    }
    case LOAD_CONTENT: {
      if (action.content === 'no content') {
        return {...state, id: null, data: {}, promptId: null};
      } else {
        const {id, data, promptId} = action.content;
        return {...state, id, data, promptId};
        // return {id: action.content.id, data: action.content.data, promptId: action.content.promptId };
      }
    }
    default:
      return state;
  }
};

export default content;
