function animalClass(spawnX,spawnY) {
	this.currentX = spawnX;
	this.currentY = spawnY;
	this.moveToX;
	this.moveToY;
	this.speed;

	this.tileType;
	this.ingoreBlocks = [];

	this.pathQueue = [];
	this.processingQueue = false;
	this.status = 'WAITING';

	this.draw = function(){
		canvasContext.drawImage(imageList[this.tileType], this.currentX, this.currentY);
	}

	this.move = function(){
	
		if(this.processingQueue){
			console.log(this.pathQueue)

			if(this.pathQueue.length == 0){
				this.processingQueue = false;
				this.status = 'WAITING';
			}else{
				if(this.pathQueue[0] == 'North'){		
					if(this.status != 'WALKING_NORTH'){
						this.moveToY = this.currentY - WORLD_H;
						this.status = 'WALKING_NORTH';
						this.currentY -= this.speed;
					}else if(this.currentY <= this.moveToY){
						this.currentY = this.moveToY;
						this.pathQueue = this.pathQueue.slice(1);
						this.status = 'WAITING';
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
						this.status = 'WAITING';
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
						this.status = 'WAITING';
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
						this.status = 'WAITING';
					}else{
						this.currentX -= this.speed;
					}
				}
			}

		}
	}

	this.moveTo = function(moveX, moveY) {
		this.pathQueue = findPath(this,pixelXtoindexX(moveX), pixelYtoindexY(moveY));
		if(this.pathQueue.length != 0 && this.pathQueue != false){
			this.processingQueue = true;
		}
	}
}

function sheepClass(spawnX,spawnY) {
	animalClass.call(this, spawnX,spawnY)

	this.tileType = objSheep.tileType;
	this.ingoreBlocks = ['GRASS','HOUSE'];
	this.speed = 5;
}

