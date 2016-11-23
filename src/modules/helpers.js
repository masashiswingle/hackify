import $ from 'jquery';
import store from '../index';

export const communicateAction = (text) => {
  const recP = document.getElementById('conversationPlayer');
  if (recP) {
    recP.innerHTML = 'Recognized: '+"'"+ text + "'";
    $('#conversationPlayer').css({ opacity: 0.0, visibility: 'visible' }).animate({ opacity: 0.6 }, 1200);

    setTimeout(() => {
      $('#conversationPlayer').css('opacity', "0.6").animate({ opacity: 0 }, 1200, () => {
        $('#conversationPlayer').css("visibility", "hidden");
      });
    }, 2000);
  }
};

export const errorMessage = (text) => {
    var recP = document.getElementById('conversationPlayer');
    if (recP) {
      recP.innerHTML = text;
      $('#conversationPlayer').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 0.6}, 1200); 

      setTimeout(function () {
      $('#conversationPlayer').css("opacity", "0.6").animate({opacity: 0}, 1200, function(){
        $('#conversationPlayer').css("visibility", "hidden");
      });
        
      },2000);
    }
  };

export const dequeueSong = () => {
  if (store.getState().songQueue.length > 0) {
    const currentSong = store.getState().currentSong;
    store.dispatch({
      type: 'ADD_TO_HISTORY',
      song: currentSong
    });
    store.dispatch({
      type: 'DEQUEUE_SONG',
      view: 'player'
    });
    communicateAction('Playing next song in queue...');
  }
};

export const playPrevious = () => {
  if (store.getState().songHistory.length > 0) {
    store.dispatch({
      type: 'PLAY_PREVIOUS'
    });
    communicateAction('Playing previous song...');
  }
};

export const restartSong = () => {
  store.dispatch({
    type: 'RESTART_SONG'
  });
  communicateAction('Restarting song...');
};

export const muteSong = () => {
  store.dispatch({
    type: 'MUTE'
  });
  communicateAction('Mute');
};

export const unMuteSong = () => {
  store.dispatch({
    type: 'UNMUTE'
  });
  communicateAction('Unmute');
};

export const increaseVolume = (previousVolume) => {
  var el = document.getElementById('volumebar');
  el.value=previousVolume;
  el.dispatchEvent(new Event('input', {bubbles: true}));
  setTimeout(function () {
    $('#helpBar').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 0.6}, 1200);
  }, 3000)


};

export const decreaseVolume = () => {
  var el = document.getElementById('volumebar');
  var previousVolume = el.value;
  console.log(previousVolume)
  el.value='10';
  el.dispatchEvent(new Event('input', {bubbles: true}));
  setTimeout(function () {
    increaseVolume(previousVolume) }, 4000);
};
