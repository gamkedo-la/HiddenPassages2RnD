mouseX=mouseY=-10;
mouseHeld=null;

function inputSetup() {
  canv.addEventListener('mousemove', updateMousePos);
  canv.addEventListener('mousedown', mouseClick);
  canv.addEventListener('mouseup', mouseRelease);
  document.addEventListener("keydown",keyDown);
  document.addEventListener("keyup",keyUp);
}

function inputReset() {
  holdFire=holdLeft=holdRight=false;
  autoFireRepeatRate = 6;
  autoFireRepeatLeft = 0;
}

function keyDown(evt) {
  var wasGameKey = true;
  switch(evt.keyCode) {
    case 32: // spacebar
      if(onTitle) {
        onTitle=false;
      } else  if(holdFire==false) {
        autoFireRepeatLeft = 0; // otherwise key repeated will reach this
        holdFire = true;
      }
      break;
    case 37: // left
    case 65: // a
      if(holdFire==false) {
        playerFacing = -1.0;
      }
      holdLeft=true;
      break;
    case 38: // up
    case 87: // w
      if(onGround) {
        yv=-10;
        jumpSnd.play();
      }
      break;
    case 40: // down
    case 83: // s
      // no functionality at this time, but blocking the key scrolling the page
      break;
    case 39: // right
    case 68: // d
      if(holdFire==false) {
        playerFacing = 1.0;
      }
      holdRight=true;
      break;
    case 76: // L
      inEditor=!inEditor;
      if(inEditor==false) {
        var mapText = JSON.stringify(plat);
        mapLayout = mapText;
        console.log("----\n"+mapText);
      }
      break;
    case 88: // x
      if(onTitle) {
        highScore=0;
        localStorage.setItem('localHighScore', highScore);
      }
      break;
    default:
      wasGameKey = false;
      break;
  }
  if(wasGameKey) {
    evt.preventDefault();
  }
}
function keyUp(evt) {
  switch(evt.keyCode) {
    case 32: // spacebar
      holdFire = false;
      shotLock = false; // to avoid rapid fire shotgun
      break;
    case 37: // left
    case 65: // a
      holdLeft=false;
      break;
    case 38: // up
    case 87: // w
      if(yv<-3) {
        yv=-3;
      }
      break;
    case 39: // right
    case 68: // d
      holdRight=false;
      break;
  }
}

function mouseClick() {
  if(inEditor) {
    mouseHeld = pointOverlappedByRectList(mouseX,mouseY,plat);
  }
}

function mouseRelease() {
  mouseHeld=null;
}

function updateMousePos(evt) {
    var rect = canv.getBoundingClientRect();
    var root = document.documentElement;

    var wasMouseX = mouseX;
    var wasMouseY = mouseY;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    if(mouseHeld != null) {
      mouseHeld.x += mouseX - wasMouseX;
      mouseHeld.y += mouseY - wasMouseY;
    }
}