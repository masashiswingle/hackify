// import { LOG } from './actions';

// function log(state = {}, action) {
//   switch (action.type) {
//     case 'LOG':
//       return {
//         text: action.text
//       };
//     default:
//       return state;
//   }
// }
//
// export default log;

function switchView(state = {}, action) {
  switch (action.type) {
    case 'SWITCH_VIEW':
      return {
        view: action.view
      };
    default:
      return state;
  }
}

export default switchView;
