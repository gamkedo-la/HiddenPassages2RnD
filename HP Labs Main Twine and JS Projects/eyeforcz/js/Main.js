var canvas, canvasContext;
var gameMain = new gameLoop();

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
	initGame();
	gameMain.spawnSheeps()
}

function initGame() {
	initMapGrid();
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	gameMain.move();
}

function drawAll() {
	drawWorld();
	gameMain.draw();
	colorText("X: " + Math.floor(mouseX / WORLD_W) + "Y: " + Math.floor(mouseY / WORLD_H),mouseX, mouseY, 'black');
	//blueWarrior.draw();
} 

function lerp (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};