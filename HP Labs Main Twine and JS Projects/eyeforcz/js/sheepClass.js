function sheepClass(spawnX,spawnY) {
	animalClass.call(this, spawnX,spawnY)

	this.imageID = objSheep.imageID;
	this.walkableBlocks = ['GRASS'];
	this.speed = 5;

	//Gets called every frame in this.move from animalClass 
	this.checkOnIntention = function(){

		if(this.intention == 'WALKING'){ this.intenWalking(); }

	}

	//If the object is selected than this menu pops up
	this.menu = function(){
		//TODO: make a menu class and a menu array for this class
		drawAnImage(btnMoveTo.imageIdIDLE, menuBar.startX, menuBar.startY,0);


	}
}

