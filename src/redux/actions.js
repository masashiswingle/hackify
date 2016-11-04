// // export const LOG = 'LOG';
//
// export function log(text) {
//   return {
//     type: 'LOG',
//     text
//   };
// }

export function switchView(view) {
  return {
    type: 'SWITCH_VIEW',
    view
  };
}
