import $ from 'jquery';
import { switchViewToPlayer } from '../redux/actions';
import store from '../index.js'

export const ajaxGetSongs = (params) => {
  console.log('in ajaxGetSongs');
  $.ajax({
    method: "POST",
    url: '/getSongs',
    data: { string: params }
  })
  .done(function( data ) {
    console.log('got from ajaxGetSongs', data);
    return data;
  });
};


export const youTubeGetSong = (params) => {

  var request = gapi.client.youtube.search.list({
    q: params.query,
    part: 'snippet', 
    maxResults: 5
  });

  request.execute(function(response)  {                                                                                    
    var srchItem = response.result.items[0]; 
    console.log('inside searchYouTube', srchItem);  
    store.dispatch({
      type: 'SWITCH_VIEW_TO_PLAYER',
      view: 'player', 
      currentSong: srchItem.id.videoId
    });             
                      
  });  
};