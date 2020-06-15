function animalClass(spawnX,spawnY) {
	this.currentX = spawnX;
	this.currentY = spawnY;
	this.indexX;
	this.indexY;
	this.typ = 'ANIMAL';
	this.transparent = true;
	this.moveToX;
	this.moveToY;
	this.speed;

	this.imageID;
	this.imageAngel = 0;

	this.pathQueue = [];
	this.walkableBlocks = [];

	this.status;
	this.intention = 'WAITING';
	this.selected = false;

	this.move = function(){

		this.indexX = pixelXtoindexX(this.currentX);
		this.indexY = pixelYtoindexY(this.currentY);

		this.checkOnIntention();
	}

	this.draw = function(){
		drawAnImage(this.imageID, this.currentX, this.currentY,this.imageAngel);
	}

	//Pathfinding and enabling walking
	this.moveTo = function(moveX, moveY) {
		var testPath = findPath(this,pixelXtoindexX(moveX), pixelYtoindexY(moveY));
		if(testPath.length != 0 && testPath != false){
			this.currentX = indexXtoPixelX(this.indexX);
			this.currentY = indexXtoPixelX(this.indexX);
			this.pathQueue = findPath(this,pixelXtoindexX(moveX), pixelYtoindexY(moveY));
			this.intention = 'WALKING';
		}
	}


	//On intention is "WALKING"
	this.intenWalking = function(){
		if(debug_MODE.path = true){console.log(this.pathQueue);}
		if(this.pathQueue.length == 0){
			this.status = undefined;
			this.intention = 'WAITING';
			return;
		}

		if(this.pathQueue[0] == 'North'){		
			if(this.status != 'WALKING_NORTH'){
				this.moveToY = this.currentY - TILE_H;
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
				this.moveToY = this.currentY + TILE_H;
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
				this.moveToX = this.currentX + TILE_W;
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
				this.moveToX = this.currentX - TILE_W;
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
