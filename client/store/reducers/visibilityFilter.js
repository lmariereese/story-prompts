import {SET_VISIBILITY_FILTER, visibilityFilters} from './index';

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
});

export const getVisiblePrompts = (prompts, filter) => {
  switch (filter) {
    case visibilityFilters.SHOW_IN_PROGRESS:
      return prompts.filter(prompt => prompt.content);
    case visibilityFilters.SHOW_STARRED:
      return prompts.filter(prompt => prompt.starred);
    case visibilityFilters.SHOW_ALL:
      return prompts;
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const visibilityFilter = (state = visibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
