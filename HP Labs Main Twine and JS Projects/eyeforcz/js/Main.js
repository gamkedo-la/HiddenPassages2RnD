var canvas, canvasContext;
//var gameMain = new gameLoop();

var WIN_C1 = 9;
var WIN_R1 = 2;
var WIN_C2 = 11;
var WIN_R2 = 7;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("WAITING FOR YOUR SLOW PC", canvas.width/2, canvas.height/2, 'white');

	loadImages();
	canvasContext.font = "14px Verdana";
}

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
	setupInput();
	gameLoop.spawnSheeps(farmSpawner.xID, farmSpawner.yID)
	gameLoop.spawnSheeps(farmSpawner.xID - 1, farmSpawner.yID - 1)
}

function updateAll() {
	
	gameLoop.move();
	updateMapGrid();

	drawWorld();
	gameLoop.draw();

	var onSpot1 = false;
	var onSpot2 = false;
	for(i = 0; i < animalList.length; i++){
		if(animalList[i].indexX == WIN_C1 && animalList[i].indexY == WIN_R1) {
			onSpot1 = true;
		}
		if (animalList[i].indexX == WIN_C2 && animalList[i].indexY == WIN_R2) {
			onSpot2 = true;
		}
	}
	
	var tileC = Math.floor(mouseX / TILE_W);
	var tileR = Math.floor(mouseY / TILE_H);
	if(onSpot1 && onSpot2) {
		colorText("8.10:2",mouseX, mouseY, 'yellow');
	} else if((tileC == WIN_C1 && tileR == WIN_R1) || (tileC == WIN_C2 && tileR == WIN_R2)) {
		colorText("MOVE HERE",mouseX, mouseY, 'white');
	} else {
		colorText("C: " + tileC + " R: " + tileR /*+ "type: " + mapGrid[pixelXtoindexX(mouseX)][pixelYtoindexY(mouseY)]*/,mouseX, mouseY, 'black');
	}
}


function lerp (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};