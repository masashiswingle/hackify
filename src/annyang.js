import $ from 'jquery';
import * as helpers from './modules/helpers';

export const annyangCall = () => {
  // Creates query based on passed params
  const createQuery = (songName, artistName) => {
    let query;
    if (artistName) {
      query = songName +' by ' + artistName;
    } else {
      query = songName + 'song';
    }
    return query;
  };

  // Finds and plays new song
  const playSong = (songName, artistName) => {
    $('.spinner-toggle').toggle();
    const query = createQuery(songName, artistName);
    helpers.searchSong(query, songName, artistName, 'playSong');
  };

  // Adds song to queue to be played later
  const addToQueue = (songName, artistName) => {
    const query = createQuery(songName, artistName);
    helpers.searchSong(query, songName, artistName, 'queueSong');
  };

  // Defines commands
  if (annyang) {
    var commands = {
      'display top ten': function () {
        document.getElementById('react-tabs-2').click();
        helpers.communicateAction('Display top ten');
      },

      'display lyrics': function () {
        document.getElementById('react-tabs-0').click();
        helpers.communicateAction('Display lyrics');
      },

      'display popular': function () {
        document.getElementById('react-tabs-4').click();
        helpers.communicateAction('Display popular songs');
      },

      'display albums': function () {
        document.getElementById('react-tabs-6').click();
        helpers.communicateAction('Display artist\'s albums');
      },

      'display related': function () {
        document.getElementById('react-tabs-8').click();
        helpers.communicateAction('Display related artists');
      },

      'sound': function () {
        helpers.decreaseVolume();
      },

      'sound bear': function () {
        helpers.decreaseVolume();
      },

      'stop': function () {
          document.getElementById('player-pause').click();
          helpers.communicateAction('Stop');
      },

      'pause': function () {
          document.getElementById('player-pause').click();
          helpers.communicateAction('Pause');
      },

      'resume': function () {
        document.getElementById('player-play').click();
        helpers.communicateAction('Resume');
      },

      'continue': function () {
        document.getElementById('player-play').click();
        helpers.communicateAction('Continue');
      },

      'forward': function () {
        document.getElementById('player-forward').click();
        helpers.communicateAction('Forward');
      },

      'backward': function () {
        document.getElementById('player-backward').click();
        helpers.communicateAction('Backward');
      },

      'mute song': function () {
        helpers.muteSong();
      },

      'unmute song': function () {
        helpers.unMuteSong();
      },

      'play next song': function () {
        helpers.dequeueSong();
      },

      'play previous song': function () {
        helpers.playPrevious();
      },

      'restart song': function() {
        helpers.restartSong();
      },

      'play track *song': function (song) {
        helpers.communicateAction('Play track ' + song);
        playSong(song);
      },

      'play *song by *artist': function (song, artist) {
        helpers.communicateAction('Play song ' + song + ' by ' + artist);
        playSong(song, artist);
      },

      'play song *song': function (song) {
        helpers.communicateAction('Play song ' + song);
        playSong(song);
      },

      'play *song': function (song) {
        helpers.communicateAction('Play ' + song);
        playSong(song);
      },

      'add next *song by *artist': function (song, artist) {
        helpers.communicateAction('Add next ' + song +' by ' + artist);
        addToQueue(song, artist);
      },

      'add next *song': function (song) {
        helpers.communicateAction('Add next ' + song);
        addToQueue(song);
      },

      'add to queue *song by *artist': function (song, artist) {
        helpers.communicateAction('Add to queue ' + song +' by ' + artist);
        addToQueue(song, artist);
      },

      'add to queue *song': function (song) {
        helpers.communicateAction('Add to queue ' + song);
        addToQueue(song);
      },

      ':nomatch': function (message) {
        helpers.errorMessage('Sorry, I don\'t understand this action: ' + message);
      }
    };

    // Adds commands to annyang
    annyang.addCommands(commands);

    // Starts listening
    annyang.start({ autoRestart: false, continuous: false });
  }

  annyang.addCallback('error', function () {
    helpers.errorMessage('Oops! Something isn\'t right...');
  });
};
