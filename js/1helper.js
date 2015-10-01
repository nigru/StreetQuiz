var app = (function (a) {

  // World Geodetic System
  var coorFrom = new OpenLayers.Projection("EPSG:4326");
  // projection system by OSM
  var coorTo   = new OpenLayers.Projection("EPSG:3857");

  a.helper = {};
  // transform from map-projection to wgs
  a.helper.toCoordinates = function(lonlat) {
    return lonlat.transform(coorTo, coorFrom);
  };

  // transform from wgs to map-projection
  a.helper.toPosition = function(lon, lat) {
    if (typeof lat != 'undefined') {
      return new OpenLayers.LonLat(lon, lat).transform(coorFrom, coorTo);
    } else {
      return new OpenLayers.LonLat(lon.lon, lon.lat).transform(coorFrom, coorTo);
    }
  };

  // create geometry point for coordinate
  a.helper.getGeometryPoint = function(coord) {
    coord = this.toPosition(coord[0], coord[1]);
    return new OpenLayers.Geometry.Point(coord.lon, coord.lat);
  };

  // remove 'hide' class from element
  a.helper.unhideElement = function(element) {
    element.className = element.className.replace(/(?:^|\s)hide(?!\S)/, '' );
  }

  // add 'hide' class from element
  a.helper.hideElement = function(element) {
    if (!element.className.match(/(?:^|\s)hide(?!\S)/)) {
      element.className += " hide";
    }
  }

  return a;
}) (app || {});
