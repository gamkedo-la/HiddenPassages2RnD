function drawList(rectList, boxColor) {
  ctx.fillStyle=boxColor;
  for(var i=0;i<rectList.length;i++) {
    ctx.fillRect(rectList[i].x,rectList[i].y,rectList[i].w,rectList[i].h);
  }  
}

function drawImageFromTopLeft(whichImg, atX,atY,flipLeft) {
  if(whichImg === undefined || whichImg.width === undefined) {
    return; // asset hasn't finished loading
  }
  ctx.save();
  ctx.translate(atX, atY);
  if(flipLeft) {
    ctx.translate(whichImg.width, 0);
    ctx.scale(-1,1);
  }
  ctx.drawImage(whichImg,0,0);
  ctx.restore();
}

function drawImageFromTopLeftOneFrame(whichImg, atX,atY,flipLeft,frameW,frameH,frameNum) {
  if(whichImg === undefined || whichImg.width === undefined) {
    return; // asset hasn't finished loading
  }
  ctx.save();
  ctx.translate(atX, atY);
  if(flipLeft) {
    ctx.scale(-1,1);
    ctx.translate(-frameW, 0);
  }
  //ctx.drawImage(whichImg,0,0);
  ctx.drawImage(whichImg,frameW*frameNum,0,frameW, frameH,
                          0,0,frameW,frameH);
  ctx.restore();
}

function drawImageCentered(whichImg, atX,atY) {
  if(whichImg === undefined || whichImg.width === undefined) {
    return; // asset hasn't finished loading
  }
  ctx.drawImage(whichImg,atX-whichImg.width/2, atY-whichImg.height/2);
}