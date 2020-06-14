var sheepList = [];

function gameLoop(){


	this.move = function (){
		
	}

	this.draw = function(){
		for (i = 0; i < sheepList.length; i++){
			canvasContext.drawImage(imageList[sheepList[i].tileType], indexXtoPixelX(farmSpawner.xID), indexYtoPixelY(farmSpawner.yID));
		}

	}

	this.spawnSheeps = function (){
		var sheep = new sheepClass(farmSpawner.xID, farmSpawner.yID);
		sheepList.push(sheep);
	}
}
