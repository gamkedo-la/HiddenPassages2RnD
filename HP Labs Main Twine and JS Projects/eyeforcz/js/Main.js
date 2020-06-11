var canvas, canvasContext;

var blueWarrior = new warriorClass();

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

	loadLevel(levelOne);
}

function loadLevel(whichLevel) {
	worldGrid = whichLevel.slice();
	//blueWarrior.reset(warriorPic, "Blue Storm");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	//blueWarrior.move();
}

function drawAll() {
	drawWorld();
	//blueWarrior.draw();
} 

function lerp (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};