const keys = require('../config.js');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi(keys.spotify);

module.exports = { 
  getSpotifyData: function(req, res) {
    console.log("inside getSpotifyData", req.body);

    spotifyApi.searchTracks(req.body.string)
      .then(function(data) {
        res.send(data.statusCode, data.body);
      }, function(err) {
        res.send(400, err);
      });
  }


 
  
};