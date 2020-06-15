function sheepClass(spawnX,spawnY) {
	animalClass.call(this, spawnX,spawnY)

	this.block = 'SHEEP';
	this.imageID = 5;
	
	this.walkableBlocks = ['GRASS'];
	this.speed = 5;
	this.menuItems = ['MOVETO'];

	//Gets called every frame in this.move from animalClass 
	this.checkOnIntention = function(){

		if(this.intention == 'WALKING'){ this.intenWalking(); }

	}
}

