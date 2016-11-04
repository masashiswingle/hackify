import { LOG } from './actions';

function log(state = {}, action) {
  switch (action.type) {
    case LOG:
      return {
        text: action.text
      };
    default:
      return state;
  }
}

export default log;
