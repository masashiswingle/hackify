export function switchViewToPlayer(view, currentSong) {
  console.log('current song', currentSong)
  return {
    type: 'SWITCH_VIEW_TO_PLAYER',
    view,
    currentSong
  };
}

// export function setCurrentSong(currentSong) {
//   return {
//     type: 'SET_CURRENT_SONG',
//     currentSong
//   };
// }
