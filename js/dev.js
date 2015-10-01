var app = (function (a) {
  var devOn = false;

  // append out to devoutput-div
  function devOut(out) {
    if(devOn) {
      var tmp = document.getElementById('devoutput');
      tmp.innerHTML = tmp.innerHTML + '<br>' + out;
    }
  }

  // clear content of devoutput-div
  function clearDevOut(){
    if(devOn) {
      document.getElementById('devoutput').innerHTML = '';
    }
  }

  function devDraw(place) {
    a.map.drawPlace(getLine(place.coordinates));
  }

  // fill dev panel
  function dev() {
    if(devOn) {
      var tmp, tmp2, tmp3;
      tmp = document.createElement('p');
      // show questions count
      tmp.innerHTML = app.questions.all.length + ' ';
      tmp3 = document.createElement('a');
      // add map control
      tmp3.setAttribute('href', 'javascript:app.map.clear()');
      tmp3.innerHTML = '(clear map)';
      tmp.appendChild(tmp3);
      tmp2 = document.createElement('a');
      tmp2.setAttribute('href', 'javascript:app.dev.devDrawAll()');
      tmp2.innerHTML = '(all)';
      tmp.appendChild(tmp2);
      document.getElementById("streets").appendChild(tmp);
      tmp = document.createElement('p');
      tmp.setInnerHTML = ' ';
      document.getElementById("streets").appendChild(tmp);
      // show all questions
      for(var i = 0; i < app.questions.all.length; i++) {
        tmp = document.createElement('a');
        tmp.setAttribute('href', 'javascript:app.dev.devDraw(app.questions.all[' + i + ']);');
        tmp.innerHTML = app.questions.all[i].name;
        document.getElementById("streets").appendChild(tmp);
      }
    }
  }

  function drawAll() {
    for(var i = 0; i < app.questions.all.length; i++) {
      a.map.drawPlace(getLine(app.questions.all[i].coordinates));
    }
  }

  var getLine = function(coordinates) {
    var line = null;
    if(coordinates.length == 1) {
      line = OpenLayers.Geometry.Polygon.createRegularPolygon(a.helper.getGeometryPoint(coordinates[0]), 20, 40, 0)
    } else {
      var points = Array();
      for(var i=0; i < coordinates.length; i++) {
        points.push(a.helper.getGeometryPoint(coordinates[i]));
      }
      line = new OpenLayers.Geometry.LineString(points);
    }
    return line;
  }

  // toggle dev mode on/off
  function switchDev() {
    devOn = !devOn;
    if(devOn) {
      document.getElementById("dev").style.display = "block";
      dev();
    } else {
      document.getElementById("dev").style.display = "none";
    }
  }

  // add dev panel and dev-switch to the dom
  var elemDiv = document.createElement('div');
  elemDiv.innerHTML += '<div id="dev" class="box hide"><div id="devout">DevOut <a href="javascript:app.dev.clearDevOut()">clear</a><span id="devoutput"></span></div><div id="streets"></div></div><div id="bottombar"><a href="javascript:app.dev.switchDev()">DevMode on/off</a></div>';
  document.body.appendChild(elemDiv);

  a.dev = {};
  a.dev.out = devOut;
  a.dev.clearDevOut = clearDevOut;
  a.dev.switchDev = switchDev;
  a.dev.devDraw = devDraw;
  a.dev.devDrawAll = drawAll;

  return a;
}) (app || {});
