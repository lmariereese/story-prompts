import {combineReducers} from 'redux';
import user from './user';
import elements from './storyElements';
import prompts from './prompts';
import visibilityFilter from './visibilityFilter';
import shared from './shared';
import sortOrder from './sortOrder';
// import content from './content';

export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_ERROR = 'UPDATE_ERROR';

export const GET_ALL_ELEMENTS = 'GET_ALL_ELEMENTS';
export const SET_CURRENT_PROMPT = 'SET_CURRENT_PROMPT';

export const GET_ALL_SHARED = 'GET_ALL_SHARED';

export const SAVE_PROMPT = 'SAVE_PROMPT';
export const SHARE_PROMPT = 'SHARE_PROMPT';
export const GET_ALL_SAVED_PROMPTS = 'GET_ALL_SAVED_PROMPTS';
export const GET_ONE_SAVED_PROMPT = 'GET_ONE_SAVED_PROMPT';
export const UPDATE_STARRED_TOGGLE = 'UPDATE_STARRED_TOGGLE';

export const SORT_BY = 'SORT_BY';

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const visibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_IN_PROGRESS: 'SHOW_IN_PROGRESS',
  SHOW_STARRED: 'SHOW_STARRED'
};

export const SET_SORT_ORDER = 'SET_SORT_ORDER';
export const sortOptions = {
  OLDEST: 'OLDEST',
  NEWEST: 'NEWEST'
};

export const SAVE_CONTENT = 'SAVE_CONTENT';
export const LOAD_CONTENT = 'LOAD_CONTENT';

const rootReducer = combineReducers({
  user,
  elements,
  shared,
  prompts,
  visibilityFilter,
  sortOrder
});

export default rootReducer;
