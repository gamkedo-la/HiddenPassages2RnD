const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;
//
function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	blueWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
} 

 function initInput() {
    document.addEventListener("mousemove", mousemoved);
    document.addEventListener("mousedown", mouseclicked);
  }

  function mouseclicked(evt) {
    if(tileOverIdx < 0 || tileOverIdx >= tileGrid.length) { // invalid or off board
      return;
    }

    if(selectedIdx != -1) {
      tileGrid[tileOverIdx] = tileGrid[selectedIdx]; // put the piece here (overwrite)
      tileGrid[selectedIdx] = NO_PIECE; // clear the spot where it was sitting
      selectedIdx = -1; // forget selection
    } else if(tileGrid[tileOverIdx] != NO_PIECE ) {
      selectedIdx = tileOverIdx;
    }
  }

  function mousemoved(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    // account for the margins, canvas position on page, scroll amount, etc.
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    var tileOverCol = Math.floor(mouseX / TILE_W);
    var tileOverRow = Math.floor(mouseY / TILE_H);    
    tileOverIdx = tileCoordToIndex(tileOverCol,tileOverRow);
  }
//

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	// cheat / hack to test car in any position
	/*carX = mouseX;
	carY = mouseY;
	carSpeedX = 4;
	carSpeedY = -4;*/
}

function keySet(keyEvent, setTo) {
	if(keyEvent.keyCode == blueWarrior.controlKeyLeft) {
		blueWarrior.keyHeld_West = setTo;
	}
	if(keyEvent.keyCode == blueWarrior.controlKeyRight) {
		blueWarrior.keyHeld_East = setTo;
	}
	if(keyEvent.keyCode == blueWarrior.controlKeyUp) {
		blueWarrior.keyHeld_North = setTo;
	}
	if(keyEvent.keyCode == blueWarrior.controlKeyDown) {
		blueWarrior.keyHeld_South = setTo;
	}
}

function keyPressed(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, true);

	evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, false);
}