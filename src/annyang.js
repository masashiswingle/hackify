import * as helpers from './modules/ajax';

module.exports = {
  annyangCall: function() {
    // Creates query based on passed params
    function createQuery(songName, artistName) {
      if (artistName) {
        var query = songName +' by ' + artistName;
      } else {
        query = songName + 'song';
      }
      return query;
    };

    // Finds and plays new song
    function playSong(songName, artistName) {
      $('.spinner-toggle').toggle();
      var query = createQuery(songName, artistName);
      helpers.youTubeGetSongAnnyang(query, songName, artistName);
    };

    // Adds song to queue to be played later
    function addToQueue (songName, artistName) {
      var query = createQuery(songName, artistName);
      helpers.addSongToQueue(query, songName, artistName);
    };

    // Plays next song in queue
    function dequeue () {
      helpers.dequeueSong();
      communicateAction('<div>Playing next song in queue...</div>');
    };

    // Shows messages dialog
    function communicateAction(text) {
      var recP = document.getElementById('conversationPlayer');
      if (recP) {
        recP.innerHTML = 'Recognized: '+"'"+ text + "'";
        setTimeout(function () {
          document.getElementById('conversationPlayer').innerHTML = '';
        },4000);
      }
    };

    // Show warnings dialog
    function errorMessage(text) {
      var recP = document.getElementById('conversationPlayer');
      if (recP) {
        recP.innerHTML = text;
        setTimeout(function () {
          document.getElementById('conversationPlayer').innerHTML = '';
        },4000);
      }
    };

    // Defines commands
    if (annyang) {
      var commands = {
        'display top ten': function () {
          document.getElementById('react-tabs-2').click();
        },

        'display lyrics': function () {
          document.getElementById('react-tabs-0').click();
        },

        'display popular': function () {
          document.getElementById('react-tabs-4').click();
        },

        'display albums': function () {
          document.getElementById('react-tabs-6').click();
        },

        'display related': function () {
          document.getElementById('react-tabs-8').click();
        },

        'sound': function () {
          helpers.decreaseVolume();
        },

        'sound bear': function () {
          console.log('nooo');
          helpers.decreaseVolume();
        },

        'stop': function () {
            document.getElementById('player-pause').click();
        },

        'pause': function () {
            document.getElementById('player-pause').click();
        },

        'resume': function () {
          document.getElementById('player-play').click();
        },

        'continue': function () {
          document.getElementById('player-play').click();
        },

        'forward': function () {
          document.getElementById('player-forward').click();
        },

        'backward': function () {
          document.getElementById('player-backward').click();
        },

        'sound bear mute song': function () {
          helpers.muteSong();
        },

        'sound bear unmute song': function () {
          helpers.unMuteSong();
        },

        'skip song': function () {
          dequeue();
        },

        'play next song': function () {
          dequeue();
        },

        'play previous song': function () {
          helpers.playPrevious();
        },

        'restart song': function() {
          helpers.restartSong();
        },

        'play track *song': function (song) {
          communicateAction('Play track ' + song);
          playSong(song);
        },

        'play *song by *artist': function (song, artist) {
          communicateAction('Play song ' + song + ' by ' + artist);
          playSong(song, artist);
        },

        'play song *song': function (song) {
          communicateAction('Play song ' + song);
          playSong(song);
        },

        'play *song': function (song) {
          communicateAction('Play ' + song);
          playSong(song);
        },

        'add next *song by *artist': function (song, artist) {
          communicateAction('Add next ' + song +' by ' + artist);
          addToQueue(song, artist);
        },

        'add next *song': function (song) {
          communicateAction('Add next ' + song);
          addToQueue(song);
        },

        'add to queue *song by *artist': function (song, artist) {
          communicateAction('Add to queue ' + song +' by ' + artist);
          addToQueue(song, artist);
        },

        'add to queue *song': function (song) {
          communicateAction('Add to queue ' + song);
          addToQueue(song);
        },

        ':nomatch': function (message) {
          errorMessage('Sorry, I don\'t understand this action: ' + message);
        }
      };

      // Adds commands to annyang
      annyang.addCommands(commands);

      // Starts listening
      annyang.start();
    }

    annyang.addCallback('error', function () {
      errorMessage('Oops! Something isn\'t right...');
    });
  }
};