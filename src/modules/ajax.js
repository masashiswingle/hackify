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
      console.log('got from spotifyGetSongs', data);
      if (data.tracks.items.length > 0) {
        resolve(data);
      } else {
        resolve(null);
      }
    });
  });
};

export const getLyrics = (track, artist, cb) => {
  console.log("in getLyrics", track, artist);
  $.ajax({
    method: 'POST',
    url: '/lyrics',
    data: { artist: artist, track: track }
  })
  .done(function( data ) {
    // console.log('got lyrics back', data);
    cb(data);
    // return data;
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


export const relatedTree = (artistId, excludeList) => {
  return new Promise(function (resolve, reject) {
    console.log('in relatedTree');
    $.ajax({
      method: "POST",
      url: '/artistsTree',
      data: { artistId: artistId, excludeList: excludeList}
    })
    .done(function( data ) {
      console.log('got from relatedTree', data);
      resolve(data);
      //return data;
    });
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
            var spotifyArtwork, countriesArr;
            if (songs) {
              spotifyArtwork = songs.tracks.items[0].album.images[1].url;
              countriesArr = songs.tracks.items[0].available_markets;
            } else {
              spotifyArtwork = 'http://static.tumblr.com/qmraazf/ps5mjrmim/unknown-album.png';
              countriesArr = ['US'];
            }
            srchItem = response.result.items[0];
            // console.log('inside addSongToQueue', srchItem);
            store.dispatch({
              type: 'ADD_TO_QUEUE',
              songQueue: srchItem.id.videoId,
              title: srchItem.snippet.title,
              artwork: spotifyArtwork,
              songName: songName,
              artistName: artistName,
              countries: countriesArr
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
  // console.log('in dequeueSong', store.getState());
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

export const increaseVolume = (previousVolume) => {
  var el = document.getElementById('volumebar');
  el.value=previousVolume;
  el.dispatchEvent(new Event('input', {bubbles: true}));
}

export const decreaseVolume = () => {
  var el = document.getElementById('volumebar');
  var previousVolume = el.value;
  console.log(previousVolume)
  el.value='10';
  el.dispatchEvent(new Event('input', {bubbles: true}));

  setTimeout(function () {
    increaseVolume(previousVolume) }, 4000);
}



let srchItem;
let countriesArr;
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
            console.log(songs);
            var spotifyArtwork;
            if (songs) {
              spotifyArtwork = songs.tracks.items[0].album.images[1].url;
              countriesArr = songs.tracks.items[0].available_markets;
            } else {
              spotifyArtwork = 'http://static.tumblr.com/qmraazf/ps5mjrmim/unknown-album.png';
              countriesArr = ['US'];
            }
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
                artistName: artistName,
                countries: countriesArr,
                request: 'playNow'
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

export const getCountries = () => {
  return countriesArr;
};
