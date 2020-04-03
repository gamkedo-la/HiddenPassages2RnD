
window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width,canvas.height, 'black');

	loadImages();
	var framesPerSecond = 30;
	setInterval(updateAll,1000/framesPerSecond);

	canvas.addEventListener('mousedown',handleMouseClick);

	canvas.addEventListener('mousemove',
		function(evt) {
			mousePos =  calculateMousePos(evt);
		});
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(updateAll,1000/framesPerSecond);
}

function updateAll(){
	drawPuzzle();
	drawMoving();
	drawButtons();
}