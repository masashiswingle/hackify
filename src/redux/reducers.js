const mainReducer = function (state = {}, action) {
  switch (action.type) {
    case 'SWITCH_VIEW_TO_PLAYER':
      return {
        ...state,
        view: action.view,
        currentSong: {
          videoId: action.currentSong.videoId,
          title: action.currentSong.title,
          artwork: action.currentSong.artwork,
          songName: action.currentSong.songName,
          artistName: action.currentSong.artistName,
          artistId: action.currentSong.artistId,
          countries: action.currentSong.countries
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
          videoId: action.currentSong.videoId,
          title: action.currentSong.title,
          artwork: action.currentSong.artwork,
          songName: action.currentSong.songName,
          artistName: action.currentSong.artistName,
          artistId: action.currentSong.artistId,
          countries: action.currentSong.countries
        }
      };
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        songQueue: [...state.songQueue, { videoId: action.songQueue, title: action.title, artwork: action.artwork, songName: action.songName, artistName: action.artistName, artistId: action.artistId, countries: action.countries }]
      };
    case 'DEQUEUE_SONG':
      return {
        ...state,
        currentSong: state.songQueue[0],
        songQueue: [...state.songQueue.slice(1)]
      };
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        songHistory: [...state.songHistory, action.song]
      };
    case 'MODIFY_QUEUE':
      return {
        ...state,
        songQueue: action.newQueue
      };
    case 'MODIFY_HISTORY':
      return {
        ...state,
        songHistory: action.newHistory
      };
    default:
      return state;
  }
};

export default mainReducer;
