var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var dataset = "http://data.phl.opendata.arcgis.com/datasets/4748c96b9db444a48de1ae38ca93f554_0.geojson";
var featureGroup;

var myStyle = function(feature) {
        switch (feature.properties.COLLDAY) {
            case 'Moderate Access': return {color: "#488c2e"};
            case 'High Access': return {color: "#097170"};
            case 'Low Access': return {color: "#ea167a"};
}
};

var showResults = function() {
  $('#intro').hide();
  $('#results').show();
};


var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
    console.log(2);

    /* =====================
    The following code will run every time a layer on the map is clicked.
    Check out layer.feature to see some useful data about the layer that
    you can use in your application.
    ===================== */
    switch (layer.feature.properties.COLLDAY) {
        case 'MON': $('.day-of-week').text("Monday");
        break;
        case 'TUE': $('.day-of-week').text("Tuesday");
        break;
        case 'WED': $('.day-of-week').text("Wednesday");
        break;
        case 'THU': $('.day-of-week').text("Thursday");
        break;
        case 'FRI': $('.day-of-week').text("Friday");
        break;
    }
    console.log(layer.feature.properties.COLLDAY);
    showResults();
  });
};

var myFilter = function(feature) {
  if(feature.properties.COLLDAY!==" "){
    return true;
  }
  else{
    return false;
  }
    };

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter
    }).addTo(map);

    // quite similar to _.each
    featureGroup.eachLayer(eachFeatureFunction);
  });
});
