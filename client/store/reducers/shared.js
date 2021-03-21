import axios from 'axios';
import {GET_ALL_SHARED} from './index';

const getShared = shared => ({
  type: GET_ALL_SHARED,
  shared
});

export const getAllShared = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/prompts/share');
    // data is an array of objects
    dispatch(getShared(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  all: [],
  current: {}
};

const shared = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SHARED: {
      return {...state, all: action.shared};
    }
    default:
      return state;
  }
};

export default shared;
