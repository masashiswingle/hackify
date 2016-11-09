const mainReducer = function (state = {}, action) {
  switch (action.type) {
    case 'SWITCH_VIEW_TO_PLAYER':
      return {
        ...state,
        view: action.view,
        currentSong: {
          videoId: action.currentSong.videoId,
          title: action.currentSong.title,
          artwork: action.currentSong.artwork
        }
      };
    case 'INITIATE_QUEUE':
      return {
        ...state,
        songQueue: action.songQueue,
        songHistory: action.songHistory
      };
    case 'CHANGE_CURRENT_SONG':
      return {
        ...state,
        currentSong: {
          videoId: action.currentSong
        }
      };
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        songQueue: [...state.songQueue, action.songQueue]
      };

    case 'DEQUEUE_SONG':
      return {
        ...state,
        currentSong: state.songQueue[0],
        songQueue: [...state.songQueue.slice(1)]
      };
    default:
      return state;
  }
};

export default mainReducer;
