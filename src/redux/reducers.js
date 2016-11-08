const mainReducer = function (state = {}, action) {
  switch (action.type) {
    case 'SWITCH_VIEW_TO_PLAYER':
      return {
        ...state,
        view: action.view,
        currentSong: action.currentSong
      };
    case 'INITIATE_QUEUE':
      return {
        ...state,
        songQueue: action.songQueue
      };
    case 'CHANGE_CURRENT_SONG':
      return {
        ...state,
        currentSong: action.currentSong
      };
    default:
      return state;
  }
};

export default mainReducer;
