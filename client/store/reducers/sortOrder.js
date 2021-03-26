import {SET_SORT_ORDER, sortOptions} from './index';
import moment from 'moment';

export const setSortOrder = order => ({
  type: SET_SORT_ORDER,
  order
});

export const getSortedPrompts = (prompts, order) => {
  switch (order) {
    case sortOptions.OLDEST: {
      return prompts.sort(
        (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
      );
    }
    case sortOptions.NEWEST: {
      return prompts.sort(
        (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
      );
    }
    default:
      return prompts;
  }
};

const sortOrder = (state = sortOptions.OLDEST, action) => {
  switch (action.type) {
    case SET_SORT_ORDER:
      return action.order;
    default:
      return state;
  }
};

export default sortOrder;
