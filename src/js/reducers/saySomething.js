import { SAY_SOMETHING } from '../actions/types';

const INITIAL_STATE = '';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAY_SOMETHING:
      return action.payload;
    default:
      return state;
  }
};
