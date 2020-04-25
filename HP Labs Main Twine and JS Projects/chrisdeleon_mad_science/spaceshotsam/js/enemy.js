function enemyReset() {
    safeSpawnDistFromEnemy = 180;
    enemySpeed = 1.5;
    enemyList=[];
}

function spawnNextEnemyWaveIfCleared() {
    if(enemyList.length==0) {
        nextWaveSnd.play();
        spawnEnemies();
    }
}

function spawnEnemies() {
  enemySize = 20;
  for(var i=0;i<enemiesToSpawn;i++) {
    var nextSpawnPos = safeEnemySpawn();

    enemyList.push(
      {
      x:nextSpawnPos.x,
      y:nextSpawnPos.y,
      w:enemySize,
      h:enemySize,
      homeX:Math.random()*canv.width,
      homeY:Math.random()*canv.height,
      confusedDelay:0,
      facingLeft:false
      }
    );
  }
  enemiesToSpawn += additionalEnemiesPerLevel;
}

function safeEnemySpawn() {
  var safeMargin = false;
  var testX,testY;
  var testLimit=500;
  while(safeMargin==false && testLimit-- > 0) {
    testX = Math.random()*canv.width;
    testY = Math.random()*canv.height;
    var approxDist = Math.abs(px-testX) + Math.abs(py-testY);
    if(approxDist>safeSpawnDistFromEnemy) {
      return {x:testX, y:testY};
    }
  }
  return {x:testX, y:testY};
}

function enemyMotion() {
  for(var i=0;i<enemyList.length;i++) {
    var gotoX = px;
    var gotoY = py-ph/2;
    if(enemyList[i].confusedDelay>0) {
      enemyList[i].confusedDelay--;
      gotoX = enemyList[i].homeX;
      gotoY = enemyList[i].homeY;
    } else if(Math.random()<0.005) {
      enemyList[i].confusedDelay = Math.random()*60+50;
    }
    var enemyCenterX = enemyList[i].x + enemyList[i].w/2;
    var enemyCenterY = enemyList[i].y + enemyList[i].h/2;
    var closeEnoughMargin = 5;
    if(enemyCenterX < gotoX-closeEnoughMargin) {
      enemyList[i].x += enemySpeed;
      enemyList[i].facingLeft = false;
    } else if(enemyCenterX > gotoX+closeEnoughMargin) {
      enemyList[i].x -= enemySpeed;
      enemyList[i].facingLeft = true;
    }
    var distToX = Math.abs(enemyCenterX-gotoX);
    if(distToX > 50) { // if far away laterally
      closeEnoughMargin = 40; // stay away from shooting height
    }
    if(enemyCenterY < gotoY-closeEnoughMargin) {
      enemyList[i].y += enemySpeed;
    } else if(enemyCenterY > gotoY+closeEnoughMargin) {
      enemyList[i].y -= enemySpeed;
    }
  }
  for(var i=enemyList.length-1;i>=0;i--) {
    if(enemyList[i].readyToRemove) {
      enemyList.splice(i,1);
    }
  }

  // check if enemy touched player
  var enemyBumped = pointOverlappedByRectList(px,py-ph/2, enemyList);
  if(enemyBumped != null) {
    if(playerPoints>highScore) {
      highScore=playerPoints;
      localStorage.setItem('localHighScore', highScore);
    }
    loseSnd.play();
    reset();
  }

}