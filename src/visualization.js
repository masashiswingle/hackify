import { getCountries } from './modules/ajax';
import { convertCountryCode } from './encoder';

const map = function (array) {
    //var array = getCountries();
    console.log(array)
    // Convert codes received from Spotify to aplha3 format, recognizable by Maps
    var convertedCodes = [];
    for (var alpha2 of array) {
      convertedCodes.push(convertCountryCode[alpha2]);
    }
    console.log('inside map, converted array: ', convertedCodes);

    // Create data object to be drawn on map
    var data = {};
    for (var alpha3 of convertedCodes) {
      data[alpha3] = { fillKey: "authorHasTraveledTo" }
    }

    var basic_choropleth = new Datamap({
    element: document.getElementById("basic_choropleth"),
    projection: 'mercator',
    fills: {
      defaultFill: "#000000",
      authorHasTraveledTo: "#ffe1bd"
    },
    data: data
  });

  var colors = d3.scale.category10();

  var randomColoring = {}
  var step = [10, 50, 100];


  window.setInterval(function() {
    for (var elem of convertedCodes) {
      var random = Math.floor(Math.random() * 2);
      randomColoring[elem] = colors(Math.random() * step[random]);
    }

    basic_choropleth.updateChoropleth(randomColoring);
  }, 2000);
}

export default map;
