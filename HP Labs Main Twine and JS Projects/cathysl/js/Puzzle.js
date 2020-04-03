const PAD_TOP = 140;
const PAD_SIDES = 230;

const PUZZLE_W = 100;
const PUZZLE_H = 100; 
const PUZZLE_GAP = 10;
const PUZZLE_COLS = 3;
const PUZZLE_ROWS = 3;

var puzzleGrid = [0, 3, 1, 
				  0, 0, 0, 
				  2, 0, 0];

var movingGrid = [2, 0, 0, 
				  0, 3, 0, 
				  0, 0, 1];

const PUZZLE_EMPTY = 0;
const PUZZLE_CROSS_SLOT = 1;
const PUZZLE_TRIANGLE_SLOT = 2;
const PUZZLE_CIRCLE_SLOT = 3;

const MOVING_EMPTY = 0;
const MOVING_CROSS = 1;
const MOVING_TRIANGLE = 2;
const MOVING_CIRCLE = 3;

const BUTTON = 7;
const BUTTON_W = 50;
const BUTTON_H = 50;

var button1X = 0;
var button1Y = 0;
var button2X = 0;
var button2Y = 0;
var button3X = 0;
var button3Y = 0;
var button4X = 0;
var button4Y = 0;

function drawPuzzle(){
	
	var arrayIndex = 0;	
	var squareY = PAD_TOP;

	for (eachRow=0; eachRow<3; eachRow++) {
		var squareX = PAD_SIDES;
			for (var eachCol=0; eachCol < 3; eachCol++) {	
				var tileKindHere = puzzleGrid[arrayIndex];
				var useImg=puzzlePics[tileKindHere];
				canvasContext.drawImage(useImg, squareX,squareY);
				squareX += PUZZLE_W + PUZZLE_GAP; 
				arrayIndex++;
			}
			squareX = squareX + PUZZLE_W - PUZZLE_GAP; 
		squareY = squareY + PUZZLE_H + PUZZLE_GAP; 
	}
}

function drawMoving(){
	
	var arrayIndex = 0;	
	var squareY = PAD_TOP;

	for (eachRow=0; eachRow<3; eachRow++) {
		var squareX = PAD_SIDES;
			for (var eachCol=0; eachCol < 3; eachCol++) {	
				var tileKindHere = movingGrid[arrayIndex];
				var useImg=movingPics[tileKindHere];
				if (tileKindHere !=0) {
				canvasContext.drawImage(useImg, squareX,squareY);
				}
				squareX += PUZZLE_W + PUZZLE_GAP; 
				arrayIndex++;
			}
			squareX = squareX + PUZZLE_W - PUZZLE_GAP; 
		squareY = squareY + PUZZLE_H + PUZZLE_GAP; 
	}
}

function drawButtons(){
	
	//button 1
	button1X = PAD_SIDES + PUZZLE_W + (PUZZLE_GAP/2) - (BUTTON_W/2);
	button1Y = PAD_TOP  + PUZZLE_H + (PUZZLE_GAP/2) - (BUTTON_H/2);

	var useImg=puzzlePics[BUTTON];
	canvasContext.drawImage(useImg, button1X,button1Y);

	//button 2
	button2X = button1X + PUZZLE_W + PUZZLE_GAP;
	button2Y = button1Y;
	var useImg=puzzlePics[BUTTON];
	canvasContext.drawImage(useImg, button2X,button2Y);

	//button3
	button3X = button1X;
	button3Y = button1Y + PUZZLE_H + PUZZLE_GAP 
	var useImg=puzzlePics[BUTTON];
	canvasContext.drawImage(useImg, button3X,button3Y);

	//button4
	button4X = button2X;
	button4Y = button3Y;
	var useImg=puzzlePics[BUTTON];
	canvasContext.drawImage(useImg, button4X,button4Y);
}

function puzzleChange(buttonPressed){

	var temp = 0;

	if (buttonPressed == 1){
		console.log('Button 1 clicked~!');
		temp = movingGrid[1];
		movingGrid[1] = movingGrid[0];
		movingGrid[0] = movingGrid[3];
		movingGrid[3] = movingGrid[4];
		movingGrid[4] = temp;
	} 

	if (buttonPressed == 2) {	
		console.log('Button 2 clicked~!');
		temp = movingGrid[2];
		movingGrid[2] = movingGrid[1];
		movingGrid[1] = movingGrid[4];
		movingGrid[4] = movingGrid[5];
		movingGrid[5] = temp;
	} 

	if (buttonPressed == 3) {	
		console.log('Button 3 clicked~!');
		temp = movingGrid[4];
		movingGrid[4] = movingGrid[3];
		movingGrid[3] = movingGrid[6];
		movingGrid[6] = movingGrid[7];
		movingGrid[7] = temp;
	} 

	if (buttonPressed == 4) {
		temp = movingGrid[5];	
		movingGrid[5] = movingGrid[4];
		movingGrid[4] = movingGrid[7];
		movingGrid[7] = movingGrid[8];
		movingGrid[8] = temp;
	}


}