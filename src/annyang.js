import { youTubeGetSongAnnyang } from './modules/ajax';
import { getSearchItem } from './modules/ajax';

module.exports = {
    annyangCall: function() {
        
        function searchTracks(query) {
            youTubeGetSongAnnyang(query)
              .then(function () {
                var track = getSearchItem();
                console.log('in .then', track);
                document.getElementById('conversation').innerHTML = "";
                communicateAction('<div>Playing ' + track.snippet.title + '</div><img width="150" src="' + track.snippet.thumbnails.medium.url + '">');
            });

        }

        function playSong(songName, artistName) {
            var query = songName;
            if (artistName) {
                query += songName +' by ' + artistName;
            }

            searchTracks(query);
        }

        function communicateAction(text) {
            var rec = document.getElementById('conversation');
            rec.innerHTML += '<div class="action">' + text + '</div>';
        }

        function recognized(text) {
            var rec = document.getElementById('conversation');
            rec.innerHTML += '<div class="recognized"><div>' + text + '</div></div>';
        }

        if (annyang) {
 
            var commands = {
                'stop': function () {
                    
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

                ':nomatch': function (message) {
                    recognized(message);
                    communicateAction('Sorry, I don\'t understand this action');
                }
            };

            // Add our commands to annyang
            annyang.addCommands(commands);

            // Start listening
            annyang.start();
        }

        annyang.addCallback('error', function () {
            communicateAction('error');
        });
    }
}

// export default annyangCall;