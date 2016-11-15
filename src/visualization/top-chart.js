// var names = ['Temazepam', 'Guaifenesin', 'Salicylic Acid', 'Fluoride', 'Zinc Oxide', 'Acetaminophen'];
// var data = [23, 34, 67, 93, 56, 100];
var data = [];
var names = [];
var dataSet;
var palette = anychart.palettes.distinctColors().colors(['#FFE1BD', '#E2C8A8', '#C6AF93', '#AA967E', '#8D7D69', '#716454', '#554B3F', '#38322A', '#1C1915', '#000000']);
//var gauge;

var makeBarWithBar = function(gauge, radius, i, width, without_stroke){
    var stroke = '1 #e5e4e4';
    if (without_stroke) {
stroke = null;
gauge.label(i)
.text(i+1 +'. ' + names[i])// color: #7c868e
    .useHtml(true);
gauge.label(i)
    .hAlign('center')
    .vAlign('middle')
    .anchor('rightCenter')
    .padding(0, 10)
    .height(width/2 + '%')
    .offsetY(radius + '%')
    .offsetX(0);
    }
console.log(data, dataSet)
    gauge.bar(i).dataIndex(i).radius(radius).width(width).fill(palette.colorAt(i)).stroke(null).zIndex(5);
    gauge.bar(i + 100).dataIndex(0).radius(radius).width(width).fill('#F5F4F4').stroke(stroke).zIndex(4);
    return gauge.bar(i)
};


var fu = function(songs) {

    console.log('in fu', songs)
    var storage = [];
    for (var i = 0; i < 5; i++ ) {
        storage.push({'popularity': songs.tracks[i].popularity, 'name': songs.tracks[i].name})
    }
    console.log('storage', storage)

    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }

    storage = sortByKey(storage, 'popularity');
    console.log('sorted', storage)

    for (var j = 0; j < 5; j++) {
        names.push(storage[j].name);
        data.push(storage[j].popularity);
    }


    dataSet = anychart.data.set(data);


   var gauge = anychart.circularGauge();

    gauge.data(dataSet);
    gauge.fill('#fff')
.stroke(null)
.padding(0)
.margin(100)
.startAngle(0)
.sweepAngle(270);
    var axis = gauge.axis().radius(100).width(1).fill(null);
    axis.scale()
.minimum(0)
.maximum(Math.max.apply(null, data))
.ticks({interval: 1})
.minorTicks({interval: 1});
    axis.labels().enabled(false);
    axis.ticks().enabled(false);
    axis.minorTicks().enabled(false);
    gauge.margin(50);
    makeBarWithBar(gauge, 100, 0, 17, true);
    makeBarWithBar(gauge, 80, 1, 17, true);
    makeBarWithBar(gauge, 60, 2, 17, true);
    makeBarWithBar(gauge, 40, 3, 17, true);
    makeBarWithBar(gauge, 20, 4, 17, true);
    // makeBarWithBar(gauge, 50, 5, 10, true);
    // makeBarWithBar(gauge, 40, 6, 10, true);
    // makeBarWithBar(gauge, 30, 7, 10, true);
    // makeBarWithBar(gauge, 20, 8, 10, true);
    // makeBarWithBar(gauge, 10, 9, 10, true);


    gauge.title(true);
    gauge.title().text('Top songs for ' + songs.tracks[0].artists[0].name + ':').useHtml(true);
    gauge.title()
.hAlign('center')
.padding(0)
.margin([0, 0, 20, 0]);

    gauge.container('track');
    gauge.draw();

    
};

export default fu;