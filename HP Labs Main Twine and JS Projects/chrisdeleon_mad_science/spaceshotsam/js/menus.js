function menusReset() {
  onTitle = true;
  inEditor = false;
}

function drawTitleScreen() {
  drawImageFromTopLeft(bgImg,0,0,false);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("SPACE SHOT SAM!",canv.width/2,canv.height*1/3);
  ctx.fillText("Press Space to Begin",canv.width/2,canv.height-50);  

  if(highScore != 0) {
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText("HighScore: " + highScore,25,25);
    ctx.fillText("Press X to reset high score",25,50);
  }
}

function drawInGameUI() {
  ctx.fillStyle = "orange";
  ctx.textAlign = "center";
  for(var i=0;i<scorePop.length;i++) {
    ctx.fillText("+"+scorePop[i].scoreVal,scorePop[i].x,scorePop[i].y);
  }
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + playerPoints,25,25);
  ctx.fillText("HighScore: " + highScore,25,50);
  if(shotgunAmmo>0) {
    ctx.fillText("SG Ammo: " + shotgunAmmo,canv.width-125,25);
  }
}