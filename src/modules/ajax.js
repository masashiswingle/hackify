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

let srchItem;

export const youTubeGetSong = (query, cd) => {
  // return new Promise(function (resolve, reject) {

  //     var request = gapi.client.youtube.search.list({
  //         q: query,
  //         part: 'snippet', 
  //         maxResults: 5
  //     });
  //     request.execute(function(response)  {                                                                                    
  //       return new Promise (function (resolve, reject) {

  //           srchItem = response.result.items[0];
  //           // console.log('inside searchYouTube', srchItem);
  //           // store.dispatch({
  //           //   type: 'SWITCH_VIEW_TO_PLAYER',
  //           //   view: 'player',
  //           //   currentSong: srchItem.id.videoId
  //           // });

  //           resolve(response.result.items[0]);
  //       })
  //       .then(function (song) {
  //         // console.log('hello', song);
  //         return song;
  //       });
  //     });
  // });

  var request = gapi.client.youtube.search.list({
      q: query,
      part: 'snippet', 
      maxResults: 5
  });

  request.execute(function(response) {
    console.log(response);
    if(cd) cd(response);
  });
};

export const getSearchItem = () => {
  return srchItem;
};