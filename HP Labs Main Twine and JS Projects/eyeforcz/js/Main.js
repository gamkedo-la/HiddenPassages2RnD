var canvas, canvasContext;
//var gameMain = new gameLoop();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("WAITING FOR YOUR SLOW PC", canvas.width/2, canvas.height/2, 'white');

	loadImages();
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
	
	colorText("X: " + Math.floor(mouseX / TILE_W) + "Y: " + Math.floor(mouseY / TILE_H) + "type: " + mapGrid[pixelXtoindexX(mouseX)][pixelYtoindexY(mouseY)],mouseX, mouseY, 'black');
}


function lerp (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};