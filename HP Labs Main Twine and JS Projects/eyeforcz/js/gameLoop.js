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
		console.log(theObjectClickedON.block)
		
		//If current selection is empty and the clicked place is a object
		if(theObjectClickedON.typ == 'ANIMAL'){
				mouseAction.selected = theObjectClickedON;
				menuClass.initSelectMenu();
				console.log("selc: " + mouseAction.selected.block)
		//If current selection is not empty
		}else if(mouseAction.selected != undefined){
			console.log("what");
			//Select the the object as an action if its a button
			if(theObjectClickedON.typ == 'BUTTON'){
					mouseAction.action = theObjectClickedON;
					//Run the action if the selected action doesnt need extra Parameters
					if(mouseAction.action.needParams == false){	
						mouseAction.action.run();
						mouseAction.selected = undefined;
						mouseAction.action = undefined;
						menuList = [];
					}
			//Rest everything if its not a button and the actions are empty
			}else if(mouseAction.action == undefined){
				mouseAction.selected = undefined;
				mouseAction.action = undefined;
				menuList = [];
			//If an action was selected than choose its params and run it
			}else{
				if(mouseAction.action.run(mouseX, mouseY) == true){
					mouseAction.selected = undefined;
					mouseAction.action = undefined;
					menuList = [];
				}
			}
		}
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
	this.spawnSheeps = function (){
		var sheep = new sheepClass(indexXtoPixelX(farmSpawner.xID),indexYtoPixelY(farmSpawner.yID));
		animalList.push(sheep);
	}
}
