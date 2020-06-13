
function gameLoop(){
	this.sheepList = [];

	this.move = function (){
		console.log( indexYtoPixelY(farmSpawner.xID))
	}

	this.draw = function(){
		for (i = 0; i < this.sheepList.length; i++){
			canvasContext.drawImage(imageList[this.sheepList[i].tileType], indexXtoPixelX(farmSpawner.xID), indexYtoPixelY(farmSpawner.yID));
		}

	}

	this.spawnSheeps = function (){
		var sheep = new animalClass(farmSpawner.xID, farmSpawner.yID);
		this.sheepList.push(sheep);
	}
}
