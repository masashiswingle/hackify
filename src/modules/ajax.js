import $ from 'jquery';
import store from '../index';

export const spotifyGetSongs = (params) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: '/getSongs',
      data: { string: params }
    })
    .done((data) => {
      if (data.tracks.items.length > 0) {
        resolve(data);
      } else {
        resolve(null);
      }
    });
  });
};

export const getLyrics = (track, artist, cb) => {
  $.ajax({
    method: 'POST',
    url: '/lyrics',
    data: { artist: artist, track: track }
  })
  .done((data) => {
    cb(data);
  });
};

export const artistTracks = (artist, cb) => {
  $.ajax({
    method: 'POST',
    url: '/artistTracks',
    data: { string: artist }
  })
  .done((data) => {
    cb(data);
  });
};

export const albumInfo = (id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: '/albumInfo',
      data: { id: id }
    })
    .done((data) => {
      resolve(data);
    });
  });
};

export const artistInfo = (id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: '/artistInfo',
      data: { id: id }
    })
    .done((data) => {
      resolve(data);
    });
  });
};

export const artistAlbums = (artist, cb) => {
  $.ajax({
    method: 'POST',
    url: '/artistAlbums',
    data: { string: artist }
  })
  .done((data) => {
    cb(data);
  });
};

export const relatedTree = (artistId, excludeList) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: '/artistsTree',
      data: { artistId: artistId, excludeList: excludeList}
    })
    .done((data) => {
      resolve(data);
    });
  });
};

export const getMostPopular = (cb) => {
  $.ajax({
    method: 'GET',
    url: '/mostPopular'
  })
  .done((data) => {
    cb(data);
  });
};

export const youTubeGetSong = (query, callback) => {
  const request = gapi.client.youtube.search.list({
    q: query,
    part: 'snippet',
    maxResults: 5
  });

  request.execute((response) => {
    if (callback) {
      callback(response);
    }
  });
};

let srchItem;
let countriesArr;
let spotifyArtwork;
let artistId;
let albumName;

export const addSongToQueue = (query, songName, artistName) => {
  return new Promise((resolve, reject) => {
    const request = gapi.client.youtube.search.list({
      q: query,
      part: 'snippet',
      maxResults: 5
    });
    request.execute((response) => {

      return new Promise ((resolve, reject) => {

        spotifyGetSongs(songName + ' ' + artistName)
          .then((songs) => {
            if (songs) {
              spotifyArtwork = songs.tracks.items[0].album.images[1].url;
              albumName = songs.tracks.items[0].album.name;
              countriesArr = songs.tracks.items[0].available_markets;
            } else {
              spotifyArtwork = 'http://static.tumblr.com/qmraazf/ps5mjrmim/unknown-album.png';
              albumName = null;
              countriesArr = ['US'];
            }
            srchItem = response.result.items[0];
            artistId = songs.tracks.items[0].artists[0].id;
            store.dispatch({
              type: 'ADD_TO_QUEUE',
              songQueue: srchItem.id.videoId,
              title: srchItem.snippet.title,
              artwork: spotifyArtwork,
              albumName: albumName,
              songName: songName,
              artistName: artistName,
              countries: countriesArr,
              artistId: artistId,
            });
          });
        resolve();
      })
      .then(() => {
        resolve();
      });
    });
  });
};

export const dequeueSong = () => {
  if (store.getState().songQueue.length > 0) {
    const currentSong = store.getState().currentSong;
    store.dispatch({
      type: 'ADD_TO_HISTORY',
      song: currentSong
    });
    store.dispatch({
      type: 'DEQUEUE_SONG',
      view: 'player'
    });
  }
};

export const muteSong = () => {
  store.dispatch({
    type: 'MUTE'
  });
};

export const unMuteSong = () => {
  store.dispatch({
    type: 'UNMUTE'
  });
};

export const increaseVolume = (previousVolume) => {
  var el = document.getElementById('volumebar');
  el.value=previousVolume;
  el.dispatchEvent(new Event('input', {bubbles: true}));
};

export const decreaseVolume = () => {
  var el = document.getElementById('volumebar');
  var previousVolume = el.value;
  console.log(previousVolume)
  el.value='10';
  el.dispatchEvent(new Event('input', {bubbles: true}));
  setTimeout(function () {
    increaseVolume(previousVolume) }, 5000);
};

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
            if (songs) {
              spotifyArtwork = songs.tracks.items[0].album.images[1].url;
              albumName = songs.tracks.items[0].album.name;
              countriesArr = songs.tracks.items[0].available_markets;
              artistId = songs.tracks.items[0].artists[0].id;
            } else {
              spotifyArtwork = 'http://static.tumblr.com/qmraazf/ps5mjrmim/unknown-album.png';
              albumName = null;
              countriesArr = ['US'];
              artistId = '1';
            }
            srchItem = response.result.items[0];
            store.dispatch({
              type: 'SWITCH_VIEW_TO_PLAYER',
              view: 'player',
              currentSong: {
                videoId: srchItem.id.videoId,
                title: srchItem.snippet.title,
                artwork: spotifyArtwork,
                albumName: albumName,
                songName: songName,
                artistName: artistName,
                artistId: artistId,
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

export const playPrevious = () => {
  if (store.getState().songHistory.length > 0) {
    store.dispatch({
      type: 'PLAY_PREVIOUS'
    });
  }
};

export const restartSong = () => {
  store.dispatch({
    type: 'RESTART_SONG'
  });
};
