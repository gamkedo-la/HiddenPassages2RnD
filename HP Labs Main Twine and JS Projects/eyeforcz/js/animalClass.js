function animalClass(spawnX,spawnY) {
	this.currentX = spawnX;
	this.currentY = spawnY;
	this.moveToX;
	this.moveToY;
	this.speed;

	this.tileType;
	this.walkableBlocks = [];

	this.pathQueue = [];
	this.processingQueue = false;
	this.status;
	this.intention = 'WAITING';


	this.move = function(){
	
		if(this.intention == 'WALKING'){
			if(debug_MODE.path = true){console.log(this.pathQueue);}
			if(this.pathQueue.length == 0){
				this.status = undefined;
				this.intention = 'WAITING';
			}else{
				this.intenWalking();				
			}
		}
	}

	this.draw = function(){
		canvasContext.drawImage(imageList[this.tileType], this.currentX, this.currentY);
	}

	//Pathfinding and enabling walking
	this.moveTo = function(moveX, moveY) {
		var testPath = findPath(this,pixelXtoindexX(moveX), pixelYtoindexY(moveY));
		if(testPath.length != 0 && testPath != false){
			this.currentX = resetPixelXtoNearestIndexX(this.currentX);
			this.currentY = resetPixelYtoNearestIndexY(this.currentY);
			this.pathQueue = findPath(this,pixelXtoindexX(moveX), pixelYtoindexY(moveY));
			this.intention = 'WALKING';
		}
	}

	//On intention is "WALKING"
	this.intenWalking = function(){
		if(this.pathQueue[0] == 'North'){		
			if(this.status != 'WALKING_NORTH'){
				this.moveToY = this.currentY - WORLD_H;
				this.status = 'WALKING_NORTH';
				this.currentY -= this.speed;
			}else if(this.currentY <= this.moveToY){
				this.currentY = this.moveToY;
				this.pathQueue = this.pathQueue.slice(1);
				this.status = undefined;
			}else{
				this.currentY -= this.speed;
			}

		}else if(this.pathQueue[0] == 'South'){		
			if(this.status != 'WALKING_SOUTH'){
				this.moveToY = this.currentY + WORLD_H;
				this.status = 'WALKING_SOUTH';
				this.currentY += this.speed;
			}else if(this.currentY >= this.moveToY){
				this.currentY = this.moveToY;
				this.pathQueue = this.pathQueue.slice(1);
				this.status = undefined;
			}else{
				this.currentY += this.speed;
			}

		}else if(this.pathQueue[0] == 'East'){		
			if(this.status != 'WALKING_EAST'){
				this.moveToX = this.currentX + WORLD_W;
				this.status = 'WALKING_EAST';
				this.currentX += this.speed;
			}else if(this.currentX >= this.moveToX){
				this.currentX = this.moveToX;
				this.pathQueue = this.pathQueue.slice(1);
				this.status = undefined;
			}else{ 
				this.currentX += this.speed;
			}

		}else if(this.pathQueue[0] == 'West'){			
			if(this.status != 'WALKING_WEST'){
				this.moveToX = this.currentX - WORLD_W;
				this.status = 'WALKING_WEST';
				this.currentX -= this.speed;
			}else if(this.currentX <= this.moveToX){
				this.currentX = this.moveToX;
				this.pathQueue = this.pathQueue.slice(1);
				this.status = undefined;
			}else{
				this.currentX -= this.speed;
			}
		}
	}
}

function sheepClass(spawnX,spawnY) {
	animalClass.call(this, spawnX,spawnY)

	this.tileType = objSheep.tileType;
	this.walkableBlocks = ['GRASS','HOUSE'];
	this.speed = 5;
}

