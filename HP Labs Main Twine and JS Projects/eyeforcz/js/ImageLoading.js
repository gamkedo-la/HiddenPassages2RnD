var warriorPic = document.createElement("img");
var imageList = [];

var picsToLoad = 0; // set automatically based on imageArray in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	//console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
	imageList[worldCode] = document.createElement("img");
	beginLoadingImage(imageList[worldCode], fileName);
}

function loadImages() {
	var imageArray = [
		{tileType: tileGrass.tileType, theFile: "world_grass.png"},
		{tileType: tileTree.tileType, theFile: "world_tree.png"},
		{tileType: tileWall.tileType, theFile: "world_wall.png"},
		{tileType: tileHouse.tileType, theFile: "world_house.png"},
		{tileType: objSheep.tileType, theFile: "object_sheep.png"},
		{tileType: objCoyote.tileType, theFile: "object_coyote.png"},
		];

	picsToLoad = imageArray.length;

	for(var i=0;i<imageArray.length;i++) {
		if(imageArray[i].varName != undefined) {
			beginLoadingImage(imageArray[i].varName, imageArray[i].theFile);
		} else {
			loadImageForWorldCode(imageArray[i].tileType, imageArray[i].theFile);
		}
	}
}