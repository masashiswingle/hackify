import { youTubeGetSongAnnyang, addSongToQueue, dequeueSong } from './modules/ajax';
import { getSearchItem } from './modules/ajax';

module.exports = {
    annyangCall: function() {

        
        function searchTracks(query) {
            youTubeGetSongAnnyang(query)
              .then(function () {
                var track = getSearchItem();
                console.log('in .then', track);
                // document.getElementById('conversation').innerHTML = "";
                communicateAction('<div>Playing ' + track.snippet.title + '</div><img width="150" src="' + track.snippet.thumbnails.medium.url + '">');
            });

        }

        function addToQueue (songName, artistName) {
            console.log('in addToQueue')
            var query = songName;
            if (artistName) {
                query += songName +' by ' + artistName;
            }

            addSongToQueue(query)
            .then(function () {
                var track = getSearchItem();
                console.log('in .then of addToQueue', track);
                // document.getElementById('conversation').innerHTML = "";
                communicateAction('<div>Added to queue ' + track.snippet.title + '</div><img width="150" src="' + track.snippet.thumbnails.medium.url + '">');
            });
        }

        function playSong(songName, artistName) {
            var query = songName;
            if (artistName) {
                query += songName +' by ' + artistName;
            }

            searchTracks(query);
        }

        function dequeue () {
            dequeueSong();
            // communicateAction('<div>Added to queue ' + track.snippet.title + '</div><img width="150" src="' + track.snippet.thumbnails.medium.url + '">');
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

                'skip song': function () {
                    dequeue();
                    recognized('Playing next song in queue...');
                },

                'play next song': function () {
                    dequeue();
                    recognized('Playing next song in queue...');
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
                    //recognized('Added next ' + song + ' by ' + artist);
                    addToQueue(song, artist);
                },

                'add next *song': function (song) {
                    //recognized('Added next ' + song);
                    addToQueue(song);
                },

                'add to queue *song': function (song) {
                    //recognized('Queue ' + song);
                    addToQueue(song);
                },

                'add to queue *song by *artist': function (song, artist) {
                    //recognized('Queue ' + song + ' by ' + artist);
                    addToQueue(song, artist);
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