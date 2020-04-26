function playerReset() {
  px=py=200;
  gunX=px;
  gunY=py;
  runSpeed = 4;
  pw = 27;
  ph = 40;
  playerFacing = 1.0;
  playerPoints=0;
  onGround=false;
  comboPt = 1;

  minRunSpeed = 2; // slower than this draws stand frame

  animFrame=0;
  animCyclesBetweenFrames=3;
  animDelay=0;

  shotgunAmmo = 0;
  shotLock=false;

  if(typeof highScore == 'undefined') {
    highScore = 0;
  }

  shotSpeed = 8;
  shotgunPellets = 12;
  shotgunShotLife = 20;
  shotgunVerticalSpray = 1.7;
  mgVerticalSpray = 0.3;
  mgShotLife = 33;
  xv=yv=0;
  grav=0.5;
  terminalVelocity = 20;
}

function safePlayerSpawn() {
  var safeMargin = false;
  var testX,testY;
  var testBoxL,testBoxT,testBoxR,testBoxB;
  var testLimit=500;
  while(safeMargin==false && testLimit-- > 0) {
    var randBox = plat[ Math.floor( Math.random()*plat.length ) ];
    testX = randBox.x + Math.random()*randBox.w;
    testY = randBox.y-1;
    testBoxL=testX-pw/2;
    testBoxR=testX+pw/2;
    testBoxT=testY-ph;
    testBoxB=testY;
    safeMargin = true;

    for(var i=0;i<enemyList.length;i++) {
      var closestAxis = Math.min( Math.abs(px-enemyList[i].x),
                                  Math.abs(py-enemyList[i].y));
      if(closestAxis<safeSpawnDistFromEnemy) {
        safeMargin = false;
        continue;
      }
    }

    for(var i=0;i<plat.length;i++) {
      if((testBoxR<plat[i].x || testBoxL>plat[i].x+plat[i].w ||
         testBoxB<plat[i].y || testBoxT>plat[i].y+plat[i].h) == false) {
        safeMargin = false;
        continue;
      }
    }

  }
  return {x:testX, y:testY};
}

function playerMotion() {
  if(holdLeft) {
    xv=-runSpeed;
  }
  if(holdRight) {
    xv=runSpeed;
  }
  if(holdFire && shotLock == false) {
    if(shotgunAmmo > 0) {
      shotgunAmmo--;
      particleFlash.push( {x:gunX, y:gunY-1, w:6, h:6,
                              velX:0, velY:0,
                              life: 1} );
      comboPt=1;
      shotgunSnd.play();
      for(var i=0;i<shotgunPellets;i++) {
        shots.push( {x:gunX, y:gunY+2, w:3, h:3,
                    velX: playerFacing*shotSpeed*(0.7+1.2*Math.random()),
                    velY:shotgunVerticalSpray*(1-2*Math.random()), life: shotgunShotLife} );
      }
      camShakeAmt += 10;
      shotLock=true;
    } else {
      autoFireRepeatLeft--;
      if(autoFireRepeatLeft<0) {
        mgFireSnd.play();
        particleFlash.push( {x:gunX, y:gunY-1, w:6, h:6,
                              velX:0, velY:0,
                              life: 1} );
        comboPt=1;
        shots.push( {x:gunX, y:gunY+2, w:3, h:3, velX: playerFacing*shotSpeed,
                      velY:mgVerticalSpray*(1-2*Math.random()), life: mgShotLife} );
        camShakeAmt += 1;
        autoFireRepeatLeft = autoFireRepeatRate;
      }
    }
  }
  px+=xv;
  py+=yv;

  if(py>canv.height) {
    py-=canv.height;
  }
  if(px>canv.width) {
    px-=canv.width;
  }
  if(px<0) {
    px+=canv.width;
  }

  if(onGround) {
    xv *= 0.8;
  } else {
    yv += grav;
    if(yv > terminalVelocity) {
      yv = terminalVelocity;
    }
  }

  var headOnBlock = pointOverlappedByRectList(px,py-ph, plat);
  if(headOnBlock != null) {
    py = headOnBlock.y+headOnBlock.h+ph;
    if(yv<0) {
      yv=0;
    }
  }
  var footOnBlock = pointOverlappedByRectList(px,py, plat);
  if(footOnBlock != null) {
    if(onGround==false) {
      landingSnd.play();
      py = footOnBlock.y+1;
      onGround = true;
      yv=0;
    }
  } else {
    onGround=false;
  }
  var rightOnBlock = pointOverlappedByRectList(px+pw/2,py-ph/2, plat);
  if(rightOnBlock != null) {
    if(xv > 0) {
      xv=0;
    }
    px = rightOnBlock.x - pw/2;
  }
  var leftOnBlock = pointOverlappedByRectList(px-pw/2,py-ph/2, plat);
  if(leftOnBlock != null) {
    px = leftOnBlock.x + leftOnBlock.w + pw/2;
    if(xv < 0) {
      xv=0;
    }
  }
}

function playerDraw() {
  gunX = px+playerFacing * 15;
  gunY = py-ph*2/3+2;
  animDelay--;
  if(animDelay<0) {
    animDelay=animCyclesBetweenFrames;
    if(onGround==false) {
      if(yv>0.0) { // falling
        animFrame=1;
      } else { // rising
        animFrame=2;
      }
    } else if(Math.abs(xv)<minRunSpeed) {
      animFrame=0;
    } else if(animFrame==1) {
      animFrame=2;
    } else {
      animFrame=1;
    }
  }
  drawImageFromTopLeftOneFrame(playerImg,px-pw/2,py-ph,playerFacing<0.0,
            pw,ph,animFrame);
}
