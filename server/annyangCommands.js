var helpers = require('./annyangHelpers.js')    

    if (annyang) {
        
        var commands = {
            'stop': function () {
                helpers.audio.pause();
            },
                'play track *song': function (song) {
                 helpers.recognized('Play track ' + song);
                helpers.playSong(song);
            },
                'play *song by *artist': function (song, artist) {
                 helpers.recognized('Play song ' + song + ' by ' + artist);
                 helpers.playSong(song, artist);
            },
                'play song *song': function (song) {
                 helpers.recognized('Play song ' + song);
                 helpers.playSong(song);
            },
                'play *song': function (song) {
                 helpers.recognized('Play ' + song);
                 helpers.playSong(song);
            },

                ':nomatch': function (message) {
                 helpers.recognized(message);
                 helpers.communicateAction('Sorry, I don\'t understand this action');
            }
        };

        // Add our commands to annyang
        annyang.addCommands(commands);

        // Start listening.
        annyang.start();
    }

    annyang.addCallback('error', function () {
        helpers.communicateAction('error');
    });