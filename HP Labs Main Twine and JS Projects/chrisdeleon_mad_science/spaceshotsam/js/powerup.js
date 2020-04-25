function powerupReset() {
  pupX = 0;
  pupY = 0;
  pupDim = 20;
  pupLife = 0;
  pointScoredSinceLastPupPickedUp = false;
  powerupGettableTime = 600;
  powerupRespawnTime = 100;
}

function powerupDraw() {
  if(pupLife>0) {
    if(pupLife>100 || pupLife%20<13) { // flash if time running out
     drawImageFromTopLeft(pupImg, pupX, pupY, false); 
    }
  }
}

function powerupMotion() {
  var playerWaistY = py-ph/2;
  if(pupLife > 0 &&
      px>pupX && px<pupX+pupDim &&
      playerWaistY>pupY && playerWaistY<pupY+pupDim) {
    pointScoredSinceLastPupPickedUp = false;
    shotgunAmmo += 3;
    pickupSnd.play();
    pupLife=0; // vanish
  }
  
  pupLife--;
  if(pupLife < -powerupRespawnTime && pointScoredSinceLastPupPickedUp) {
    spawnPup();
  }
}

function spawnPup() {
  var randPlat = Math.floor( Math.random() * plat.length );
  pupX = plat[randPlat].x+plat[randPlat].w/2-pupDim/2;
  pupY = plat[randPlat].y-pupDim;
  pupLife = powerupGettableTime;
}