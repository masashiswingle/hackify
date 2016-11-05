const mainReducer = function (state = {}, action) {
  console.log('in reducer', action)
  switch (action.type) {
    case 'SWITCH_VIEW_TO_PLAYER':
      return { view: action.view, currentSong: action.currentSong };
      break;
    default:
      return state;
  }
}

export default mainReducer;
