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

window.onload=function() {
  canv = document.createElement("canvas");
  canv.width = 800;
  canv.height = 600;
  document.body.appendChild(canv);
  ctx = canv.getContext("2d");
  ctx.font = '20px Open Sans Condensed';

  loadImagesSoundsAndStartMusic();

  inputSetup();
  reset();
  setInterval(update,1000/30);
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
}