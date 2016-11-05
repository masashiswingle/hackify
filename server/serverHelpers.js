const keys = require('../config.js');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi(keys.spotify);
//const request = require('request');

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

//   searchYouTube: function (obj) {
//     console.log("inside searchYouTube", obj.query);
//     request({
//       // method: 'GET',
//       uri: 'https://www.googleapis.com/youtube/v3/search',

//         part: 'snippet',
//         key: obj.query.key,
//         q: obj.query.query,
//         maxResults: obj.query.max || 5,

//         type: 'video',
//         videoEmbeddable: 'true',
//       dataType: 'jsonp'
//     }, function (error, response, body) {
//         // if (callback) {
//           console.log('YOUTUBE body', body);
//           // console.log('YOUTUBE response', response);
//         //   callback(response); //or body?
//         // // }
//         // console.log('CODE', response.statusCode);
//         if (error) {
//           console.log('YouTube search err', error);
//         }

        
//     });
//   }
// };