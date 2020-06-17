var animalList = [];

var debug_MODE = {
	path: false,
};

var mouseAction ={
	selected: undefined,
	action: undefined
};

gameLoop = new function(){
	
	this.move = function (){
		for (i = 0; i < animalList.length; i++){
			animalList[i].move();
		}
		menuClass.move();
		
	}

	this.draw = function(){
		for (i = 0; i < animalList.length; i++){
			animalList[i].draw();
		}
		menuClass.draw();
	}

	this.onMouseClicked = function(){
		var mouseIDX = pixelXtoindexX(mouseX);
		var mouseIDY = pixelYtoindexY(mouseY);
		var theObjectClickedON = mapGrid[mouseIDX][mouseIDY];
		
		//If current selection is empty and the clicked place is a object
		if(theObjectClickedON.typ == 'ANIMAL'){
			this.resetMouseActions();
			mouseAction.selected = theObjectClickedON;
			menuClass.initSelectMenu();
			console.log("selc: " + mouseAction.selected.block)
		//If current selection is not empty
		}else if(mouseAction.selected != undefined){
			
			//Reset action if the same button was clicked twice (for param buttons)
			if(mouseAction.action != undefined && mouseAction.action.block == theObjectClickedON.block){
				mouseAction.action = undefined;

			//Select the the object as an action if its a button
			}else if(theObjectClickedON.typ == 'BUTTON'){
					mouseAction.action = theObjectClickedON;
					console.log(mouseAction.action)
					//Run the action if the selected action doesnt need extra Parameters
					if(mouseAction.action.needParams == false){	
						menuClass.run(mouseIDX, mouseIDY);
						mouseAction.action = undefined;
					}

			//Rest everything if its not a button and the actions are empty
			}else if(mouseAction.action == undefined){
				this.resetMouseActions();
			//If an action was selected than choose its params and run it
			}else{
				if(menuClass.run(mouseIDX, mouseIDY) == true){
					this.resetMouseActions();
				}
			}
		}
	}

	this.resetMouseActions = function(){
		mouseAction.selected = undefined;
		mouseAction.action = undefined;
		menuList = [];
	}

	this.checkIfTileIsObject = function(){
	
		var choosenObject = undefined;

		for(i = 0; i < animalList.length; i++){
			if(animalList[i].indexX == mouseIDX && animalList[i].indexY == mouseIDY){
				choosenObject = animalList[i];
			
			}
		}

		if(choosenObject != undefined){
			return choosenObject;
		}else{
			return false;
		}
	}
	this.spawnSheeps = function (idX, idY){
		var sheep = new sheepClass(indexXtoPixelX(idX),indexYtoPixelY(idY));
		animalList.push(sheep);
	}
}
