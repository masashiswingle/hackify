import * as helpers from './modules/ajax';
import { getSearchItem } from './modules/ajax';
import { getLyrics } from './modules/ajax';

module.exports = {
    annyangCall: function() {

        // Creates query based on passed parame
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
            var query = createQuery(songName, artistName);
            console.log(songName, artistName);
            getLyrics(songName, artistName);
            helpers.youTubeGetSongAnnyang(query)
              .then(function () {
                var track = getSearchItem();
                console.log('in .then', track);
                // document.getElementById('conversation').innerHTML = "";
                communicateAction('<div>Playing ' + track.snippet.title + '</div><img width="150" src="' + track.snippet.thumbnails.medium.url + '">');
            });

        };

        // Adds song to queue to be played later
        function addToQueue (songName, artistName) {
            console.log('in addToQueue')
            var query = createQuery(songName, artistName);

            helpers.addSongToQueue(query)
            .then(function () {
                var track = getSearchItem();
                console.log('in .then of addToQueue', track);
                // document.getElementById('conversation').innerHTML = "";
                communicateAction('<div>Added to queue ' + track.snippet.title + '</div><img width="150" src="' + track.snippet.thumbnails.medium.url + '">');
            });
        };

        // Plays next song in queue
        function dequeue () {
            helpers.dequeueSong();
            //logic to show title and thumbnail needed!
            communicateAction('<div>Playing next song in queue...</div>');

        };

        // Shows messages/warning dialog
        function communicateAction(text) {
            var rec = document.getElementById('conversation');
            rec.innerHTML += '<div class="action">' + text + '</div>';
        }

        // Displays messages with recognized commands
        function recognized(text) {
            var rec = document.getElementById('conversation');
            rec.innerHTML += '<div class="recognized"><div>' + text + '</div></div>';
        }

        // Defines commands
        if (annyang) {

            var commands = {
                'stop': function () {
                    helpers.pauseSong();
                },

                'pause': function () {
                    helpers.pauseSong();
                },

                'resume': function () {
                    helpers.resumeSong();
                },

                'continue': function () {
                    helpers.resumeSong();
                },

                'forward': function () {
                    helpers.forwardSong();
                },

                'backward': function () {
                    helpers.backwardSong();
                },

                'mute': function () {
                    helpers.muteSong();
                },

                'mute volume': function () {
                    helpers.muteSong();
                },

                'skip song': function () {
                    dequeue();
                },

                'play next song': function () {
                    dequeue();
                },

                'play track *song': function (song) {
                    recognized('Play track ' + song);
                    playSong(song);
                },

                'play *song by *artist': function (song, artist) {
                    recognized('Play song ' + song + ' by ' + artist);
                    playSong(song, artist);
                },

                'play song *song': function (song) {
                    recognized('Play song ' + song);
                    playSong(song);
                },

                'play *song': function (song) {
                    recognized('Play ' + song);
                    playSong(song);
                },

                'add next *song by *artist': function (song, artist) {
                    recognized('Add next ' + song +' by ' + artist);
                    addToQueue(song, artist);
                },

                'add next *song': function (song) {
                    recognized('Add next ' + song);
                    addToQueue(song);
                },

                'add to queue *song': function (song) {
                    recognized('Add to queue ' + song);
                    addToQueue(song);
                },

                'add to queue *song by *artist': function (song, artist) {
                    recognized('Add to queue ' + song +' by ' + artist);
                    addToQueue(song, artist);
                },

                ':nomatch': function (message) {
                    // recognized(message);
                    communicateAction('Sorry, I don\'t understand this action: ' + message);
                }
            };

            // Adds our commands to annyang
            annyang.addCommands(commands);

            // Starts listening
            annyang.start();
        }

        annyang.addCallback('error', function () {
            communicateAction('Oops! Something isn\'t right...');
        });
    }
}
