var mousePos;
var mouseX = 0;
var mouseY = 0;

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function handleMouseClick(evt){
	if (gameWon){
		gameWon = 0;
		puzzleReset();
	} else {
		if (mouseX > button1X && mouseX < button1X + BUTTON_W &&
			mouseY > button1Y && mouseY < button1Y + BUTTON_H){
			puzzleChange(1);
		} else if (mouseX > button2X && mouseX < button2X + BUTTON_W &&
			mouseY > button2Y && mouseY < button2Y + BUTTON_H) {
			puzzleChange(2);
		} else if (mouseX > button3X && mouseX < button3X + BUTTON_W &&
			mouseY > button3Y && mouseY < button3Y + BUTTON_H) {
			puzzleChange(3);
		} else if (mouseX > button4X && mouseX < button4X + BUTTON_W &&
			mouseY > button4Y && mouseY < button4Y + BUTTON_H) {
			puzzleChange(4);
		}
	}
}
