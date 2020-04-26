var webGLFakeCRT = true; // overridden in init code by whether there's a server running
var lines = new Image();
lines.src = 'img/fakecrt.png';

function reset() {
  menusReset();
  mouseHeld = false;
  playerReset();
  
  inputReset();
  shotsReset();
  particleReset();
  scorePopReset();
  enemyReset();
  powerupReset();
  
  highScore = localStorage.getItem('localHighScore');
  if(highScore==null) {
    highScore=0;
  }
  camShakeAmt=0;
  
  worldReset();
  spawnEnemies();

  var safePlayerLocation = safePlayerSpawn();
  px = safePlayerLocation.x;
  py = safePlayerLocation.y;

  spawnPup();
}

// https://stackoverflow.com/questions/3920892/how-to-detect-if-a-web-page-is-running-from-a-website-or-local-file-system/3920899#3920899
function isonline() {
  switch(window.location.protocol) {
     case 'http:':
     case 'https:':
       return true;
     case 'file:':
     default: 
       return false;
  }
}

window.onload=function() {
  if (isonline()) {
    webGLFakeCRT = true;
    console.log("server found, turning on webGLFakeCRT");
  } else {
    webGLFakeCRT = false;
    console.log("server not found, skipping webGLFakeCRT");
  }
  canv = document.createElement("canvas");
  canv.width = 800;
  canv.height = 600;
  canv.id = "canvas";
  document.body.appendChild(canv);
  ctx = canv.getContext("2d");
  ctx.font = '20px Open Sans Condensed';

  loadImagesSoundsAndStartMusic();
  if(webGLFakeCRT) {
    setupOldCRT();
  }
  inputSetup();
  reset();
  setInterval(update,1000/30);
}

// code for this is from https://www.zachstronaut.com/posts/2012/08/17/webgl-fake-crt-html5.html
var glcanvas, texture;
function setupOldCRT() {

    // Try to create a WebGL canvas (will fail if WebGL isn't supported)
    try {
        glcanvas = fx.canvas();
    } catch (e) { console.log("weblGL not supported, turning off webGLFakeCRT"); webGLFakeCRT = false; return;}

    //source = window.CRTCANVASEL || document.getElementsByTagName('canvas')[0];
    //srcctx = source.getContext('2d');

    texture = glcanvas.texture(canv);

    canv.parentNode.insertBefore(glcanvas, canv);
    canv.style.display = 'none';
    glcanvas.className = canv.className;
    glcanvas.id = canv.id;
    canv.id = 'old_' + canv.id;
}


function motionLogicStep() {
  powerupMotion();
  playerMotion();
  enemyMotion();
  shotMotion();
  particleMotion();
  scorePopMotion();

  spawnNextEnemyWaveIfCleared();
}

function drawGameplay() {
  var randShakeAng = Math.random()*Math.PI*2.0;
  var randShakeAmt = Math.random()*camShakeAmt;
  var shakeX = randShakeAmt*Math.cos(randShakeAng);
  var shakeY = randShakeAmt*Math.sin(randShakeAng);
  camShakeAmt *= 0.7;
  ctx.save();
  ctx.translate(shakeX,shakeY);

  drawImageFromTopLeft(bgImg,0,0,false);
  playerDraw();
  worldDraw();
  for(var i=0;i<enemyList.length;i++) {
    drawImageFromTopLeft(enemyImg, enemyList[i].x,enemyList[i].y,enemyList[i].facingLeft);
  }
  powerupDraw();
  shotsDraw();
  particleDraw();
  ctx.restore();

  drawInGameUI();
}

function update() {
  if(inEditor==false && onTitle==false) {
    motionLogicStep();
  }

  if(onTitle) {
    drawTitleScreen();
  } else {
    drawGameplay();
  }

  if(webGLFakeCRT) {
    ctx.drawImage(lines, 0, 0, canv.width, canv.height, 0, 0, canv.width, canv.height);
    texture.loadContentsOf(canv);
    var hw = canv.width / 2;
    var hh = canv.height / 2;
    var bulgeAmt = canv.width * 0.65;

    glcanvas.draw(texture).lensBlur(0.7,0.0,0).bulgePinch(hw, hh, bulgeAmt, 0.125).vignette(0.6, 0.35).brightnessContrast(0.1,0.2).hueSaturation(0,0.3).update();
  }
}