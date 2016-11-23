import * as helpers from './modules/ajax';
import $ from 'jquery';

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
      errorMessage('Playing next song in queue...');
    };

    // Shows messages dialog
    function communicateAction(text) {
      var recP = document.getElementById('conversationPlayer');
      if (recP) {
        recP.innerHTML = 'Recognized: '+"'"+ text + "'";
        $('#conversationPlayer').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 0.6}, 1200); 

        setTimeout(function () {
        $('#conversationPlayer').css("opacity", "0.6").animate({opacity: 0}, 1200, function(){
          $('#conversationPlayer').css("visibility", "hidden");
        });
          //document.getElementById('conversationPlayer').innerHTML = '';
        },2000);
      }
    };

    // Show warnings dialog
    function errorMessage(text) {
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

    // Defines commands
    if (annyang) {
      var commands = {
        'display top ten': function () {
          document.getElementById('react-tabs-2').click();
          communicateAction('Display top ten');
        },

        'display lyrics': function () {
          document.getElementById('react-tabs-0').click();
          communicateAction('Display lyrics');
        },

        'display popular': function () {
          document.getElementById('react-tabs-4').click();
          communicateAction('Display popular songs');
        },

        'display albums': function () {
          document.getElementById('react-tabs-6').click();
          communicateAction('Display artist\'s albums');
        },

        'display related': function () {
          document.getElementById('react-tabs-8').click();
          communicateAction('Display related artists');
        },

        'sound': function () {
          helpers.decreaseVolume();
        },

        'sound bear': function () {
          helpers.decreaseVolume();
        },

        'stop': function () {
            document.getElementById('player-pause').click();
            communicateAction('Stop');
        },

        'pause': function () {
            document.getElementById('player-pause').click();
            communicateAction('Pause');
        },

        'resume': function () {
          document.getElementById('player-play').click();
          communicateAction('Resume');
        },

        'continue': function () {
          document.getElementById('player-play').click();
          communicateAction('Continue');
        },

        'forward': function () {
          document.getElementById('player-forward').click();
          communicateAction('Forward');
        },

        'backward': function () {
          document.getElementById('player-backward').click();
          communicateAction('Backward');
        },

        'sound bear mute song': function () {
          helpers.muteSong();
          communicateAction('Mute');
        },

        'sound bear unmute song': function () {
          helpers.unMuteSong();
          communicateAction('Unmute');
        },

        'skip song': function () {
          dequeue();
        },

        'play next song': function () {
          dequeue();
        },

        'play previous song': function () {
          helpers.playPrevious();
          errorMessage('Restarting previous song...');
        },

        'restart song': function() {
          helpers.restartSong();
          errorMessage('Restarting previous song...');
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
      annyang.start({ autoRestart: false, continuous: false });
    }

    annyang.addCallback('error', function () {
      errorMessage('Oops! Something isn\'t right...');
    });
  }
};