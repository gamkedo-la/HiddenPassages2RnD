var animalList = [];
var debug_MODE = {
	path: false,
};
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

	this.spawnSheeps = function (){
		var sheep = new sheepClass(indexXtoPixelX(farmSpawner.xID),indexYtoPixelY(farmSpawner.yID));
		animalList.push(sheep);
	}
}
