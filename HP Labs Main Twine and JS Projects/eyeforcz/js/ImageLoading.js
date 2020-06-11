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
		{varName: warriorPic, theFile: "warrior.png"},

		{worldType: TILE_GRASS, theFile: "world_grass.png"},
		{worldType: TILE_WALL, theFile: "world_fence.png"},
		{worldType: TILE_TREE, theFile: "world_tree.png"},
		{worldType: TILE_HOUSE, theFile: "world_house.png"},
		{worldType: TILE_DOOR, theFile: "world_door.png"}
		];

	picsToLoad = imageArray.length;

	for(var i=0;i<imageArray.length;i++) {
		if(imageArray[i].varName != undefined) {
			beginLoadingImage(imageArray[i].varName, imageArray[i].theFile);
		} else {
			loadImageForWorldCode(imageArray[i].worldType, imageArray[i].theFile);
		}
	}
}