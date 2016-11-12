const keys = require('../config.js');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi(keys.spotify);
const lyr = require('lyrics-fetcher');

module.exports = {
  getSpotifyData: function(req, res) {
    //console.log("inside getSpotifyData", req.body);
    spotifyApi.searchTracks(req.body.string)
      .then(function(data) {
        //console.log('inside spotify server, artists id: ', data.body.tracks.items[0].artists[0].id);
        res.send(data.statusCode, data.body);
      }, function(err) {
        res.send(400, err);
      });
  },

  getArtistTopTracks: function (req, res) {
    spotifyApi.searchTracks(req.body.string)
      .then(function(data) {
        var artistId = data.body.tracks.items[0].artists[0].id;
        return spotifyApi.getArtistTopTracks(artistId, 'US')
          .then(function(tracks) {
            //console.log('inside getArtistTopTracks', tracks.body)
            res.send(data.statusCode, tracks.body);
          }, function(err) {
              res.send(400, err);
          })
      })
  },

  getArtistAlbums: function (req, res) {
    spotifyApi.searchTracks(req.body.string)
      .then(function(data) {
        var artistId = data.body.tracks.items[0].artists[0].id;
        return spotifyApi.getArtistAlbums(artistId)
          .then(function(albums) {
            //console.log('inside getArtistAlbums', albums.body)
            res.send(data.statusCode, albums.body);
          }, function(err) {
              res.send(400, err);
          })
      })
  },

  //AUTHENTICATION REQUIRED FOR THIS CALL
  getNewReleases: function (req, res) {
    //console.log('inside getNewReleases before call');
    spotifyApi.getNewReleases({ limit : 5, offset: 0, country: 'US' })
      .then(function(data) {
        //console.log('inside getNewReleases', data.body);
        res.send(data.statusCode, data.body);
        done();
        }, function(err) {
          res.send(400, err);
      });
  },

  getRelated: function(req, res) {
        return new Promise(function (resolve, reject) {
            return spotifyApi.getArtistRelatedArtists(req.body.artistId).then(function (data) {

                data.body.artists.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                
                    data.body.artists = data.body.artists.filter(function (artist) {
                        return req.body.excludeList.indexOf(artist.id) === -1;
                    });
                res.send(data.body.artists.slice(0, 10));
                resolve(data.body.artists.slice(0, 10));
            });
        });
    },

  //AUTHENTICATION REQUIRED FOR THIS CALL
  getListOfCategories: function (req, res) {
    spotifyApi.getCategories({
      limit : 20,
      offset: 0,
      country: 'US'
    })
      .then(function(data) {
        //console.log('inside getNewReleases', data.body)
        res.send(data.statusCode, data.body);
        }, function(err) {
            res.send(400, err);
      })
  },

  getLyricsDetail: function (req, res) {
    var artist = req.body.artist;
    var track = req.body.track;
    lyr.fetch(artist, track, function (err, lyrics) {
      if (err) {
        throw err;
      }
      res.send(lyrics);
    });
  }
};
