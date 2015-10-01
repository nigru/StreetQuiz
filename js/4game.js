var app = (function (a) {
  var score;
  var count;

  /* gamestate:
   * 0: app start
   * 1: start game
   * 2: show question
   * 3: show answer
   */
  var gamestate = 1;

  var textBar = document.getElementById('txtBar');
  var gameBtn = document.getElementById('btn');

  var line, mark = false;

  /* updates the score based on the distance
   * is the distance bigger than 50 meters, the score is decreased by 1 for each meter
   * is the distance smaller than or equal to 50, the score is increased by 10
   */
  var updateScore = function(distance) {
    if(distance > 50) {
      score -= distance;
    } else if(distance <= 25) {
      score += 10;
    }
    count++;
    updateView();
  };

  // is the score lower than 0 -> game over
  var isGameOver = function() {
    return this.score <= 0;
  }

  // reset the score to start values
  var reset = function() {
    score = 2000;
    count = 0;
    updateView();
  }

  /* set the click function of map.
   * the user is only allowed to place markers, if the next gamestate is 3 (question is shown; user can answer it)
   */
  a.map.click = function(e) {
    var mapCoord = a.map.map.getLonLatFromPixel(e.xy);
    var lonlat = a.helper.toCoordinates(a.map.map.getLonLatFromPixel(e.xy));
    a.dev.out('[' + lonlat.lon + ', ' + lonlat.lat + '],');
    if(gamestate == 3) {
      a.map.clear();
      mark = new OpenLayers.Geometry.Point(mapCoord.lon, mapCoord.lat);
      a.map.placeMark(mark);
    }
  };

  /* click function for the button under the top bar
   * controls the gamestate
   */
  var btnClick = function() {
    switch (gamestate) {
      case 0:
        // show start
        a.helper.hideElement(document.getElementById('gameover'));
        a.helper.hideElement(document.getElementById('splash'));
        txtBar.innerHTML = 'Click "start" to begin!';
        gameBtn.innerHTML = 'start';
        gamestate = 1;
        break;
      case 1:
        // start game
        a.helper.unhideElement(document.getElementById('status'));
        reset();
        gamestate = 2;
        // no break
      case 2:
        // show question
        a.map.reset();
        a.map.clear();
        txtBar.innerHTML = a.questions.getRandom().name;
        gameBtn.innerHTML = 'solve';
        mark = false;
        gamestate = 3;
        break;
      case 3:
        // show answer
        var coords = a.questions.getLast().coordinates.slice(0);
        var line = createLine(coords);
        a.map.drawPlace(line);
        a.map.setCenter(a.map.getLineCenter());

        // if marker is placed by the user
        if(mark) {
          // calculate the distance between the marker and the solution (line or point)
          var distance = line.distanceTo(mark, {details: true});
          distance.distance = Math.round(distance.distance);
          a.map.drawDistance(distance);
          document.getElementById('txtBar').innerHTML += " <span class=\"orange\">(" + distance.distance + " m)</span>";
          updateScore(distance.distance);
        }
        gameBtn.innerHTML = 'next';
        if(score <= 0) {
          // show gameover
          a.helper.unhideElement(document.getElementById('splash'));
          a.helper.unhideElement(document.getElementById('gameover'));
          gameBtn.innerHTML = 'Try again!';
          gamestate = 1;
        } else {
          // next question
          gamestate = 2;
        }
        break;
      default:
    }

  }

  // creates a line (coordinates contains more than one entry) or a point (otherwise) for the map
  var createLine = function(coordinates) {
    var line;
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

  var restart = function() {
    a.map.reset();
    a.map.clear();
    gamestate = 0;
    btnClick();
  }

  // update the status panel (score and question count)
  var updateView = function() {
    document.getElementById('score').innerHTML = score;
    document.getElementById('questionCount').innerHTML = count;
  }

  var closeSplash = function(e) {
    a.helper.hideElement(document.getElementById('splash'));
    a.helper.hideElement(document.getElementById('gameover'));
  }

  a.game = {
    reset: reset,
    btnClick: btnClick,
    btnRestartClick: restart,
    btnCloseSplash: closeSplash
  };

  return a
}) (app || {});



/*
var places;
var sets;
var set = false;
var view;
var map;
var helper;
var quiz;
var game;

function init() {
  game = new Game();
  game.init();
}

function Game() {
  this.clickInit = function() {
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
        if(quiz) {
          quiz.mapClick(e);
        }
      }
    });
  };

  this.setSet = function() {
    if(this.value != "false") {
  		set = sets.s[this.value];
  	} else {
  		set = false;
  	}
  };

  this.btnClick = function() {
    if(!quiz) {
      quiz = new Quiz();
    }
    quiz.btnClick();
  };

  this.init = function() {
    this.clickInit();
    places = new Places();
    sets = new Sets();
    helper = new Helper();
    view = new View();
    view.showSplash();
  };

  this.restart = function() {
    quiz.reset();
    quiz = null;
    set = false;
    view.showSplash();
  };
}
*/
