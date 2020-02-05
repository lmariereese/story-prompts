import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
// import user from './user';
// import elements from './reducers/storyElements';
// import prompts from './reducers/prompts';
// import content from './reducers/content';

// const reducer = combineReducers({user, elements, prompts, content});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
export default createStore(rootReducer, middleware);
export * from './reducers/user';
