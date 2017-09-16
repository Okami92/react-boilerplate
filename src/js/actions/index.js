import { SAY_SOMETHING } from './types';


export const saySomething = msg => ({
  type: SAY_SOMETHING,
  payload: msg,
});
