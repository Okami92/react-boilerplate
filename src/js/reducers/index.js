import { combineReducers } from 'redux';
import saySomething from './saySomething';

const rootReducer = combineReducers({
  message: saySomething,
});

export default rootReducer;
