var animalList = [];

var debug_MODE = {
	path: false,
};

var mouseAction ={
	selected: undefined,
	action: undefined
};

//var is gameMain
function gameLoop(){


	this.move = function (){
		for (i = 0; i < animalList.length; i++){
			animalList[i].move();
		}
	}

	this.draw = function(){
		for (i = 0; i < animalList.length; i++){
			animalList[i].draw();
		}

	}

	this.onMouseClicked = function(){
		var theObjectClickedON = checkIfTileIsObject();
		
		//If current selection is empty and the clicked place is a object
		if(mouseAction.selected == undefined && theObjectClickedON != false){
				mouseAction.selected = theObjectClickedON;
				mouseAction.selected.selected = true;
		//If current selection is not empty
		}else{
			//Select the the object as an action if its a button
			if(theObjectClickedON.objType == 'BUTTON'){
					mouseAction.action = theObjectClickedON;
					//Run the action if the selected action doesnt need extra Parameters
					if(mouseAction.action.needParams == false){	
						mouseAction.action.run();
						mouseAction.selected = undefined;
						mouseAction.action = undefined;
					}
			//Rest everything if its not a button and the actions are empty
			}else if(mouseAction.action == undefined){
				mouseAction.selected = undefined;
				mouseAction.action = undefined;
			//If an action was selected than choose its params and run it
			}else{
				if(mouseAction.action.run(mouseX, mouseY) == true){
					mouseAction.selected = undefined;
					mouseAction.action = undefined;
				}
			}
		}
	}


	this.checkIfTileIsObject = function(){
		var mouseIDX = pixelXtoindexX(mouseX);
		var mouseIDY = pixelYtoindexY(mouseY);
		var choosenObject = undefined;

		for(i = 0; i < animalList.length; i++){
			if(pixelXtoindexX(animalList[i].currentX) == mouseIDX && pixelYtoindexY(animalList[i].currentY) == mouseIDY){
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
