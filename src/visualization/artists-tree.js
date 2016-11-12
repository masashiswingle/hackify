// import { relatedArtists } from './../modules/ajax';

// function initRootWithArtist(artist) {
//     tree.setRoot(artist);
// }


// const tree = function() {

//     // Misc. variables
//     var i = 0;
//     var duration = 750;
//     var root;
//     var rightPaneWidth = 350;

//     var exploredArtistIds = [];

//     // avoid clippath issue by assigning each image its own clippath
//     var clipPathId = 0;

//     // size of the diagram
//     var viewerWidth = $(window).width() - rightPaneWidth;
//     var viewerHeight = $(window).height();

//     var lastExpandedNode;

//     var tree = d3.layout.tree()
//         .size([viewerHeight, viewerWidth]);

//     var diagonal = d3.svg.diagonal()
//         .projection(function(d) {
//             return [d.y, d.x];
//         });

//     // Define the zoom function for the zoomable tree

//     function zoom() {
//         svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
//     }

//     // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
//     var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

//     // define the baseSvg, attaching a class for styling and the zoomListener
//     var baseSvg = d3.select("#tree-container").append("svg")
//         .attr("width", viewerWidth)
//         .attr("height", viewerHeight)
//         .attr("class", "overlay")
//         .call(zoomListener);

//     function updateWindow(){
//         viewerWidth = $(window).width() - rightPaneWidth;
//         viewerHeight = $(window).height();
//         baseSvg.attr("width", viewerWidth).attr("height", viewerHeight);
//         if (lastExpandedNode) {
//             centerNode(lastExpandedNode);
//         }
//     }

//     // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.
//     function centerNode(source) {
//         lastExpandedNode = source;
//         var scale = zoomListener.scale();
//         var x = -source.y0;
//         var y = -source.x0;
//         x = x * scale + viewerWidth / 2;
//         y = y * scale + viewerHeight / 2;
//         d3.select('#tree-container g').transition()
//             .duration(duration)
//             .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
//         zoomListener.scale(scale);
//         zoomListener.translate([x, y]);
//     }


// };

// export default tree;