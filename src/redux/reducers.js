function mainReducer(state = {}, action) {
  switch (action.type) {
    case 'SWITCH_VIEW_TO_PLAYER':
      return { view: action.view, currentSong: action.currentSong };
    default:
      return state;
  }
}

export default mainReducer;
