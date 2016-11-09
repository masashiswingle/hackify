export function switchViewToPlayer(view, currentSong) {
  return {
    type: 'SWITCH_VIEW_TO_PLAYER',
    view,
    currentSong
  };
}

export function initiateQueue() {
  return {
    type: 'INITIATE_QUEUE',
    songQueue: [],
    songHistory: []
  };
}

export function changeCurrentSong(currentSong) {
  return {
    type: 'CHANGE_CURRENT_SONG',
    currentSong
  };
}
