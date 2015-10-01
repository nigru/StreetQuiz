var app = (function (a) {
  a.dev = {};
  a.dev.out = function(){
    // dummy function
  };

  // set button click actions
  // button under top bar
  document.getElementById('btn').onclick = a.game.btnClick;
  // restart button in status panel
  document.getElementById('restartBtn').onclick = a.game.btnRestartClick;
  // ok button in game over dialog
  document.getElementById('splashBtn').onclick = a.game.btnCloseSplash;

  a.map.reset();

  return a;
}) (app || {});
