import $ from 'jquery';
// import { switchViewToPlayer } from '../redux/actions';
import store from '../index.js';

export const spotifyGetSongs = (params) => {
  return new Promise ((resolve, reject) => {
    // console.log('in spotifyGetSongs');
    $.ajax({
      method: "POST",
      url: '/getSongs',
      data: { string: params }
    })
    .done(function( data ) {
      // console.log('got from spotifyGetSongs', data);
      resolve(data);
    });
  });
};

export const getLyrics = (track, artist) => {
  console.log("in getLyrics", track, artist);
  $.ajax({
    method: 'POST',
    url: '/lyrics',
    data: { artist: artist, track: track }
  })
  .done(function( data ) {
    // console.log('got lyrics back', data);
    return data;
  })
};

export const artistTracks = (params) => {
  console.log('in artistTracks');
  $.ajax({
    method: "POST",
    url: '/artistTracks',
    data: { string: params }
  })
  .done(function( data ) {
    console.log('got from artistTracks', data);
    return data;
  });
};

export const artistAlbums = (params) => {
  console.log('in artistAlbums');
  $.ajax({
    method: "POST",
    url: '/artistAlbums',
    data: { string: params }
  })
  .done(function( data ) {
    console.log('got from artistAlbums', data);
    return data;
  });
};

//AUTHENTICATION REQUIRED FOR THIS CALL
export const newReleases = () => {
  console.log('in newReleases');
  $.ajax({
    method: "GET",
    url: '/newReleases'
  })
  .done(function( data ) {
    console.log('got from newReleases', data);
    return data;
  });
};

export const relatedArtists = (params) => {
  console.log('in relatedArtists');
  $.ajax({
    method: "POST",
    url: '/relatedArtists',
    data: { string: params }
  })
  .done(function( data ) {
    console.log('got from relatedArtists', data);
    return data;
  });
};

//AUTHENTICATION REQUIRED FOR THIS CALL
export const listOfCategories = () => {
  console.log('in listOfCategories');
  $.ajax({
    method: "GET",
    url: '/listOfCategories'
  })
  .done(function( data ) {
    console.log('got from listOfCategories', data);
    return data;
  });
};

export const youTubeGetSong = (query, callback) => {

  var request = gapi.client.youtube.search.list({
      q: query,
      part: 'snippet',
      maxResults: 5
  });

  request.execute(function(response) {
    if (callback) {
      callback(response);
    }
  });
};

export const addSongToQueue = (query, songName, artistName) => {
  return new Promise(function (resolve, reject) {
    var request = gapi.client.youtube.search.list({
        q: query,
        part: 'snippet',
        maxResults: 5
    });
    request.execute(function(response)  {

      return new Promise (function (resolve, reject) {

        spotifyGetSongs(songName + ' ' + artistName)
          .then(function(songs) {
            var spotifyArtwork = songs.tracks.items[0].album.images[1].url;
            srchItem = response.result.items[0];
            console.log('inside addSongToQueue', srchItem);
            store.dispatch({
              type: 'ADD_TO_QUEUE',
              songQueue: srchItem.id.videoId,
              title: srchItem.snippet.title,
              artwork: spotifyArtwork,
              songName: songName,
              artistName: artistName
            });
          })

          resolve();
      })
      .then(function () {
        resolve();
      });

    });
  });
};

export const dequeueSong = () => {
  console.log('in dequeueSong', store.getState());
  store.dispatch({
              type: 'DEQUEUE_SONG',
              view: 'player'
            });
};

export const stopSong = () => {
  document.getElementById('player-stop').click();
};

export const muteSong = () => {
  document.getElementById('player-volume').click();
};

export const pauseSong = () => {
  document.getElementById('player-pause').click();
};

export const resumeSong = () => {
  document.getElementById('player-play').click();
};

export const forwardSong = () => {
  document.getElementById('player-forward').click();
};

export const backwardSong = () => {
  document.getElementById('player-backward').click();
};

let srchItem;
export const youTubeGetSongAnnyang = (query, songName, artistName) => {
  return new Promise((resolve, reject) => {

    var request = gapi.client.youtube.search.list({
      q: query,
      part: 'snippet',
      maxResults: 5
    });

    request.execute((response) => {

      return new Promise((resolve, reject) => {

        spotifyGetSongs(songName + ' ' + artistName)
          .then(function(songs) {
            var spotifyArtwork = songs.tracks.items[0].album.images[1].url;

            srchItem = response.result.items[0];
            // console.log('inside searchYouTube', srchItem);
            store.dispatch({
              type: 'SWITCH_VIEW_TO_PLAYER',
              view: 'player',
              currentSong: {
                videoId: srchItem.id.videoId,
                title: srchItem.snippet.title,
                artwork: spotifyArtwork,
                songName: songName,
                artistName: artistName
              }
            });
          });


        resolve();
      }).then(() => {
        resolve();
      });
    });
  });
};

export const getSearchItem = () => {
  return srchItem;
};
