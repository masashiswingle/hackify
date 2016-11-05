import $ from 'jquery';

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
    var srchItems = response.result.items; 
    console.log('inside searchYouTube', srchItems);                   
                      
  })  
};