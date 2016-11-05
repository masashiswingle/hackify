import $ from 'jquery';

export const ajaxGetSongs = (params) => {
  $.ajax({
    method: "POST",
    url: '/getSongs',
    data: { string: params },
  }).done(function( data ) {
    console.log(data);
    return data;
  });
};
