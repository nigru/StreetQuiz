var app = (function (a) {

  // coordinates of default center position
  var ffb = {lat: 48.176322, lon: 11.241095};
  // path format for the tiles
  var tilePath = "tiles/${z}/${x}/${y}.png";

  var map = new OpenLayers.Map("map");
  var mapnik = new OpenLayers.Layer.OSM("FFB", tilePath, {numZoomLevels: 19});
  map.addLayer(mapnik);

  // set click action for the map
  OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },
    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        this.handler = new OpenLayers.Handler.Click(this, {
            'click': this.trigger
        }, this.handlerOptions);
    },
    trigger: function(e) {
      a.map.click(e);
    }
  });
  var click = new OpenLayers.Control.Click();
  map.addControl(click);
  click.activate();

  // create the layer for markers and add it to the map
  var markerlayer = new OpenLayers.Layer.Vector("My Marker");
  var last;
  var style = {
    graphicName: 'circle',
    strokeColor: '#f00',
    strokeWidth: 3,
    fillColor: '#f00',
    fillOpacity: 0.3,
    pointRadius: 2
  };
  map.addLayer(markerlayer);

  // create layer for places and add it to the map
  var placelayer = new OpenLayers.Layer.Vector("Line Layer");
  var placeStyle = {
    strokeColor: '#f00',
    fillColor: '#f00',
    strokeOpacity: 0.8,
    fillOpacity: 0.3,
    strokeWidth: 5
  };
  var distanceStyle = {
    strokeColor: '#f90',
    strokeOpacity: 0.8,
    strokeWidth: 5
  };
  map.addLayer(placelayer);


  a.map = {};
  a.map.reset = function() {
    map.setCenter( a.helper.toPosition(ffb), 15 );
  };

  a.map.setCenter = function(c) {
    map.setCenter(c);
  }

  a.map.placeMark = function(point) {
    // remove all marker
    markerlayer.removeAllFeatures();
    // inner point
    markerlayer.addFeatures([new OpenLayers.Feature.Vector(point,null,style)]);
    // outer circle
    markerlayer.addFeatures([new OpenLayers.Feature.Vector(OpenLayers.Geometry.Polygon.createRegularPolygon(point, 50, 40, 0))]);
  };

  a.map.clear = function() {
    // remove all marker
    markerlayer.removeAllFeatures();
    // remove all places
    placelayer.removeAllFeatures();
  };

  a.map.drawPlace = function(place) {
    placelayer.addFeatures([new OpenLayers.Feature.Vector(place, null, placeStyle)]);
  };

  // get the center of all lines and points on the placelayer
  a.map.getLineCenter = function() {
    return placelayer.getDataExtent().getCenterLonLat();
  };

  a.map.drawDistance = function(distance) {
    placelayer.addFeatures([new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([new OpenLayers.Geometry.Point(distance.x0, distance.y0), new OpenLayers.Geometry.Point(distance.x1, distance.y1)]), null, distanceStyle)]);
  };

  a.map.click = function(e) {
    // dummy function
  }

  a.map.map = map;

  return a;
}) (app || {});
