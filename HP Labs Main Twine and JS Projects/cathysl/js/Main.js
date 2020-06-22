basicHighlight = false;
timedHighlight = false;

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width,canvas.height, 'black');
	loadImages();
	randomizeGrid();
	var framesPerSecond = 30;
//	setInterval(titleScreen,1000/framesPerSecond);
	titleScreen();

	canvas.addEventListener('mousedown',handleMouseClick);

	canvas.addEventListener('mousemove',
		function(evt) {
			mousePos =  calculateMousePos(evt);
		});
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	//setInterval(updateAll,1000/framesPerSecond);
		titleScreen();
}

function titleScreen(){
    canvasContext.drawImage(otherImages[0], canvas.width / 2 - 175, 80);

    canvasContext.shadowBlur = 2;
    canvasContext.shadowColor = '#3F3F74';

    canvasContext.textAlign = 'center';
    canvasContext.font = '20px Arial';
        
    canvasContext.fillStyle = basicHighlight ? '#5FCDE4' : '#516faf';
    canvasContext.fillText("Basic Puzzle", canvas.width / 2, canvas.height / 2 + 150);

    canvasContext.fillStyle = timedHighlight ? '#5FCDE4' : '#516faf';
    canvasContext.fillText("Timed Challenge", canvas.width / 2, canvas.height / 2 + 180); 
}

function basicGame(){
	drawPuzzle();
	drawMoving();
	drawButtons();
}

