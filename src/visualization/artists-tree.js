import { getSearchItem, relatedTree } from './../modules/ajax';

const getSuitableImage = function (images) {
    var minSize = 64;
    images.forEach(function (image) {
        if (image && image.width > minSize && image.width > 64) {
            return image.url;
        }
    });
    return images[images.length - 1].url;
};

const createAutoCompleteDiv = function (artist) {
    if (!artist) {
        return;
    }
    var val = '<div class="autocomplete-item">' +
        '<div class="artist-icon-container">' +
        '<img src="' + getSuitableImage(artist.images) + '" class="circular artist-icon" />' +
        '<div class="artist-label">' + artist.name + '</div>' +
        '</div>' +
        '</div>';
    return val;
};


module.exports = { 

    tree: function() {
        // Misc. variables
        var i = 0;
        var duration = 750;
        var root;
        var exploredArtistIds = [];
        var clipPathId = 0;

        var viewerWidth = $(window).width();
        var viewerHeight = $(window).height();

        var lastExpandedNode;

        var tree = d3.layout.tree()
            .size([viewerHeight, viewerWidth]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) {
                return [d.y, d.x];
            });


        function zoom() {
            svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
        var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);


        var baseSvg = d3.select("#tree-container").append("svg")
            .attr("width", viewerWidth)
            .attr("height", viewerHeight)
            .attr("class", "overlay")
            .call(zoomListener);

    
        function updateWindow(){
            console.log('updateWindow called')
            viewerWidth = $(window).width();
            viewerHeight = $(window).height();
            baseSvg.attr("width", viewerWidth).attr("height", viewerHeight);
            if (lastExpandedNode) {
                centerNode(lastExpandedNode);
            }
        };

        function centerNode(source) {
            lastExpandedNode = source;
            var scale = zoomListener.scale();
            var x = -source.y0;
            var y = -source.x0;
            x = x * scale + viewerWidth / 2;
            y = y * scale + viewerHeight / 2;
            d3.select('#tree-container g').transition()
                .duration(duration)
                .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
            zoomListener.scale(scale);
            zoomListener.translate([x, y]);
        };

        function updateInfo(node) {
            var artists;
            relatedTree(node.artist.id, exploredArtistIds).then(function(artists) {
                if (!node.children) {
                    node.children = []
                }

                artists.forEach(function(artist) {
                    node.children.push(
                        {
                            'artist': artist,
                            'children': null
                        }
                    )
                    exploredArtistIds.push(artist.id);

                });
                console.log('node', node)
                update(node);
                centerNode(node);
            });
        };

        function initWithArtist(artist) {
            exploredArtistIds.push(artist.id);
            return {
                'artist' : artist,
                'children': null,
            }
        };

        function isArtist(d) {
            return 'artist' in d;
        };

        function removeExpandedId(d) {
            if (d.children) {
                d.children.forEach(function(node) {
                    removeExpandedId(node);
                });
            }
            var indexToRem = exploredArtistIds.indexOf(d.artist.id);
            exploredArtistIds.splice(indexToRem, 1);
        };

        function removeChildrenFromExplored(d) {
            d.children.forEach(function(node) {
                removeExpandedId(node);
            });
        };

        // Toggle children function
        function toggleChildren(d) {
            if (d.children) {
                removeChildrenFromExplored(d);
                d.children = null;
                update(d);
                centerNode(d);
            } else {
                if (isArtist(d)) {
                    updateInfo(d);
                } 
            }
            return d;
        }

        function click(d) {
            d = toggleChildren(d);
        }

        function update(source) {
           
            var levelWidth = [1];
            var childCount = function(level, n) {
                if (n.children && n.children.length > 0) {
                    if (levelWidth.length <= level + 1) levelWidth.push(0);

                    levelWidth[level + 1] += n.children.length;
                    n.children.forEach(function(d) {
                        childCount(level + 1, d);
                    });
                }
            };

            childCount(0, root);
            var newHeight = d3.max(levelWidth) * 100;
            tree = tree.size([newHeight, viewerWidth]);

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse();
            var links = tree.links(nodes);

            // Set widths between levels
            nodes.forEach(function(d) {
                 d.y = (d.depth * 220);

            });

            var node = svgGroup.selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id || (d.id = ++i);
                });
     
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                })
                .on('click', click);

            nodeEnter.append("circle")
                .attr("r", 32)
                .style("fill", function(d) {

                    return d._children ? "black" : "#fff";
                });

            clipPathId++;

            nodeEnter.append("clipPath")
                .attr("id", "clipCircle" + clipPathId)
                    .append("circle")
                    .attr("r", 32);

            nodeEnter.append("image")
                .attr("xlink:href", function(d) {
                    if (isArtist(d)) {
                      return getSuitableImage(d.artist.images);;
                    } 
                })
                .attr("x", "-32px")
                .attr("y", "-32px")
                .attr("clip-path", "url(#clipCircle" + clipPathId + ")")
                .attr("width",
                  function(d) {
                      if (isArtist(d)) {
                          var image = d.artist.images[1];
                          if (!image) {
                            return 64;
                          }
                          if (image.width > image.height) {
                              return 64 * (image.width / image.height)
                          } else {
                              return 64;
                          }
                      } else {
                        return 64;
                      }
                  })
                .attr("height",
                  function(d) {
                      if (isArtist(d)) {

                          var image = d.artist.images[1];
                          if (!image) {
                            return 64;
                          }
                          if (image.height > image.width) {
                              return 64 * (image.height/image.width)
                          } else {
                              return 64;
                          }
                      } else {
                        return 64;
                      }
                  })

            nodeEnter.append("text")
                .attr("x", function(d) {
                    return 40;
                })
                .attr("dy", ".35em")
                .attr('class', 'nodeText')
                .attr("text-anchor", function(d) {
                    return "start";
                })
                .text(function(d) {
                    if (isArtist(d)) {

                        return d.artist.name;
                    } 

                })
                .style("fill-opacity", 0);

            // Transition nodes to new position
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

            // Fade the text 
            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .remove();

            nodeExit.select("circle")
                .attr("r", 0);

            nodeExit.select("text")
                .style("fill-opacity", 0);

            // Update links
            var link = svgGroup.selectAll("path.link")
                .data(links, function(d) {
                    return d.target.id;
                });

            // Enter new links at the parent's previous position
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {
                        x: source.x0,
                        y: source.y0
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                });

            // Transition links to their new position
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })
                .remove();

            // Stash the old positions for transition
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
            
        };

        var svgGroup = baseSvg.append("g");

        function initWithData(from, to) {
            if (from.artist) {
                to.artist = from.artist;
                exploredArtistIds.push(to.artist.id);
            }
            if (from.genre) {
                to.genre = from.genre;
            }

            if (from.children) {
                to.children = []
                from.children.forEach(function(child) {
                    var obj = {}
                    initWithData(child, obj);
                    to.children.push(obj);
                })
            }

            if (to.children && to.children.length > 0) {
                //console.log(to.artist.name);
                //update(root);
            }

        };

        return {
            "setRoot" : function(artist) {
              exploredArtistIds = []
              root = initWithArtist(artist);
              root.x0 = viewerHeight / 2;
              root.y0 = 0;
              update(root);
              centerNode(root);
              click(root)
              console.log('setRoot called', root )
            },

            "resizeOverlay" : function() {
              updateWindow();
            }
        };

    }
};

//export default tree;