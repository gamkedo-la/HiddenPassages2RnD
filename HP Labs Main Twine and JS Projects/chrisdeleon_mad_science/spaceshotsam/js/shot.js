function shotsReset() {
  shots=[];
}

function shotMotion() {
  for(var i=0;i<shots.length;i++) {
    shots[i].x += shots[i].velX;
    shots[i].y += shots[i].velY;
    shots[i].life--;
    if(shots[i].x < 0 || shots[i].x > canv.width || shots[i].life<0) {
      shots[i].readyToRemove = true;
    }
    var platShot = pointOverlappedByRectList(shots[i].x,shots[i].y,plat);
    if(platShot != null) {
      camShakeAmt += 1;
      shots[i].readyToRemove = true;
      var hitX;
      if(shots[i].velX > 0.0) {
        hitX = platShot.x;
      } else {
        hitX = platShot.x+platShot.w;
      }
      shotblockedSnd.play();
      particleFlash.push( {x:hitX-2, y:shots[i].y-2, w:5, h:5,
                            velX:5-10*Math.random(), velY:5-10*Math.random(),
                            life: 5} );
    }
    var enemyHit = pointOverlappedByRectList(shots[i].x,shots[i].y, enemyList);
    if(enemyHit != null && enemyHit.readyToRemove!=true) {
      shots[i].readyToRemove = true;
      enemyHit.readyToRemove = true;
      enemyDieSnd.play();
      playerPoints+=comboPt;
      pointScoredSinceLastPupPickedUp = true;
      scorePop.push( {x:shots[i].x, y:shots[i].y-10,
                            life: 30, scoreVal:comboPt} );
      comboPt++;
      for(var p=0;p<25;p++) {
        particleFlash.push( {x:shots[i].x-2, y:shots[i].y-2, w:5, h:5,
                            velX:10-20*Math.random(), velY:10-20*Math.random(),
                            life: 5} );
      }
      particleFlash.push( {x:enemyHit.x, y:enemyHit.y, w:enemySize, h:enemySize,
                            velX:0, velY:0,
                            life: 7} );
      camShakeAmt += 20;
    }
  }
  for(var i=shots.length-1;i>=0;i--) {
    if(shots[i].readyToRemove) {
      shots.splice(i,1);
    }
  }
}

function shotsDraw() {
  drawList(shots, "white");
}