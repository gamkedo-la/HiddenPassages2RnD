function particleReset() {
  particleFlash=[];
}

function particleMotion() {
  for(var i=0;i<particleFlash.length;i++) {
    particleFlash[i].x += particleFlash[i].velX;
    particleFlash[i].y += particleFlash[i].velY;
    particleFlash[i].life--;
    if(particleFlash[i].life<0) {
      particleFlash[i].readyToRemove=true;
    }
  }
  for(var i=particleFlash.length-1;i>=0;i--) {
    if(particleFlash[i].readyToRemove) {
      particleFlash.splice(i,1);
    }
  }
}

function particleDraw() {
  drawList(particleFlash, "yellow");
}