import $ from 'jquery';
import { switchViewToPlayer } from '../redux/actions';
import store from '../index.js';

// export const ajaxGetSongs = (params) => {
//   console.log('in ajaxGetSongs');
//   $.ajax({
//     method: "POST",
//     url: '/getSongs',
//     data: { string: params }
//   })
//   .done(function( data ) {
//     console.log('got from ajaxGetSongs', data);
//     return data;
//   });
// };

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

let srchItem;
export const youTubeGetSong = (query, callback) => {

  var request = gapi.client.youtube.search.list({
      q: query,
      part: 'snippet', 
      maxResults: 5
  });

  request.execute(function(response) {
    console.log(response);
    if (callback) {
      callback(response);
    }
  });
};

export const getSearchItem = () => {
  return srchItem;
};